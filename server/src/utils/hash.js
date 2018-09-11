/*******************************************************************************
module.exports.hash(String, (hash) => {})
module.exports.verify(String, String, (ok) => {})
*******************************************************************************/
const MAX_SIZE = 32
const ALLOWED_CHAR = "qwertyuiopasdfghjklzxcvbnm"
const ROT_PASSES = 10
/******************************************************************************/

hash = (str, callback) => {
    hash = ""
    size = str.length
    k = 0
    str += String.fromCharCode(str.charCodeAt(0) + 1 + str.length)
    console.log(str)
    while (hash.length <= MAX_SIZE) {
        for (let i = 0; i < ROT_PASSES; i++) {
            str = str.slice(0);
            str2 = ""
            for (var j = 0; j < str.length; j++) {
                str2 += String.fromCharCode(str.charCodeAt(j) + j + i + k)
            }
            str += str2
        }
        for (let i = 0; i < str.length; i++) {
            if (ALLOWED_CHAR.indexOf(str[i]) !== -1) {
                hash += str[i]
            } 
        }
        str = hash
        k = j;
    }
    //console.log("Hash: " + hash)
    hash = hash.slice(hash.length - MAX_SIZE)
    callback(hash);
}

verify = (str, hash, callback) => {
    hash(str, (hash2) => {
        callback(hash === hash2);
    })
}

module.exports.hash = hash;
module.exports.verify = verify;