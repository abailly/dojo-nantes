import { describe, expect, test } from '@jest/globals';
class Uxn {
    stack: any[]

    constructor () {
        this.stack = []
    }

    lit(param: number) {
        this.stack.push(param)
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
});
