const { By } = require('selenium-webdriver');

var { click, type } = require('./HelperBase');

exports.login = async function (driver, username, password,) {
    await type(driver, By.name('user'), username);
    await type(driver, By.name('pass'), password);
    await click(driver, By.xpath("//input[@value='Login']"));
}