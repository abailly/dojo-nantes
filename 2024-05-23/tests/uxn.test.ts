import { describe, expect, test } from '@jest/globals';
class Uxn {
    stack: any[]

    constructor () {
        this.stack = [42]
    }

    lit(param: any) {
    }

}
describe('Uxn VM', () => {
    test('LITeral', () => {
        // arrange
        const uxn = new Uxn();

        //act
        uxn.lit(42)

        //assert
        expect(uxn.stack).toStrictEqual([42]);
    });
});
