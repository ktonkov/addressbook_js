class GroupData {
    constructor({name, header, footer}) {
        this.name = name;
        this.header = header;
        this.footer = footer;
    }

    equals(other) {
        return this.id == other.id &&
            this.name == other.name;
    }

    getName() {
        return this.name;
    }

    getHeader() {
        return this.header;
    }

    getFooter() {
        return this.footer;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }
}

exports.isEqual = async function (group1, group2) {
    return group1.getId() == group2.getId() &&
        group1.getName() == group2.getName();
}

exports.GroupData = GroupData;