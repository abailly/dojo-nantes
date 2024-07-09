import { describe, expect, test } from '@jest/globals';

type Program = string

class Uxn {
    stack: any[]
    devices: Devices

    constructor (devices: Devices = new Devices()) {
        this.stack = []
	this.devices = devices;
    }
    
    inc() {
	this.stack[this.stack.length-1]++;
    }

    lit(param: number) {
        this.stack.push(param);
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

    emulate (program : Program)  {
        for (var i = 0; i< program.length; i++) {
            switch(program.charCodeAt(i)) {
                case 0x00: 
                    return;
                case 0x80: 
                    this.lit(program.charCodeAt(++i));
                    break;
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
                case 0x18: {
		    this.add();
		    break;
		}
		    
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

	test('emulate a BRK command', () => {
            const uxn = new Uxn();
            uxn.emulate('\x80\x43\x01\x00\x01');
            expect(uxn.stack).toStrictEqual([0x44]);
	});

	test('emulate a INC command', () => {
            const uxn = new Uxn();
            uxn.emulate('\x80\x43\x01');
            expect(uxn.stack).toStrictEqual([0x44]);
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

	test('emulate a NIP command', () => {
            const uxn = new Uxn();
            uxn.emulate('\x80\x43\x80\x42\x03');
            expect(uxn.stack).toStrictEqual([0x42]);
	});
	test('emulate a NIP command', () => {
            const uxn = new Uxn();
            uxn.emulate('\x80\x43\x80\x42\x03');
            expect(uxn.stack).toStrictEqual([0x42]);
	});
        test('emulate a ADD of 2 values', () => {
            const uxn = new Uxn();
            uxn.emulate('\x80\x43\x80\x42\x18');
            expect(uxn.stack).toStrictEqual([0x85]);
        });

        test('emulate a SWP of 2 values', () => {
            const uxn = new Uxn();
            uxn.emulate('\x80\x43\x80\x42\x04');
            expect(uxn.stack).toStrictEqual([0x42, 0x43]);
        });

    });
});
