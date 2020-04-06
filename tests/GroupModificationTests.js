const { expect } = require('chai');

const { createGroupIfNoGroups, modifyGroup } = require('../appmanager/GroupHelper');

const { GroupData } = require('../model/GroupData');

const { goToGroupPage } = require('../appmanager/NavigationHelper');

const { diff, getDriver } = require('./TestBase');

var _ = require('lodash');

let driver;

describe('Group modification test', function () {
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
});