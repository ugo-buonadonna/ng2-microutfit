module.exports = {
    "extends": "google",
    "plugins": [
        "mocha"
    ],
    "env": {
        "es6": true,
        "mocha": true,
        "node": true
    },
    "rules": {
        "mocha/no-exclusive-tests": "error",
        "arrow-parens": 0,
        "comma-dangle": 1
    }
}