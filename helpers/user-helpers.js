var db = require('../config/connection')
var collection = require('../config/collections')

const bcrypt = require()

module.exports = {
    doSignup: (userData) => {
        return new Promise(async (resolve, reject) => {
            userData.password = await bcrypt.hash(userData.password, 10)
            userData.confirm_password = await bcrypt.hash(userData.password, 10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data) => {
                resolve(userData)
            });
        });
    },
}