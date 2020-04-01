const { login } = require('../appmanager/SessionHelper');

var _ = require('lodash');

exports.init = async function (driver) {
    await driver.get('http://localhost/addressbook/');
    await login(driver, 'admin', 'secret');
}

exports.diff = function (before, after, fields) {
    return _.differenceWith(_.map(before, _.partialRight(_.pick, fields)),
        _.map(after, _.partialRight(_.pick, fields)), _.isEqual)
}

exports.getMaxId = async function (list) {
    var max = 0;
    for (const item of list) {
        if (item.getId() > max) {
            max = await item.getId();
        }
    }
    return max;
}