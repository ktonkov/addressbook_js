const { GroupData, isEqual } = require('../model/GroupData');

var _ = require('lodash');


describe('lodash tests', function () {
    it('something', function () {
        var array1 = [{a: 1, b: 2, c: 3}, {a: 2, b: 2, c: 3}, {a: 3, b: 2, c: 3}];
        var array2 = [{a: 1, b: 2, c: 3}, {a: 2, b: 2, c: 3}];
        console.log(_.differenceWith(array1, array2, _.isEqual));
    });
});