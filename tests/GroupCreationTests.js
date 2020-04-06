const { expect } = require('chai');

const { getGroups, createGroup } = require('../appmanager/GroupHelper');

const { GroupData } = require('../model/GroupData');

const { goToGroupPage } = require('../appmanager/NavigationHelper');

const { diff, getDriver } = require('./TestBase');

var _ = require('lodash');

let driver;

describe('Group creation test', function () {
    before(async function () {
        driver = await getDriver();
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
});