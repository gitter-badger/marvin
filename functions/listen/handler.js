'use strict';

var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();

function getMessages(listen, cb) {
  var params = {
    TableName: listen.stage + "-" + listen.project + "-chat",
    ScanIndexForward: false,
    ExpressionAttributeValues: {
      ":game": {"S": listen.game},
      ":player": {"S": listen.player}
    },
    FilterExpression: "attribute_not_exists(toPlayer) OR toPlayer = :player OR fromPlayer = :player",
    KeyConditionExpression: "game = :game",
    Select: "ALL_ATTRIBUTES",
    Limit: 20
  };

  dynamodb.query(params, function(err, data) {
    if (err) { return cb(err); }
    return cb(null, data.Items.map(function(x) {
      return {
        "timestamp": x.timestamp.S,
        "from": x.fromPlayer.S,
        "to": x.toPlayer ? x.toPlayer.S : null,
        "chat": x.chat.S
      }
    }))
  });
}

module.exports.handler = function(event, context, cb) {
  return getMessages(event, cb);
};
