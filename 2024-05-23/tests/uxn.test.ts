import { describe, expect, test } from '@jest/globals';

type Program = string

class Uxn {
    stack: any[]
    return_stack: any[]
    devices: Devices
    program_counter: number

    constructor (devices: Devices = new Devices()) {
        this.stack = []
        this.return_stack = []
	      this.devices = devices;
        this.program_counter = 0;
    }

    inc() {
	      this.stack[this.stack.length-1]++;
    }

    lit(param: number, stack: number[]) {
        stack.push(param);
    }

    pop() {
        this.stack.pop();
    }

    add() {
        this.stack.push(this.stack.pop() + this.stack.pop());
    }

    nip () {
	      this.stack.splice(this.stack.length -2, 1);
    }

    swap () {
	      this.stack.push.apply(this.stack, this.stack.splice(this.stack.length -2, 1));
    }

    rot () {
        const c = this.stack.pop();
	      const b = this.stack.pop();
	      const a = this.stack.pop();
	      this.stack.push(b, c, a);
    }

    emulate (program : Program)  {
        // TODO: load program at address 0x0100
        // TODO: set pc at 0x100
        while (this.program_counter < program.length) {
	    let opcode = program.charCodeAt(this.program_counter) 
	    let op = { opcode };
            switch(op.opcode) {
                case 0x00:
                    return;
                case 0x01:
                    this.inc();
                    break;
                case 0x02:
                    this.pop();
                    break;
                case 0x03:
		               this.nip();
		               break;
                case 0x04:
		                this.swap();
		                break;
		            case 0x05:
		                this.rot();
		                break;
                case 0x0c:
                    const offset = this.stack.pop();
                    this.program_counter += offset;
                    break;
                case 0x0e: {
                    const offset = this.stack.pop();
		    const ret = this.program_counter + 1;
		    const reth = (ret >> 0x08) & 0xff;
		    const retl = ret & 0xff;
                    this.return_stack.push(reth);
                    this.return_stack.push(retl);
                    this.program_counter += offset;
                    break;
                }
                case 0x0f:
                    const value = this.stack.pop();
                    this.return_stack.push(value);
                    break;
                case 0x17:
                    const device = this.stack.pop();
		                const val = this.stack.pop();
		                const deviceIndex = 0xf0 & device;
		                const port = 0x0f & device;
		                const selectedDevice  = this.devices.getDevice(deviceIndex);
		                if (selectedDevice) {
		    	              selectedDevice.output(port, val);
		                }
                    break;
                case 0x18:
		                this.add();
		                break;
		case 0x6c:
		    const retl = this.return_stack.pop();
		    const reth = (this.return_stack.pop() << 0x08);
		    const ret = retl + reth;
		    this.program_counter = ret;
		    continue;
                case 0x80:
                    this.program_counter += 1;
                    this.lit(program.charCodeAt(this.program_counter), this.stack);
                    break;
                case 0xc0:
                    this.program_counter += 1;
                    this.lit(program.charCodeAt(this.program_counter), this.return_stack);
                    break;
            }
            this.program_counter += 1;
        }
    }
}

class Device {

	  out : number[][] = Array(16).fill([])

    get (port : number) : number[] {
        return this.out[port];
    }

	  output (port : number, value : number) {
		    this.out[port].unshift(value);
	  }

}

enum DeviceType {
	  CONSOLE = 16,
    SCREEN = 32
}

class Devices {

    devices : (Device | null)[]

    constructor () {
        this.devices = Array(16).fill(null);
    }

    private deviceIndex(deviceType : DeviceType) : number {
        return deviceType >> 4;
    }

    getDevice(deviceType: DeviceType) {
	      return this.devices[this.deviceIndex(deviceType)];
    }

    set console (device : Device) {
	      this.devices[this.deviceIndex(DeviceType.CONSOLE)] = device;
    }
    set screen (device : Device) {
	      this.devices[this.deviceIndex(DeviceType.SCREEN)] = device;
    }
}

describe('Uxn VM', () => {
    describe('bytecode', () => {
        test('emulate a LIT then a console write', () => {
            const consoleAdapter = new Device();
            const devices = new Devices();
            const uxn = new Uxn(devices);
	          devices.console = consoleAdapter;

            const device = DeviceType.CONSOLE;
            const port = 8;

            // write the byte 0x43 to port 0x08 of device 0x10
            uxn.emulate(`\x80\x43\x80${String.fromCharCode(device + port)}\x17`);
            expect(consoleAdapter.get(0x08)).toStrictEqual([0x43]);
            expect(uxn.stack).toStrictEqual([]);
        });

        test('emulate a LIT then a screen write', () => {
            const screenAdapter = new Device();
            const devices = new Devices();
            const uxn = new Uxn(devices);
	          devices.screen = screenAdapter;

            const device = DeviceType.SCREEN;
            const port = 7;

            // write the byte 0x43 to port 0x07 of device 0x20
            uxn.emulate(`\x80\x43\x80${String.fromCharCode(device + port)}\x17`);
            expect(screenAdapter.get(0x07)).toStrictEqual([0x43]);
        });

        ([
            ["emulate a LIT of a value", "\x80\x42", [0x42]],
            ["emulate a LIT of a value then a POP", "\x80\x43\x02", []],
            ["emulate a BRK command", "\x80\x43\x01\x00\x01", [0x44]],
            ["emulate a INC command", "\x80\x43\x01", [0x44]],
            ["emulate a NIP command", "\x80\x43\x80\x42\x03", [0x42]],
            ["emulate a ADD of 2 values", "\x80\x43\x80\x42\x18", [0x85]],
            ["emulate a SWP of 2 values", "\x80\x43\x80\x42\x04", [0x42, 0x43]],
            ["emulate a ROT of 3 values", "\x80\x43\x80\x42\x80\x41\x05", [0x42, 0x41, 0x43]],
        ] as [string, string, number[]][]).forEach(([message, bytecode, stack]) => {
            test(message, () => {
                const uxn = new Uxn();
                uxn.emulate(bytecode);
                expect(uxn.stack).toStrictEqual(stack);
            });
	      });

        test('emulate a JMP', () => {
	          const uxn = new Uxn();
	          uxn.emulate('\x80\x02\x0c\x80\x01\x80\x03');
	          expect(uxn.stack).toStrictEqual([0x03]);
	          expect(uxn.program_counter).toStrictEqual(0x07);
	      });

        test('emulate a STH', () => {
	          const uxn = new Uxn();
	          uxn.emulate('\x80\x02\x0f');
	          expect(uxn.stack).toStrictEqual([]);
	          expect(uxn.return_stack).toStrictEqual([0x02]);
	      });

        test('emulate a JSR', () => {
	          const uxn = new Uxn();
	          uxn.emulate('\x80\x00'.repeat(255) + '\x80\x01\x0e\x00\x80\x01');
		  // 0x0000 : 0x80 0x00
		  // ... (255 fois)
		  // 0x01fe : 0x80 0x01 
		  // 0x0200 : 0x0e     
		  // 0x0201 : 0x00 <- l'addresse de cette instruction sur le return stack
		  // 0x0202: 0x80 0x01
	          expect(uxn.return_stack).toStrictEqual([0x02, 0x01]);
        });

        test('emulate a subroutine', () => {
	          const uxn = new Uxn();
	          uxn.emulate('\x80\x03\x0e\x80\x03\x00\x80\x04\x6c\x80\x05');
	          expect(uxn.stack).toStrictEqual([0x04, 0x03]);
        });

        test('handle r mode for LIT', () => {
	          const uxn = new Uxn();
	          uxn.emulate('\xc0\x03');
	          expect(uxn.return_stack).toStrictEqual([0x03]);
        });

    });
});
