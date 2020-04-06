const { By } = require('selenium-webdriver');

const { click, type, isElementPresent } = require('./HelperBase');

exports.goToGroupPage = async function (driver) {
    var isOnGroupPage = await isElementPresent(driver, By.tagName('h1')) 
        && await driver.findElement(By.tagName('h1')).getText() == 'Groups'
        && await isElementPresent(driver, By.name('new'));
    if (!isOnGroupPage) {
        await click(driver, By.linkText("groups"));
    }
}

exports.goToHomePage = async function (driver) {
    var isOnHomePage = await isElementPresent(driver, By.id('maintable'));
    if (!isOnHomePage) {
        await click(driver, By.linkText("home"));
    }
}