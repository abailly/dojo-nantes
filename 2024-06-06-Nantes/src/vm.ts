enum OpCode {
    BRK = 0x00,
    INC = 0x01,
    POP = 0x02,
    EQU = 0x08,
    JMP = 0x0c,
    JSR = 0x0e,
    DEI = 0x16,
    DEO = 0x17,
    JMP2r = 0x6c,
    LIT = 0x80,
}

export class VM {
    stack: number[] = [];

    returnStack: number[] = [];

    pc: number = 0;

    device: VMDevice;

    execute(program: string) {
        while (true) {
            switch (program.charCodeAt(this.pc)) {
                case OpCode.BRK:
                    return;
                case OpCode.INC: {
                    const a = this.stack.pop() ?? 0;
                    this.stack.push(a + 1);
                    break;
                }
                case OpCode.POP:
                    this.stack.pop();
                    break;
                case OpCode.EQU:
                    if (this.stack.pop() === this.stack.pop()) {
                        this.stack.push(0x01);
                    } else {
                        this.stack.push(0x00);
                    }
                    break;
                case OpCode.JMP: {
                    const addr = this.stack.pop() ?? 0;
                    this.pc += addr;
                    break;
                }
                case OpCode.JSR: {
                    const addr = this.stack.pop() ?? 0;
                    // TODO handles programs larger than 256 bytes
                    this.returnStack.push(0);
                    this.returnStack.push(this.pc + 1);
                    this.pc = this.pc + addr;
                    break;
                }
                case OpCode.DEI: {
                    const port = this.stack.pop() ?? 0;
                    this.stack.push(this.device.input(port));
                    break;
                }
                case OpCode.DEO: {
                    const port = this.stack.pop() ?? 0;
                    const value = this.stack.pop() ?? 0;
                    this.device.output(port, value);
                    break;
                }
                case OpCode.JMP2r: {
                    const a = this.returnStack.pop() ?? 0;
                    const b = this.returnStack.pop() ?? 0;
                    this.pc = b << 8 | a;
                    break;
                }
                case OpCode.LIT:
                    this.stack.push(program.charCodeAt(++this.pc));
                    break;
            }
            // TODO: as the memory of a UXN vm is circular, we should wrap the PC when
            // reaching max amount of 64kB. This means that a program can run forever
            // or rewrite part of itself, or whatever without any error
            this.pc++;
        }
    }
    // NOTE: stacks are circular so it's always possible to pop a value
    pop(): number | undefined {
        return this.stack.pop();
    }

    constructor(device: VMDevice | null = null) {
        this.device = device ?? new VMDevice();
    }
}

export class VMDevice {
    out: number[] = [];
    in: number[] = [];

    output(port: number, value: number) {
        this.out.push(value);
    }
    input(port: number): number {
        return this.in.pop() ?? 0;
    }
    get(port: number): number[] {
        return this.out;
    }
}

export class Console extends VMDevice {
    output(port: number, value: number) {
        console.log(`${String.fromCharCode(value)}`);
    }
}
