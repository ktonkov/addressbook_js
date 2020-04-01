const { Builder, By, until } = require('selenium-webdriver');
const { assert } = require('assert');
const { expect } = require('chai');

const { asyncForEach } = require('../appmanager/HelperBase');

const { createGroupIfNoGroups, createGroup, isThereAGroup, deleteGroup, modifyGroup } = require('../appmanager/GroupHelper');

const { GroupData, isEqual } = require('../model/GroupData');

const { login } = require('../appmanager/SessionHelper');

const { gotoHomePage, goToGroupPage } = require('../appmanager/NavigationHelper');

const { init, diff } = require('./TestBase');

var _ = require('lodash');

describe('Group deletion test', function () {
    const driver = new Builder().forBrowser('chrome').build();
    var groupsBefore;
    before(async function () {
        await init(driver);
        await goToGroupPage(driver);

        groupsBefore = await createGroupIfNoGroups(driver, 
            new GroupData({
                name: 'test',
                header: 'test',
                footer: 'test'
            }
        ));
    });
    it('Delete and check group', async function () {
        
        var index = 0;

        var groupsAfter = await deleteGroup(driver, index);
        expect(groupsBefore.length).to.equal(groupsAfter.length + 1);
        groupsBefore.splice(index, 1);
        expect(diff(groupsBefore, groupsAfter, ['id', 'name'])).to.be.empty;
    });
    after(async function () {
        driver.quit();
    });
    
});