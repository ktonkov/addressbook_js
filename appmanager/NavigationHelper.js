const { By } = require('selenium-webdriver');

const { click, type, isElementPresent } = require('./HelperBase');

exports.goToGroupPage = async function (driver) {
    await click(driver, By.linkText("groups"));
}

exports.goToHomePage = async function (driver) {
    await click(driver, By.linkText("home"));
}