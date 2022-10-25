const { answer } = require("common");

function main(args) {
    let name = args.name || 'stranger'
    let greeting = 'Hello ' + name + ` from priv-dep! The answer to life, the universe, and everything is ${answer()}.\n`
    console.log(greeting)
    return { "body": greeting }
}

module.exports.main = main;
