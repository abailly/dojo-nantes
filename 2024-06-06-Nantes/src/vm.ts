export class VM {
    stack: number[] = [];
    device: VMDevice;
    execute(program: string) {
        for (var i = 0; i < program.length; i++) {
            switch (program.charCodeAt(i)) {
                case 0x80:
                    this.stack.push(program.charCodeAt(++i));
                    break;
                case 0x02:
                    this.stack.pop();
                    break;
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
            }
        }
    }
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
