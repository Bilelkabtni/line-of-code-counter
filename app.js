const {codeLineCheck} = require('./loc');

// you could run the func in the terminal by passing the path of the file
// Exp: npm start ./test.js
const args = process.argv.slice(2),
    path = args[0];

    console.log("aaaaaaaaaaa")

if (path) {
    const code = codeLineCheck(path);
    console.log('************************************************************');
    console.log(`your file ${path} contains ${code.loc} executable lines code`);
    console.log(`your file ${path} contains ${code.commentInLinetCount} line comment`);
    console.log(`your file ${path} contains ${code.commentInBlockCount} block Comment`);
    console.log(`your file ${path} contains ${code.countEmptyLine()} empty lines`);
    console.log(`your file ${path} contains ${code.linesWithCommentOrEmpty()} empty lines and comments`);
    console.log('************************************************************');
}
