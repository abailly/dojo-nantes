var Omnibus = (function () {
    var commands = ["OPEN", "CLOSE","UP", "OPEN"];
    var next = 0;
    

    var nextCommand = function () {
        return commands[next++];
    }
    return {
        nextCommand : nextCommand
    };
});

module.exports = Omnibus;