var db = require('../config/connection')
var collection = require('../config/collections')
const bcrypt = require('bcrypt');


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

    exists: (userData) => {
        return new Promise(async (resolve, reject) => {
            let SignupStatus = false
            let response = {}
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ email: userData.email })
            {
                if (user) {
                    response.user = user
                    response.status = true
                    resolve(response)

                }
                else {
                    resolve({ states: false })
                }
            }
        })
    },

    doLogin: (userData) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false
            let response = {}
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ email: userData.email })
            if (user) {
                // check if password matches    
                bcrypt.compare(userData.password, user.password).then((status) => {
                    console.log(user.password)
                    console.log(userData.password)

                    if (status) {
                        console.log("login success...");
                        response.user = user
                        response.status = true
                        resolve(response)

                    } else {

                        console.log('login failed');
                        resolve({ status: false })

                    }
                })
            } else {
                resolve({ status: false })
            }
        })

    },
}