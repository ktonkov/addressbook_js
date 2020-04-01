const { Builder, By, until } = require('selenium-webdriver');
const { assert } = require('assert');
const { expect } = require('chai');

const { asyncForEach } = require('../appmanager/HelperBase');

const { createContactIfNoContacts, deleteContact, modifyContact, isThereAContact } = require('../appmanager/ContactHelper');

const { ContactData, isEqual } = require('../model/ContactData');

const { login } = require('../appmanager/SessionHelper');

const { goToHomePage, goToGroupPage } = require('../appmanager/NavigationHelper');

const { init, diff } = require('./TestBase');

var _ = require('lodash');

describe('Contact modification test', function () {
    const driver = new Builder().forBrowser('chrome').build();
    var contactsBefore;
    before(async function () {
        await init(driver);
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
        
        var indexd = 0;

        var contact = new ContactData({
            firstName: 'test',
            lastName: 'test',
            homePhone: 'test',
            email: 'test'
        });

        var contactsAfter = await deleteContact(driver, indexd);

        expect(contactsBefore.length).to.equal(contactsAfter.length + 1);

        contactsBefore.splice(indexd, 1);

        expect(diff(contactsBefore, contactsAfter, ['id', 'firstname', 'lastname'])).to.be.empty;
    });
    after(async function () {
        driver.quit();
    });
    
});