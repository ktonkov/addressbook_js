const { By, Select } = require('selenium-webdriver');

const { click, type, isElementPresent, clickOnElement, isAlertPresent } = require('./HelperBase');

const { ContactData } = require('../model/ContactData');

const { goToHomePage } = require('./NavigationHelper');

submitContactForm = async function (driver) {
    return click(driver, By.xpath("(//input[@name='submit'])[2]"));
}

fillContactForm = async function (driver, contactData) {
    await type(driver, By.name("firstname"), contactData.getFirstName());
    await type(driver, By.name("lastname"), contactData.getLastName());
    await type(driver, By.name("home"), contactData.getHomePhone());
    await type(driver, By.name("email"), contactData.getEmail());
}

initContactCreationForm = async function (driver) {
    return click(driver, By.linkText("add new"));
}

initContactModificationForm = async function (driver, id) {
    var contacts = await driver.findElements(By.name('entry'));
    return clickOnElement(contacts[id].findElement(By.xpath('//*[@title="Edit"]')));
}

selectContact = async function (driver, id) {
    var contacts = await driver.findElements(By.name("selected[]"))
    return clickOnElement(contacts[id]);
}

modifyFirstContact = async function (driver) {
    return click(driver, By.xpath("//img[@alt='Edit']"));
}

submitContactModification = async function (driver) {
    return click(driver, By.xpath("(//input[@name='update'])[2]"));
}

deleteSelectedContact = async function (driver) {
    return click(driver, By.xpath("(//input[@value='Delete'])"));
}

acceptAlert = async function (driver) {
    if (isAlertPresent(driver)) {
        return await driver.switchTo().alert().accept();
    }
}

returnToHomePage = async function (driver) {
    return click(driver, By.linkText("home page"));
}

getContacts = async function (driver) {
    var contacts = [];
    var elements = await driver.findElements(By.name("selected[]")); 

    for (const element of elements) {
        var _id = await element.getAttribute("value");
        var _firstname = await element.findElement(By.xpath('//td[3]')).getText();
        var _lastname = await element.findElement(By.xpath('//td[2]')).getText();
        var contact = new ContactData({
            firstName: _firstname,
            lastName: _lastname,
            homePhone: null,
            email: null
        });
        contact.setId(_id);
        contacts.push(contact);
    }
    return contacts;
}

async function getMaxId(contacts) {
    var max = 0;
    for (const contact of contacts) {
        max = contact.getId();
    }
    return max;
};

isThereAContact = async function (driver) {
    return await isElementPresent(driver, By.name("entry"));
}

createContact = async function (driver, contact) {
    await initContactCreationForm(driver);
    await fillContactForm(driver, contact);
    await submitContactForm(driver);
    await returnToHomePage(driver);
    var contacts = await getContacts(driver);
    await contact.setId(getMaxId(contacts));
    return contacts;
}

exports.modifyContact = async function (driver, id, contact) {
    await initContactModificationForm(driver, id);
    await fillContactForm(driver, contact);
    await submitContactModification(driver);
    await returnToHomePage(driver);
    return await getContacts(driver);
}

exports.deleteContact = async function (driver, id) {
    await selectContact(driver, id);
    await deleteSelectedContact(driver);
    await acceptAlert(driver);
    await goToHomePage(driver);
    return await getContacts(driver);
}

exports.createContactIfNoContacts = async function (driver, contact) {
    var _isThereAContact = await isThereAContact(driver);
    if (!_isThereAContact) {
        return await createContact(driver, contact);
    } else {
        return await getContacts(driver);
    };
}

exports.getContacts = getContacts;

exports.createContact = createContact;

exports.getContactCount = async function (driver) {
    return getContacts(driver).size();
}