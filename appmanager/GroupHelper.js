const { By } = require('selenium-webdriver');

const { click, type, isElementPresent, clickOnElement } = require('./HelperBase');

const { GroupData } = require('../model/GroupData');


submitGroupCreation = async function (driver) {
    return click(driver, By.name("submit"));
}

fillGroupForm = async function (driver, groupData) {
    await type(driver, By.name("group_name"), groupData.getName());
    await type(driver, By.name("group_header"), groupData.getHeader());
    return type(driver, By.name("group_footer"), groupData.getFooter());
}

initGroupCreation = async function (driver) {
    return click(driver, By.name("new"));
}

returnToGroupPage = async function(driver) {
    return click(driver, By.linkText("group page"));
}

deleteSelectedGroups = async function (driver) {
    return click(driver, By.name("delete"));
}

selectGroup = async function (driver, index) {
    const elements = await driver.findElements(By.name("selected[]"));
    const element = await elements[index];
    return clickOnElement(element);
}

initGroupModification = async function (driver) {
    return click(driver, By.name("edit"));
}

submitGroupModification = async function (driver) {
    return click(driver, By.name("update"));
}

async function getMaxId(groups) {
    var max = 0;
    for (const group of groups) {
        if (group.getId() > max) {
            max = group.getId();
        }
    }
    return max;
};

getGroups = async function (driver) {
    var groups = [];
    var elements = await driver.findElements(By.css("span.group"));

    for (const element of elements) {
        var _name = await element.getText();
        var _id = await element.findElement(By.tagName("input")).getAttribute("value");
        var group = new GroupData({
            name: _name,
            header: null,
            footer: null
        });
        group.setId(_id);
        groups.push(group);
    }
    return groups;
}

isThereAGroup = async function (driver) {
    return await isElementPresent(driver, By.name("selected[]"));
}

createGroup = async function (driver, group) {
    await initGroupCreation(driver);
    await fillGroupForm(driver, group);
    await submitGroupCreation(driver);
    await returnToGroupPage(driver);
    var groups = await getGroups(driver);
    await group.setId(getMaxId(groups));
    return groups;
}

exports.modifyGroup = async function (driver, index, group) {
    await selectGroup(driver, index);
    await initGroupModification(driver);
    await fillGroupForm(driver, group);
    await submitGroupModification(driver);
    await returnToGroupPage(driver);
    return await getGroups(driver);
}

exports.deleteGroup = async function (driver, index) {
    await selectGroup(driver, index);
    await deleteSelectedGroups(driver);
    await returnToGroupPage(driver);
    return await getGroups(driver);
}

exports.createGroupIfNoGroups = async function (driver, contact) {
    var _isThereAGroup = await isThereAGroup(driver);
    if (!_isThereAGroup) {
        return await createGroup(driver, contact);
    } else {
        return await getGroups(driver);
    };
}

exports.getGroupCount = async function (driver) {
    return await getGroups(driver).size();
}

exports.getGroups = this.getGroups;

exports.createGroup = this.createGroup;