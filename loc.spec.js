const {codeLineCheck} = require('./loc');

const code = codeLineCheck('./test.js');

describe('LOC', () => {
    it('should create the instance', () => {
        expect(codeLineCheck).toBeTruthy();
    });

    it('should return an error', () => {
        expect(codeLineCheck()).toEqual(undefined);
    });

    it('should return 4 executable lines code', () => {
        expect(code.loc).toEqual(4);
    });

    it('should return 3 empty lines', () => {
        expect(code.countEmptyLine()).toEqual(3);
    });

    it('should return total of 6 empty lines and comment', () => {
        expect(code.linesWithCommentOrEmpty()).toEqual(6);
    });
});