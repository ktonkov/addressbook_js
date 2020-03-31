const { Builder, By, until } = require('selenium-webdriver');
const { assert } = require('assert');
const { expect } = require('chai');

const { asyncForEach } = require('../appmanager/HelperBase');

const { createContactIfNoContacts, createContact, modifyContact, isThereAContact } = require('../appmanager/ContactHelper');

const { ContactData, isEqual } = require('../model/ContactData');

const { login } = require('../appmanager/SessionHelper');

const { goToHomePage, goToGroupPage } = require('../appmanager/NavigationHelper');

const { init, diff } = require('./TestBase');

var _ = require('lodash');

describe('Contact modification test', function () {
    const driver = new Builder().forBrowser('chrome').build();
    before(async function () {
        await init(driver);
    });
    
    it('Modify and check contact', async function () {
        
        var id = 0;

        await goToHomePage(driver);

        var contactsBefore = await createContactIfNoContacts(driver, 
            new ContactData({
                firstName: 'test',
                lastName: 'test',
                homePhone: 'test',
                email: 'test'
            }
        ));

        var contact = new ContactData({
            firstName: 'test',
            lastName: 'test',
            homePhone: 'test',
            email: 'test'
        });

        contact.setId(contactsBefore[id].getId());
        var contactsAfter = await modifyContact(driver, id, contact);      

        expect(contactsBefore.length).to.equal(contactsAfter.length);

        contactsBefore.splice(id, 1);
        contactsBefore.push(contact);

        expect(diff(contactsBefore, contactsAfter, ['id', 'firstname', 'lastname'])).to.be.empty;
    });
    after(async function () {
        driver.quit;
    });
    
});