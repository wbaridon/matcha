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

let Profile = function() {
    this.firstname = names.firstNames[getRandomInt(names.firstNames.length)];
    this.name = names.lastNames[getRandomInt(names.lastNames.length)];
    this.login = this.firstname + this.name + getRandomInt(10000);
    this.email = this.login + '@matcha.fr';
    this.gender = randChance(2);
    this.age = getRandomInt(70);
    this.sexuality = getRandomInt(4);
    this.timestamp = Date.now();
    this.idAccount; 

    console.log('=>  Profile Created');

    this.getSQLAccounts = () => {
        return `(1, '${this.login}', '${this.email}', ${this.timestamp})`;
    };

    this.setIdAccount = () => {
        return new Promise((resolve, reject) => {
            account.userId(this.login, (err, result) => {
                if (err) throw err;
                this.idAccount = result[0].id;
                console.log('Id Account : ' + this.idAccount);
                resolve();
            });
        }) 
    };

    this.getSQLProfiles = () => {
        console.log('Id Account_PROFILE : ' + this.idAccount);
        return `('${this.idAccount}', '${this.name}', '${this.firstname}', ${this.gender}, ${this.age}, ${this.sexuality})`;
    };
};

let getAllIdAccount = async (nbr) => {
    return new Promise(async (resolve, reject) => {
        console.log('Starting getting ID in DB');
        for (i in prfs) {
            await prfs[i].setIdAccount();
        };
        console.log('Finished getting ID in DB');
        resolve();
    });
}

let addInDb = (nbr) => {
    return new Promise((resolve, reject) => {
        console.log('Starting adding in DB');
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
                resolve();
            }
        });
    });
}

let addInDbProfiles = (nbr) => {
    return new Promise((resolve, reject) => {
        let SQLQuery = 'INSERT INTO profiles \
        (id_account, name, firstname, gender, age, sexuality) \
        VALUES ';
        for (let i = 0; i < nbr; i++) {
            SQLQuery += prfs[i].getSQLProfiles();
            if (i !== nbr - 1)
                SQLQuery += ',';
        }
        db.query(SQLQuery, (err, result) => {
            if (err) throw err;
            else {
                console.log('Fake profiles added in profiles DB successfully.');
                resolve();
            }
        });
    });

}

const start = async (nbr) => {
    for (let i = 0; i < nbr; i++)
        prfs.push(new Profile);
    await addInDb(nbr);
}

let names = read.sync(path.join(__dirname, 'names.hjson'), 'utf8');
let prfs = [];

if (process.argv[2]) {
    let nbr = parseInt(process.argv[2]);
    if (nbr <= MAX_PROFILES && nbr >= 0) { // Max fake profiles
        ////////////////////////////
        start(nbr).then(() => {
            getAllIdAccount(nbr).then(() => {
                addInDbProfiles(nbr).then(() => {
                    db.end();
                });
            });
        });

        //profileFiller();
        //console.log(SQLQuery);
        ///////////////////////////
    }
    else
        console.log('You can do only ' + MAX_PROFILES + ' fake profiles.');
}
else
    console.log('HOW TO USE: npm run fakeProfiles [nbr]');