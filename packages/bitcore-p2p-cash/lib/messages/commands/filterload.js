'use strict';

var Message = require('../message');
var inherits = require('util').inherits;
var astracore = require('astracore-lib-cash');
var BufferUtil = astracore.util.buffer;
var BloomFilter = require('../../bloomfilter');
var $ = astracore.util.preconditions;
var _ = astracore.deps._;

/**
 * Request peer to send inv messages based on a bloom filter
 * @param {BloomFilter=} arg - An instance of BloomFilter
 * @param {Object} options
 * @extends Message
 * @constructor
 */
function FilterloadMessage(arg, options) {
  Message.call(this, options);
  this.command = 'filterload';
  $.checkArgument(
    _.isUndefined(arg) || arg instanceof BloomFilter,
    'An instance of BloomFilter or undefined is expected'
  );
  this.filter = arg;
}
inherits(FilterloadMessage, Message);

FilterloadMessage.prototype.setPayload = function (payload) {
  this.filter = BloomFilter.fromBuffer(payload);
};

FilterloadMessage.prototype.getPayload = function () {
  if (this.filter) {
    return this.filter.toBuffer();
  } else {
    return BufferUtil.EMPTY_BUFFER;
  }
};

module.exports = FilterloadMessage;
