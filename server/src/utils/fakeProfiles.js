const NodeGeocoder = require('node-geocoder');
const geocoder = NodeGeocoder({ provider: 'locationiq', httpAdapter: 'https', apiKey: '2c29b16aa6aabf' });
const db = require('../config/db');
const config = require('../config/config');
const account = require('../models/account');

/******************************************************************************/
const ALLOW_GEOCODER = true;
const LOGIN_RANDOM_INT = 10000;
const MAX_PROFILES = 1000;
const NBR_OF_INTERESTS_CHANCE = 3;
const NBR_OF_SEXUALITY = 3;
const AGE_MIN = 18;
const AGE_MAX = 65;
const ACTIVATED_ACCOUNT = true;
const EMAIL = '@matcha.fr';
const CENTER_X = 2.318397700
const CENTER_Y = 48.896722700
const AROUND_X = 4
const AROUND_Y = 4
const NBR_SAMPLES = 5
const NBR_GRADIENTS = 100000
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

let gradientGen = (callback) => {
    let generated_number = NBR_GRADIENTS
    for(let i = 0; i < NBR_SAMPLES; i++)
        generated_number = getRandomInt(generated_number)
    if (getRandomInt(0, 2) === 0)
        generated_number = -generated_number;
    callback(generated_number);
}

/******************************************************************************/

let Profile = function() {

    if(Profile.count == undefined)
        Profile.count = 1;
    else
        Profile.count++;

    this.firstname = config.firstNames.men[getRandomInt(config.firstNames.men.length)];
    this.name = config.lastNames[getRandomInt(config.lastNames.length)];
    this.timestamp = Date.now();
    this.login = this.timestamp + '.' + Profile.count + '.' + getRandomInt(LOGIN_RANDOM_INT);
    this.email = this.login + EMAIL;
    this.gender = randChance(2);
    this.age = getRandomAge();
    this.sexuality = getRandomInt(NBR_OF_SEXUALITY);
    this.idAccount;
    this.latitude;
    this.longitude;
    this.zipCode = 0;
    this.city = 0;

    this.setLocation = () => {
        return new Promise ((resolve, reject) => {
            gradientGen(nbr1 => {
                this.latitude = CENTER_Y + (nbr1 / NBR_GRADIENTS * AROUND_X)
                gradientGen(nbr2 => {
                    this.longitude = CENTER_X + (nbr2 / NBR_GRADIENTS * AROUND_X)
                    let lat = this.latitude
                    let lon = this.longitude
                    if (ALLOW_GEOCODER === true)
                        setTimeout( () => {
                            geocoder.reverse({lat, lon}).then(call => {
                                resolve({lati: lat, longi: lon, zip: call[0].zipcode, city: call[0].city});
                            })
                        }, 1000);
                })
            })
        })
    }

    this.isFill = 1;
    this.popularite = getRandomInt(500);
    this.setPicture = () => {
      return new Promise ((resolve, reject) => {
        console.log('gender: ' + this.gender)
        if (this.gender === false) {
            var pic = 'https://randomuser.me/api/portraits/men/'+getRandomInt(99)+'.jpg';
        } else {
            var pic = 'https://randomuser.me/api/portraits/women/'+getRandomInt(99)+'.jpg';
        }
        resolve({picture: pic})
      })
    }
    this.isProfile = 1;
    this.isFake = 1;

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

    this.getSQLProfiles = (str) => {
        return new Promise(async (resolve, reject) => {
            await this.setLocation().then( obj =>
            {
                this.longitude = obj.longi
                this.latitude = obj.lati
                this.city = obj.city
                this.zipcode = obj.zip
                console.log(`Lat : ${this.latitude} - Lon : ${this.longitude}`)
                str.s = `('${this.idAccount}', '${this.name}', '${this.firstname}', ${this.gender}, ${this.age},\
                ${this.sexuality}, '${this.zipcode}', '${this.city}', ${this.latitude}, ${this.longitude}, ${this.popularite}, ${this.isFill})`;
                resolve();
            })
        })
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

    this.getSQLPictures = (str) => {
      return new Promise(async (resolve, reject) => {
        console.log('arrive ici')
        await this.setPicture().then( obj => {
          console.log('rentre')
          this.picture = obj.picture
          str.s = `('${this.idAccount}', '${this.picture}', '${this.isProfile}', ${this.isFake})`;
          resolve();
        })
      })
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
    return new Promise(async (resolve, reject) => {
        let SQLQuery = 'INSERT INTO profiles \
        (id_account, name, firstname, gender, age, sexuality, zipcode, city, latitude, longitude, popularite, isFill) \
        VALUES ';
        for (let i = 0; i < nbr; i++) {
            var str = { s: "B"};
            await prfs[i].getSQLProfiles(str);
            SQLQuery += str.s;
            console.log(SQLQuery);
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

let addInDbPictures = (nbr) => {
    return new Promise(async (resolve, reject) => {
        let SQLQuery = 'INSERT INTO images \
        (id_account, filename, isProfile, isFake) \
        VALUES ';
        for (let i = 0; i < nbr; i++) {
            var str = { s: "B"};
            await prfs[i].getSQLPictures(str);
            SQLQuery += str.s;
            console.log(SQLQuery)
            if (i !== nbr - 1)
                SQLQuery += ',';
        }
        db.query(SQLQuery, (err, result) => {
            if (err) throw err;
            else {
                console.log(nbr + ' FakeProfiles added in images DB successfully.');
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
                  addInDbPictures(nbr).then(() => {
                    addInDbInterests(nbr).then(() => {
                        db.end();
                    })
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
