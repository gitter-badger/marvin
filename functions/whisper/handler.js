'use strict';

var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();

function store(whisper, cb) {
  var params = {
    Item: {
      "game": { S: whisper.body.game },
      "timestamp": { S: new Date().toISOString() },
      "toPlayer": { S: whisper.body.to },
      "fromPlayer": { S: whisper.body.from },
      "chat": { S: whisper.body.whisper }
    },
    TableName: whisper.stage + "-" + whisper.project + "-chat"
  };
  dynamodb.putItem(params, function(err) {
    cb(err ? err : null)
  });

}

module.exports.handler = function(event, context, cb) {
  return store(event, cb);
};
