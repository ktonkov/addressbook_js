const { login } = require('../appmanager/SessionHelper');
const { config } = require('./config');

var _ = require('lodash');

exports.init = async function (driver) {
    await driver.get(config.url);
    await login(driver, config.testAccount.login, config.testAccount.password);
};

exports.diff = function (before, after, fields) {
    return _.differenceWith(_.map(before, _.partialRight(_.pick, fields)),
        _.map(after, _.partialRight(_.pick, fields)), _.isEqual)
};

exports.getMaxId = async function (list) {
    var max = 0;
    for (const item of list) {
        if (item.getId() > max) {
            max = await item.getId();
        }
    }
    return max;
};

exports.asyncForEach = async function (arr, cb) {
    for (let i = 0; i < arr.length; i++) {
        await cb(arr[i], i, arr);
    }
};

exports.getDriver = async () => {
    if (global.driver) {
        return global.driver;
    }

    let builder = await new Builder().forBrowser('chrome').build();
    
    return builder;
};