import { describe, expect, test } from '@jest/globals';

type Program = string

class Uxn {
    stack: any[]
    devices: (Device | null)[]

    constructor (devices: (Device | null)[] = []) {
        this.stack = []
	this.devices = devices;
    }

    lit(param: number) {
        this.stack.push(param);
        return this;
    }
    
    pop() {
        this.stack.pop();
        return this;
    }

    add() {
        this.stack.push(this.stack.pop() + this.stack.pop());
        return this;
    }

    emulate (program : Program)  {
        for (var i = 0; i< program.length; i++) {
            switch(program.charCodeAt(i)) {
                case 0x80: 
                    this.lit(program.charCodeAt(++i));
                    break;
                case 0x02:
                    this.pop();
                    break;
                case 0x17:
                    const device = this.stack.pop();
		    const val = this.stack.pop();
		    const deviceIndex = (0xf0 & device) >> 4;
		    const port = 0x0f & device;
		    const selectedDevice  = this.devices[deviceIndex];
		    if (selectedDevice) {
		    	selectedDevice.output(port, val);
		    }	
                    break;
            }
        }
    }
}

class Device {

	out : number[][] = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []] 

        get (port : number) : number[] {
                return this.out[port];
        }

	output (port : number, value : number) {
		this.out[port].unshift(value);
	}

}

describe('Uxn VM', () => {
    [42, 43].forEach((v) => {
        test(`LITeral ${v}`, () => {
            const uxn = new Uxn();
            uxn.lit(v)
            expect(uxn.stack).toStrictEqual([v]);
        });
    });

    test('POP', () => {
        const uxn = new Uxn();
        uxn.lit(0x42).pop();
        expect(uxn.stack).toStrictEqual([]);
    });

    test('ADD', () =>{
        const uxn = new Uxn();
        uxn.lit(12).lit(13).add();
        expect(uxn.stack).toStrictEqual([25]);
    });

    describe('bytecode', () => {
        test('emulate a LIT of a value', () => {
            const uxn = new Uxn();
            uxn.emulate('\x80\x42');
            expect(uxn.stack).toStrictEqual([0x42]);
        });

        test('emulate a LIT of a value then a POP', () => {
            const uxn = new Uxn();
            uxn.emulate('\x80\x43\x02');
            expect(uxn.stack).toStrictEqual([]);
        });

        test('emulate a LIT then a console write', () => {      
            const consoleAdapter = new Device();
            const devices = [null, consoleAdapter, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
            const uxn = new Uxn(devices);

            const device = 16;
            const port = 8;

            // write the byte 0x43 to port 0x08 of device 0x10
            uxn.emulate(`\x80\x43\x80${String.fromCharCode(device + port)}\x17`);
            expect(consoleAdapter.get(0x08)).toStrictEqual([0x43]);
            expect(uxn.stack).toStrictEqual([]);
        });

        test('emulate a LIT then a screen write', () => {      
            const screenAdapter = new Device();
            const devices = [null, null, screenAdapter, null, null, null, null, null, null, null, null, null, null, null, null, null];
            const uxn = new Uxn(devices);

            const device = 32;
            const port = 7;

            // write the byte 0x43 to port 0x07 of device 0x20
            uxn.emulate(`\x80\x43\x80${String.fromCharCode(device + port)}\x17`);
            expect(screenAdapter.get(0x07)).toStrictEqual([0x43]);
        });
    });

});
