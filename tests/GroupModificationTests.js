const { Builder, By, until } = require('selenium-webdriver');
const { assert } = require('assert');
const { expect } = require('chai');

const { asyncForEach } = require('../appmanager/HelperBase');

const { createGroupIfNoGroups, createGroup, isThereAGroup, modifyGroup } = require('../appmanager/GroupHelper');

const { GroupData, isEqual } = require('../model/GroupData');

const { login } = require('../appmanager/SessionHelper');

const { gotoHomePage, goToGroupPage } = require('../appmanager/NavigationHelper');

const { init, diff, getDriver } = require('./TestBase');

var _ = require('lodash');

let driver;

describe('Group modification test', function () {
    var groupsBefore;
    before(async function () {
        driver = await getDriver();
        //await init(driver);
        await goToGroupPage(driver);

        groupsBefore = await createGroupIfNoGroups(driver, 
            new GroupData({
                name: 'test',
                header: 'test',
                footer: 'test'
            }
        ));
    });
    it('Modify and check group', async function () {
        
        var index = 0;

        var group = new GroupData({
            name: 'test',
            header: 'test',
            footer: 'test'
        });
        group.setId(groupsBefore[index].getId());
        var groupsAfter = await modifyGroup(driver, index, group);
        expect(groupsBefore.length).to.equal(groupsAfter.length);

        groupsBefore.splice(index, 1);

        groupsBefore.push(group);

        expect(diff(groupsBefore, groupsAfter, ['id', 'name'])).to.be.empty;
    });
    /*
    after(async function () {
        driver.quit();
    });
    */
});