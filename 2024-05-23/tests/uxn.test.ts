import { describe, expect, test } from '@jest/globals';

type Program = string

class Uxn {
    stack: any[]
    devices: Devices

    constructor (devices: Devices = new Devices()) {
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
		    const deviceIndex = 0xf0 & device;
		    const port = 0x0f & device;
		    const selectedDevice  = this.devices.getDevice(deviceIndex);
		    if (selectedDevice) {
		    	selectedDevice.output(port, val);
		    }	
                    break;
            }
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
    });

});
