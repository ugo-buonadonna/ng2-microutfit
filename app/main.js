/**
 * Created by ugo on 03/11/16.
 */
"use strict";

let seneca = require("seneca")();

seneca.add({cmd: "sum", role: "math"}, (msg, respond) => {
    let sum = msg.left + msg.right;
    respond(null, {answer: sum});
});

seneca.act({cmd: "sum", left: 1, right: 2, role: "math" }, (err: Error, result: number) => {
    if (err) { return console.error(err); }
    console.log(result);
});
