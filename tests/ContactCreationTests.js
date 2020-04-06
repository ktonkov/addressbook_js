const { expect } = require('chai');

const { getContacts, createContact } = require('../appmanager/ContactHelper');

const { ContactData } = require('../model/ContactData');

const { goToHomePage } = require('../appmanager/NavigationHelper');

const { diff, getDriver } = require('./TestBase');

var _ = require('lodash');

let driver;

describe('Contact creation test', function () {
    
    before(async function () {
        driver = await getDriver();
    });
    
    it('Create and check contact', async function () {
        
        await goToHomePage(driver);
        var contactsBefore = await getContacts(driver);
        var contact = new ContactData({
            firstName: 'test',
            lastName: 'test',
            homePhone: 'test',
            email: 'test',
            group: 'test'
        });
        var contactsAfter = await createContact(driver, contact);

        expect(contactsBefore.length).to.equal(contactsAfter.length - 1);
        contactsBefore.push(contact);

        expect(diff(contactsBefore, contactsAfter, ['id', 'firstname', 'lastname'])).to.be.empty;
    });
});