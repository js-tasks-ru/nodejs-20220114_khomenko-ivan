const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');
const {Buffer} = require('buffer');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.options = options;
    this.options.sentDataVolume = 0;
  }


  _transform(chunk, encoding, callback) {
    const chunkVolume = Buffer.byteLength(chunk, encoding);
    if (this.options.limit >= this.options.sentDataVolume + chunkVolume) {
      this.options.sentDataVolume += chunkVolume;
    } else {
      this.emit('error', new LimitExceededError('File size exceeded allowed limits'));
      return;
    }
    callback(null, chunk);
  }
}

module.exports = LimitSizeStream;
