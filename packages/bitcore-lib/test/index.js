'use strict';

var should = require('chai').should();
var astracore = require('../');

describe('#versionGuard', function () {
  it('global._astracore should be defined', function () {
    should.equal(global._astracore, astracore.version);
  });

  it('throw an error if version is already defined', function () {
    (function () {
      astracore.versionGuard('version');
    }.should.throw('More than one instance of astracore'));
  });
});
