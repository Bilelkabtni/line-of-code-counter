const fs = require('fs');

const config = {
    fileData: '',
    currentCharacter: '',
    previousCharacter: '',
    loc: 0,
    commentInLinetCount: 0,
    commentInBlockCount: 0,
    onlyWhitespaceCount: 0,
    insideLineOfCode: false,
    commentInsideLine: false,
    commentInsideBlock: false,
    insideQuotation: false,
    whitespace: new RegExp('\\s'),
    linesWithCommentOrEmpty: () => {
        return config.commentInLinetCount + config.commentInBlockCount + config.onlyWhitespaceCount;
    },
    countEmptyLine: () => {
        const lines = config.fileData.split(/\r?\n/);

        lines.forEach((line) => {
            if (line.length === 0) config.onlyWhitespaceCount += 1;
        });
        return config.onlyWhitespaceCount;
    }
};

const _commentInsideLine = () => {
    if (config.whitespace.test(config.currentCharacter)) {
        // whitespace
    } else if (config.currentCharacter === '\'' || config.currentCharacter === '\'') {
        config.insideQuotation = true;
        //quotation
    } else if (config.currentCharacter === '/' && config.previousCharacter === '/') {
        config.commentInsideLine = true;
        //line Comment
        config.commentInLinetCount += 1;
    } else if (config.currentCharacter === '*' && config.previousCharacter === '/') {
        config.commentInsideBlock = true;
        //block Comment
        config.commentInBlockCount += 1;
    } else if (
        config.currentCharacter !== '/'
        && !config.commentInsideBlock
        && !config.insideLineOfCode) {
        config.insideLineOfCode = true;
        //begin of loc
        config.loc += 1;
    }
};

exports.codeLineCheck = (path) => {
    if (!path) {
        console.log('Please define the file directory.');
        return;
    }
    // read code lines from given path
    config.fileData = fs.readFileSync(path, 'utf-8');

    [...config.fileData].forEach(line => {
        config.currentCharacter = line;

        if (config.currentCharacter !== '\n') {
            if (!config.commentInsideLine
                && !config.commentInsideBlock
                && !config.insideQuotation) {
                // calculate count inside comments
                _commentInsideLine();
            } else if (config.commentInsideBlock && !config.insideQuotation) {
                if (config.currentCharacter === '/' && config.previousCharacter === '*') {
                    //Block Comment Closed
                    config.commentInsideBlock = false;
                    config.currentCharacter = null;
                }
            } else if (config.insideQuotation) {
                if (config.currentCharacter === '\'' || config.currentCharacter === '\'') {
                    //Quotation Closed
                    config.insideQuotation = false;
                }
            }
        } else if (config.currentCharacter === '\n') {
            // Line Break
            if (config.commentInsideLine) {
                // Line Comment Closed
                config.commentInsideLine = false;
            }
            if (config.insideLineOfCode) {
                // Line of Code Finished
                config.insideLineOfCode = false;
            }
        }
        config.previousCharacter = config.currentCharacter;
    });

    // return specific config
    const {
        loc,
        countEmptyLine,
        linesWithCommentOrEmpty,
        commentInBlockCount,
        commentInLinetCount
    } = config;

    return {
        loc,
        countEmptyLine,
        linesWithCommentOrEmpty,
        commentInBlockCount,
        commentInLinetCount
    };
};
