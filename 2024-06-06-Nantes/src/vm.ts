export class VM {
    stack: number[] = [];
    returnStack: number[] = [];
    device: VMDevice;
    execute(program: string) {
        for (var i = 0; i < program.length; i++) {
            switch (program.charCodeAt(i)) {
                case 0x00:
                    return;
                case 0x01: {
                    const a = this.stack.pop() ?? 0;
                    this.stack.push(a + 1);
                    break;
                }
                case 0x02:
                    this.stack.pop();
                    break;
                case 0x08:
                    if (this.stack.pop() === this.stack.pop()) {
                        this.stack.push(0x01);
                    } else {
                        this.stack.push(0x00);
                    }
                    break;
                case 0x0e: {
                    const addr = this.stack.pop() ?? 0;
                    // TODO handles programs larger than 256 bytes
                    this.returnStack.push(0);
                    this.returnStack.push(i + 1);
                    i = i + addr;
                    break;
                }
                case 0x16: {
                    const port = this.stack.pop() ?? 0;
                    this.stack.push(this.device.input(port));
                    break;
                }
                case 0x17: {
                    const port = this.stack.pop() ?? 0;
                    const value = this.stack.pop() ?? 0;
                    this.device.output(port, value);
                    break;
                }
                case 0x6c: {
                    const a = this.returnStack.pop() ?? 0;
                    const b = this.returnStack.pop() ?? 0;
                    i = b << 8 | a;
                    console.log(i);
                    break;
                }
                case 0x80:
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
