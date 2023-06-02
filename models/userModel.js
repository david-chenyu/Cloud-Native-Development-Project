const { MongoClient } = require("mongodb");
const uri = "mongodb://mongo:27017/";

module.exports = class {
    constructor() {
        this.client = new MongoClient(uri);
    };

    checkUserExist(email) {
        console.log("checking user exist with: ", email);
        return new Promise(async (resolve, reject) => {
            try {
                const database = this.client.db('cnp');
                const user = database.collection('user');
                const query = { email: email };
                console.log('query', query);
                const data = await user.findOne(query);
                //console.log('data', data);
                if(!data) resolve(false);
                resolve(true);
            } catch (err) {
                console.error('Error:', err);
            }
            reject(false);
        })
    }

    createUser(email, password) {
        console.log("creating user with: ", email, password);
        return true;
        // const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
        return new Promise((resolve, reject) => {
            // this.connection.query(query, [email, password], (err, result) => {
            //     if (err) {
            //         console.error('Error inserting user information:', err);
            //         reject(false);
            //     } else {
            //         resolve(true);
            //     }
            // });
        })
    };

    login(email, password) {
        console.log("login with: ", email, password);
        const user = { user: email };
        return 1; // userId
        // const query = 'SELECT * FROM users WHERE email = ?';
        return new Promise((resolve, reject) => {
            // this.connection.query(query, [email], (err, results) => {
            //     if (err) {
            //         console.error('Error fetching user from the database:', err);
            //         reject("Error fetching user from the database!");
            //     } else {
            //         const returnPwd = results[0].password;
            //         console.log("fetched pwd: ", returnPwd);
            //         if (returnPwd == password) {
            //             const user = { user: email };
            //             const jwtToken = jwt.sign(user, process.env.tokenSecret);
            //             resolve(jwtToken);
            //         } else {
            //             reject(false);
            //         }
            //     }
            // });
        });
    };
}