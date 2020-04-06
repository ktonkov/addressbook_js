const { expect } = require('chai');

const { createGroupIfNoGroups, deleteGroup } = require('../appmanager/GroupHelper');

const { GroupData } = require('../model/GroupData');

const { goToGroupPage } = require('../appmanager/NavigationHelper');

const { diff, getDriver } = require('./TestBase');

var _ = require('lodash');

let driver;

describe('Group deletion test', function () {
    var groupsBefore;
    before(async function () {
        driver = await getDriver();
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
});