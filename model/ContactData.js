class ContactData {
    constructor({
        firstName,
        lastName,
        homePhone,
        email,
        group
    }) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.homePhone = homePhone;
        this.email = email;
        this.group = group;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getFirstName() {
        return this.firstName;
    }

    getLastName() {
        return this.lastName;
    }

    getHomePhone() {
        return this.homePhone;
    }

    getEmail() {
        return this.email;
    }

    getGroup() {
        return this.group;
    }
}

exports.isEqual = async function (contact1, contact2) {
    return contact1.getId() == group2.getId() &&
        contact1.firstName() == contact2.firstName();
}

exports.ContactData = ContactData;