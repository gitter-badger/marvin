'use strict';

var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();

function store(utterance, cb) {
  var params = {
    Item: {
      "game": { S: utterance.body.game },
      "timestamp": { S: new Date().toISOString() },
      "fromPlayer": { S: utterance.body.from },
      "chat": { S: utterance.body.utterance }
    },
    TableName: utterance.stage + "-" + utterance.project + "-chat"
  };
  if (utterance.body.to) {
    params.Item.toPlayer = { S: utterance.body.to }
  }
  dynamodb.putItem(params, function(err) {
    cb(err ? err : null)
  });

}

module.exports.handler = function(event, context, cb) {
  return store(event, cb);
};
