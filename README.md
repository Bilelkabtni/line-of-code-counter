# count-line-of-codes
App that counts the Lines of Code (LOC) in a file.

## Installation
This project requires **NodeJS**
Please use node js and run npm install.

## Usage
```npm run start {your path}```
Example: **npm run start ./test.js**

```javascript
const code = codeLineCheck(path);
console.log(`your file ${path} contains ${code.loc} executable lines code`); // return executable lines code count.
```

## Testing
Please run:
 ```npm test.```

## Linting
Please run:
```npm lint.```

## License

[MIT](https://github.com/Bilelkabtni/line-of-code-counter/blob/master/LICENSE)
