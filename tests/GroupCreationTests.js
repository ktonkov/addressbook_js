const { Builder, By, until } = require('selenium-webdriver');
const { assert } = require('assert');
const { expect } = require('chai');

const { asyncForEach } = require('../appmanager/HelperBase');

const { getGroups, createGroup, initGroupCreation } = require('../appmanager/GroupHelper');

const { GroupData, isEqual } = require('../model/GroupData');

const { login } = require('../appmanager/SessionHelper');

const { gotoHomePage, goToGroupPage } = require('../appmanager/NavigationHelper');

const { init, diff, getDriver } = require('./TestBase');

var _ = require('lodash');

let driver;

describe('Group creation test', function () {
    before(async function () {
        driver = await getDriver();
        //await init(driver);
    });
    it('Create and check group', async function () {
        
        await goToGroupPage(driver);
        var groupsBefore = await getGroups(driver);
        var group = new GroupData({
            name: 'test',
            header: 'test',
            footer: 'test'
        });
        var groupsAfter = await createGroup(driver, group);
        expect(groupsBefore.length).to.equal(groupsAfter.length - 1);
        groupsBefore.push(group);        
        expect(diff(groupsBefore, groupsAfter, ['id', 'name'])).to.be.empty;
    });
    /*
    after(async function () {
        driver.quit();
    });
    */
});