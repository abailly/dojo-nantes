var Omnibus = (function () {
    var commands = ["OPEN", "CLOSE","UP",
        "OPEN", "CLOSE","UP",
        "OPEN", "CLOSE","UP",
        "OPEN", "CLOSE","UP",
        "OPEN", "CLOSE","UP",
        "OPEN", "CLOSE","DOWN"];
    var next = 0;
    

    var nextCommand = function () {
        return commands[next++ % commands.length];
    }
    return {
        nextCommand : nextCommand
    };
});

module.exports = Omnibus;