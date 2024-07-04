import { VM, VMDevice } from "./vm";

describe("when", () => {
    [0x12, 0x13].forEach((value) =>
        it(`LIT should ${value} next byte in stack`, () => {
            const vm = new VM();
            const program = `\x80${String.fromCodePoint(value)}`;
            vm.execute(program);

            expect(vm.pop()).toBe(value);
        })
    );

    it(`Two LIT should push two bytes in stack`, () => {
        const vm = new VM();
        const program = `\x80\x12\x80\x13`;
        vm.execute(program);

        expect(vm.pop()).toBe(0x13);
        expect(vm.pop()).toBe(0x12);
    });

    it(`POP should pop one byte from stack`, () => {
        const vm = new VM();
        const program = `\x80\x12\x80\x13\x02`;
        vm.execute(program);

        expect(vm.pop()).toBe(0x12);
    });

    it(`DEO should write one byte to device`, () => {
        const device = new VMDevice();
        const vm = new VM(device);
        const program = `\x80\x12\x80\x18\x17`;
        vm.execute(program);

        expect(device.get(0x08)).toEqual([0x12]);
    });

    it(`DEI should read one byte from device`, () => {
        const device = new VMDevice();
        device.in = [0x42];
        const vm = new VM(device);
        const program = `\x80\x12\x16`;
        vm.execute(program);

        expect(vm.pop()).toEqual(0x42);
    });


    it('EQU pushes 1 if 2 top bytes are equal', () => {
        const vm = new VM();
        const program = '\x80\x12\x80\x12\x08';
        vm.execute(program);

        expect(vm.pop()).toEqual(0x01);
    });

    it('EQU pushes 0 if 2 top bytes are different', () => {
        const vm = new VM();
        const program = '\x80\x12\x80\x13\x08';
        vm.execute(program);

        expect(vm.pop()).toEqual(0x00);
    })

    it('INC increments top byte', () => {
        const vm = new VM();
        const program = '\x80\x12\x01';
        vm.execute(program);

        expect(vm.pop()).toEqual(0x13);
    });

    it('INC increments top byte several times', () => {
        const vm = new VM();
        const program = '\x80\x12\x01\x01';
        vm.execute(program);

        expect(vm.pop()).toEqual(0x14);
    });

    it('JSR jumps execution forward given a value on stack', () => {
        const vm = new VM();
        const program = `\x80\x12\x80\x02\x0e\x01\x01\x01`;
        vm.execute(program);

        expect(vm.pop()).toEqual(0x13);
    })

    it('BRK stops execution of program', () => {
        const vm = new VM();
        const program = `\x80\x12\x00\x01`;
        vm.execute(program);

        expect(vm.pop()).toEqual(0x12);
    })

    // high level first test for our "test framework"
    it('assert subroutine returns some value', () => {
        const vm = new VM();
        const subroutine = `\x80\x12`;
        const program = '\x80\x05\x0e\x80\x12\x08\x00' + subroutine + '\x6c';
        vm.execute(program);

        expect(vm.pop()).toEqual(0x01);
    });

    // to test
    // note that JSR and JMP2r work on the return stack
    // 2. JSR = 0x0e
    // 3. JMP2r = 0x6d
});
