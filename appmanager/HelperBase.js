async function click(driver, locator) {
    await driver.findElement(locator).click();
}

async function isElementPresent(driver, locator) {
    var elements = await driver.findElements(locator);

    return await elements.length != 0;
}

exports.click = click;
exports.isElementPresent = isElementPresent;

exports.type = async function (driver, locator, text) {
    if (text != null || driver.findElement(locator).getAttribute("value") != text) {
        await click(driver, locator);
        await driver.findElement(locator).clear();
        await driver.findElement(locator).sendKeys(text);
    }
}

exports.clickOnElement = async function (element) {
    await element.click();
}

exports.isAlertPresent = async function () {
    try {
        await driver.switchTo().alert();
        return true;
    } catch (err) {
        return false;
    }
}