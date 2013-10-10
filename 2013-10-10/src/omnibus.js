var Omnibus = (function () {
    var commands = ["OPEN", "CLOSE","UP"];
    var next = 0;
    

    var nextCommand = function () {
        return commands[next++ % 3];
    }
    return {
        nextCommand : nextCommand
    };
});

module.exports = Omnibus;