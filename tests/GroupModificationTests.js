const { Builder, By, until } = require('selenium-webdriver');
const { assert } = require('assert');
const { expect } = require('chai');

const { asyncForEach } = require('../appmanager/HelperBase');

const { createGroupIfNoGroups, createGroup, isThereAGroup, modifyGroup } = require('../appmanager/GroupHelper');

const { GroupData, isEqual } = require('../model/GroupData');

const { login } = require('../appmanager/SessionHelper');

const { gotoHomePage, goToGroupPage } = require('../appmanager/NavigationHelper');

const { init, diff } = require('./TestBase');

var _ = require('lodash');

describe('Group modification test', function () {
    const driver = new Builder().forBrowser('chrome').build();
    before(async function () {
        await init(driver);
    });
    it('Modify and check group', async function () {
        
        var id = 0;

        await goToGroupPage(driver);

        var groupsBefore = await createGroupIfNoGroups(driver, 
            new GroupData({
                name: 'test',
                header: 'test',
                footer: 'test'
            }
        ));

        var group = new GroupData({
            name: 'test',
            header: 'test',
            footer: 'test'
        });
        group.setId(groupsBefore[id].getId());
        var groupsAfter = await modifyGroup(driver, id, group);
        expect(groupsBefore.length).to.equal(groupsAfter.length);

        groupsBefore.splice(id, 1);

        groupsBefore.push(group);

        expect(diff(groupsBefore, groupsAfter, ['id', 'name'])).to.be.empty;
    });
    after(async function () {
        driver.quit;
    });
    
});