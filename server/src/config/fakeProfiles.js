const mysql = require('mysql');
const db = require('../config/db');
const path = require( 'path' );
const read = require( 'utils-fs-read-hjson' );
const account = require('../models/account');

const MAX_PROFILES = 10000;

let getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
}

let randChance = chance => {
    return getRandomInt(chance) == 0;
}

let Profile = () => {
    this.firstname = names.firstNames[getRandomInt(names.firstNames.length)];
    this.name = names.lastNames[getRandomInt(names.lastNames.length)];
    this.login = this.firstname + this.name + getRandomInt(10000);
    this.email = this.login + '@matcha.fr';
    this.gender = randChance(2);
    this.age = getRandomInt(70);
    this.sexuality = getRandomInt(4);
    this.timestamp = Date.now();
    this.idAccount; 

    this.getSQLAccounts = () => {
        return `(1, '${this.login}', '${this.email}', ${this.timestamp})`;
    };

    this.setIdAccount = () => {
        account.userId(this.login, (err, result) => {
            this.idAccount = result[0].id;
        });
    };

    this.getSQLProfiles = () => {
        return `(1, '${this.login}', '${this.password}', '${this.email}', ${this.timestamp})`;
    };
};

let addInDbAccounts = (callback) => {
    let SQLQuery = 'INSERT INTO accounts \
    (activation, login, email, timestamp) \
    VALUES ';
    for (let i = 0; i < nbr; i++) {
        SQLQuery += prfs[i].getSQLAccounts();
        if (i !== nbr - 1)
            SQLQuery += ',';
    }
    db.query(SQLQuery, (err, result) => {
        if (err) throw err;
        else {
            console.log('Fake profiles added in accounts DB successfully.');
            callback();
        }
    });
}

let addInDbProfiles = () => {
    let SQLQuery = 'INSERT INTO profiles \
    (id_account, name, firstname, gender, age, sexuality, bio) \
    VALUES ';
    for (let i = 0; i < nbr; i++) {
        SQLQuery += prfs[i].getSQLAccounts();
        if (i !== nbr - 1)
            SQLQuery += ',';
    }
    db.query(SQLQuery, (err, result) => {
        if (err) throw err;
        else {
            console.log('Fake profiles added in accounts DB successfully.');
        }
    });
}

let names = read.sync(path.join(__dirname, 'names.hjson'), 'utf8');

if (process.argv[2]){
    let nbr = parseInt(process.argv[2]);
    if (nbr <= MAX_PROFILES && nbr >= 0){ // Max fake profiles
        let prfs = [];
        for(let i = 0; i < nbr; i++)
            await prfs.push(new Profile());
        
        console.log(SQLQuery);
    }
    else
        console.log('You can do only ' + MAX_PROFILES + ' fake profiles.');
}
else
    console.log('HOW TO USE: npm run fakeProfiles [nbr]');

db.end();