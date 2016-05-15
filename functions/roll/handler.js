'use strict';

/* Patterns accepted:
 * - 4d20        Rolls a d20 four times
 * - d12+3       Rolls a d12 once and adds 3
 * - d128        Rolls a d128 (arbitrary dice shape) once
 * - 3d6-2       Rolls a d6 three times and subtracts 2
 * - 1d10*10     Rolls a d10 once and multiplies by 10
 * - 4d6+2-4*5  Rolls a d6 four times, adds 2, subtracts 4, then multiplies by 5
 */
var rollPattern = /^(\d+)?d(\d+) ?(\+\d+)?(-\d+)?(\*\d+)?$/;

function die(sides) {
  return {
    "die": "d" + sides.toString(),
    "roll": Math.floor(Math.random() * (sides - 1)) + 1
  };
}

function calculateRoll(numStr, sidesStr, posStr, negStr, mulStr) {
  var num = (numStr === undefined) ? 1 : parseInt(numStr);
  var sides = parseInt(sidesStr);
  var pos = (posStr === undefined) ? 0 : parseInt(posStr);
  var neg = (negStr === undefined) ? 0 : Math.abs(parseInt(negStr));
  var mul = (mulStr === undefined) ? 1 : parseInt(mulStr.slice(1));
  var rolls = new Array(num).fill(sides).map(die);
  var subtotal = rolls.reduce(function(acc, x) { return acc + x.roll; }, pos - neg);

  return {
    "rolls": rolls,
    "modifiers": pos - neg,
    "multiplier": mul,
    "total": subtotal * mul
  };
}

function parse(roll) {
  var tokens = roll.split(rollPattern);
  if (tokens.length === 7) {
    return {
      "roll": roll,
      "result": calculateRoll(tokens[1], tokens[2], tokens[3], tokens[4], tokens[5])
    }
  }

  return undefined;
}

module.exports.handler = function(event, context, cb) {
  var parsed = parse(event.roll);
  var error = (parsed === undefined) ? "Could not parse roll '" + event.roll + "'" : null;
  return cb(error, error ? null : parsed);
};
