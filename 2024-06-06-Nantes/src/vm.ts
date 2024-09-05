enum OpCode {
    BRK = 0x00,
    INC = 0x01,
    POP = 0x02,
    EQU = 0x08,
    JSR = 0x0e,
    DEI = 0x16,
    DEO = 0x17,
    JMP2r = 0x6c,
    LIT = 0x80,
}

export class VM {
    stack: number[] = [];
    returnStack: number[] = [];
    device: VMDevice;
    execute(program: string) {
        for (var i = 0; i < program.length; i++) {
            switch (program.charCodeAt(i)) {
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
                case OpCode.JSR: {
                    const addr = this.stack.pop() ?? 0;
                    // TODO handles programs larger than 256 bytes
                    this.returnStack.push(0);
                    this.returnStack.push(i + 1);
                    i = i + addr;
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
                    i = b << 8 | a;
                    console.log(i);
                    break;
                }
                case OpCode.LIT:
                    this.stack.push(program.charCodeAt(++i));
                    break;
            }
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
