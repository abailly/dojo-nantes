import { VM, VMDevice } from "./vm";

let execute = (vm: VM, program: string) => {
    vm.execute(program + '\x00');
}

describe("when", () => {
    [0x12, 0x13].forEach((value) =>
        it(`LIT should ${value} next byte in stack`, () => {
            const vm = new VM();
            const program = `\x80${String.fromCodePoint(value)}`;
            execute(vm, program);

            expect(vm.pop()).toBe(value);
        })
    );

    it(`Two LIT should push two bytes in stack`, () => {
        const vm = new VM();
        const program = `\x80\x12\x80\x13`;
        execute(vm, program);

        expect(vm.pop()).toBe(0x13);
        expect(vm.pop()).toBe(0x12);
    });

    it(`POP should pop one byte from stack`, () => {
        const vm = new VM();
        const program = `\x80\x12\x80\x13\x02`;
        execute(vm, program);

        expect(vm.pop()).toBe(0x12);
    });

    it(`DEO should write one byte to device`, () => {
        const device = new VMDevice();
        const vm = new VM(device);
        const program = `\x80\x12\x80\x18\x17`;
        execute(vm, program);

        expect(device.get(0x08)).toEqual([0x12]);
    });

    it(`DEI should read one byte from device`, () => {
        const device = new VMDevice();
        device.in = [0x42];
        const vm = new VM(device);
        const program = `\x80\x12\x16`;
        execute(vm, program);

        expect(vm.pop()).toEqual(0x42);
    });


    it('EQU pushes 1 if 2 top bytes are equal', () => {
        const vm = new VM();
        const program = '\x80\x12\x80\x12\x08';
        execute(vm, program);

        expect(vm.pop()).toEqual(0x01);
    });

    it('EQU pushes 0 if 2 top bytes are different', () => {
        const vm = new VM();
        const program = '\x80\x12\x80\x13\x08';
        execute(vm, program);

        expect(vm.pop()).toEqual(0x00);
    })

    it('INC increments top byte', () => {
        const vm = new VM();
        const program = '\x80\x12\x01';
        execute(vm, program);

        expect(vm.pop()).toEqual(0x13);
    });

    it('INC increments top byte several times', () => {
        const vm = new VM();
        const program = '\x80\x12\x01\x01';
        execute(vm, program);

        expect(vm.pop()).toEqual(0x14);
    });

    it('JSR jumps execution forward given a value on stack', () => {
        const vm = new VM();
        const program = `\x80\x12\x80\x02\x0e\x01\x01\x01`;
        execute(vm, program);

        expect(vm.pop()).toEqual(0x13);
    })

    it('BRK stops execution of program', () => {
        const vm = new VM();
        const program = `\x80\x12\x00\x01`;
        execute(vm, program);

        expect(vm.pop()).toEqual(0x12);
    })

    // high level first test for our "test framework"
    it('assert subroutine returns some value', () => {
        const vm = new VM();
        const subroutine = `\x80\x12`;
        const program = '\x80\x05\x0e\x80\x12\x08\x00' + subroutine + '\x6c';
        execute(vm, program);

        expect(vm.pop()).toEqual(0x01);
    });



});
