const { Builder, By, until } = require('selenium-webdriver');
const { assert } = require('assert');
const { expect } = require('chai');

const { asyncForEach } = require('../appmanager/HelperBase');

const { getContacts, createContact } = require('../appmanager/ContactHelper');

const { ContactData, isEqual } = require('../model/ContactData');

const { login } = require('../appmanager/SessionHelper');

const { goToHomePage, goToGroupPage } = require('../appmanager/NavigationHelper');

const { init, diff } = require('./TestBase');

var _ = require('lodash');

describe('Contact creation test', function () {
    const driver = new Builder().forBrowser('chrome').build();
    before(async function () {
        await init(driver);
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
    after(async function () {
        driver.quit();
    });
    
});