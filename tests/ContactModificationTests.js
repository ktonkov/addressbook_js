const { expect } = require('chai');

const { createContactIfNoContacts, modifyContact } = require('../appmanager/ContactHelper');

const { ContactData } = require('../model/ContactData');

const { goToHomePage } = require('../appmanager/NavigationHelper');

const { diff, getDriver } = require('./TestBase');

var _ = require('lodash');

let driver;

describe('Contact modification test', function () {
    var contactsBefore;
    before(async function () {
        driver = await getDriver();
        await goToHomePage(driver);

        contactsBefore = await createContactIfNoContacts(driver, 
            new ContactData({
                firstName: 'test',
                lastName: 'test',
                homePhone: 'test',
                email: 'test',
                group: 'test'
            }
        ));
    });
    
    it('Modify and check contact', async function () {
        
        var index = 0;
        var contact = new ContactData({
            firstName: 'test',
            lastName: 'test',
            homePhone: 'test',
            email: 'test'
        });

        contact.setId(contactsBefore[index].getId());
        var contactsAfter = await modifyContact(driver, index, contact);      

        expect(contactsBefore.length).to.equal(contactsAfter.length);

        contactsBefore.splice(index, 1);
        contactsBefore.push(contact);

        expect(diff(contactsBefore, contactsAfter, ['id', 'firstname', 'lastname'])).to.be.empty;
    });
});