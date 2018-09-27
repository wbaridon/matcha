const mysql = require('mysql');
const db = require('../config/db');
const config = require('../config/config');
const account = require('../models/account');

/******************************************************************************/
const LOGIN_RANDOM_INT = 10000;
const MAX_PROFILES = 1000;
const NBR_OF_INTERESTS_CHANCE = 3;
const NBR_OF_SEXUALITY = 3;
const AGE_MIN = 18;
const AGE_MAX = 65;
const ACTIVATED_ACCOUNT = true;
const EMAIL = '@matcha.fr';
/******************************************************************************/
const NBR_OF_INTERESTS = config.interests.length;
let SQL_INTERESTS = '';
for (let i = 0; i < config.interests.length; i++) {
    SQL_INTERESTS += '`' + config.interests[i] + '`';
    if (i !== config.interests.length - 1)
        SQL_INTERESTS += ', ';
}
/******************************************************************************/

let getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
}

let randChance = chance => {
    return getRandomInt(chance) == 0;
}

let getRandomAge = () => {
    return getRandomInt(AGE_MAX - AGE_MIN) + AGE_MIN;
}

/******************************************************************************/

let Profile = function() {

    if(Profile.count == undefined)
        Profile.count = 1;
    else
        Profile.count++;

    this.firstname = config.firstNames[getRandomInt(config.firstNames.length)];
    this.name = config.lastNames[getRandomInt(config.lastNames.length)];
    this.timestamp = Date.now();
    this.login = this.timestamp + '.' + Profile.count + '.' + getRandomInt(LOGIN_RANDOM_INT);
    this.email = this.login + EMAIL;
    this.gender = randChance(2);
    this.age = getRandomAge();
    this.sexuality = getRandomInt(NBR_OF_SEXUALITY);
    this.idAccount;
    this.isFill = 1;
    this.popularite = getRandomInt(500);

    this.getSQLAccounts = () => {
        return `(${ACTIVATED_ACCOUNT}, '${this.login}', '${this.email}', ${this.timestamp} )`;
    };

    this.setIdAccount = () => {
        return new Promise((resolve, reject) => {
            account.userId(this.login, (err, result) => {
                if (err) throw err;
                this.idAccount = result[0].id;
                resolve();
            });
        })
    };

    this.getSQLProfiles = () => {
        return `('${this.idAccount}', '${this.name}', '${this.firstname}', ${this.gender}, ${this.age},\
         ${this.sexuality}, ${this.popularite}, ${this.isFill})`;
    };

    this.getSQLInterests = (nbrInterests) => {
        let sql = `(${this.idAccount}, `;
        for (let i = 0; i < nbrInterests; i++) {
            sql += randChance(NBR_OF_INTERESTS_CHANCE);
            if (i === nbrInterests - 1)
                sql += ')';
            else
                sql += ', ';
        }
        return sql;
    };
};

/******************************************************************************/

let getAllIdAccount = async (nbr) => {
    return new Promise(async (resolve, reject) => {
        for (i in prfs)
            await prfs[i].setIdAccount();
        resolve();
    });
}

let addInDb = (nbr) => {
    return new Promise((resolve, reject) => {
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
                console.log(nbr + ' FakeProfiles added in accounts DB successfully.');
                resolve();
            }
        });
    });
}

let addInDbProfiles = (nbr) => {
    return new Promise((resolve, reject) => {
        let SQLQuery = 'INSERT INTO profiles \
        (id_account, name, firstname, gender, age, sexuality, popularite, isFill) \
        VALUES ';
        for (let i = 0; i < nbr; i++) {
            SQLQuery += prfs[i].getSQLProfiles();
            if (i !== nbr - 1)
                SQLQuery += ',';
        }
        db.query(SQLQuery, (err, result) => {
            if (err) throw err;
            else {
                console.log(nbr + ' FakeProfiles added in profiles DB successfully.');
                resolve();
            }
        });
    });
}

let addInDbInterests = (nbr) => {
    return new Promise((resolve, reject) => {
        let SQLQuery = 'INSERT INTO interests \
        (id_account, ' + SQL_INTERESTS + ') \
        VALUES ';
        for (let i = 0; i < nbr; i++) {
            SQLQuery += prfs[i].getSQLInterests(NBR_OF_INTERESTS);
            if (i !== nbr - 1)
                SQLQuery += ',';
        }
        db.query(SQLQuery, (err, result) => {
            if (err) throw err;
            else {
                console.log(nbr + ' FakeProfiles added in interests DB successfully.');
                resolve();
            }
        });
    });
}

/******************************************************************************/

const start = async (nbr) => {
    for (let i = 0; i < nbr; i++)
        prfs.push(new Profile);
    await addInDb(nbr);
}
/******************************************************************************/

let prfs = [];

if (process.argv[2]) {
    let nbr = parseInt(process.argv[2]);
    if (nbr <= MAX_PROFILES && nbr >= 0) { // Max fake profiles
        start(nbr).then(() => {
            getAllIdAccount(nbr).then(() => {
                addInDbProfiles(nbr).then(() => {
                    addInDbInterests(nbr).then(() => {
                        db.end();
                    });
                });
            });
        });
    }
    else
        console.log('You can do only ' + MAX_PROFILES + ' fake profiles.');
}
else
    console.log('HOW TO USE: npm run fakeProfiles [nbr]');
