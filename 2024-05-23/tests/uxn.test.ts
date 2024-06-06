import { describe, expect, test } from '@jest/globals';

class Uxn {
    stack: any[]

    constructor () {
        this.stack = []
    }

    lit(param: number) {
        this.stack.push(param)
    }

    emulate (program : string) {
	this.lit(program.charCodeAt(1));
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

    test ('bytecode', () => {
        const uxn = new Uxn();
        uxn.emulate('\x80\x42');
        expect(uxn.stack).toStrictEqual([0x42]);
    });

});
