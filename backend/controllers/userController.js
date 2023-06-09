const umodel = require("../models/userModel")
const jwt = require("jsonwebtoken")

module.exports = class userController {
    constructor() {
        console.log("creating userModel")
    };

    async login(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(422).json({ error: 'inappropriate parameters' });
            return;
        }
        const userModel = new umodel();
        const userId = await userModel.login(email, password);
        if (userId < 0) {
            res.status(401).json({ error: 'Wrong email or password' });
        } else {
            const jwtToken = jwt.sign({ userId: userId }, process.env.tokenSecret);
            console.log(`jwtToken returned is:${jwtToken}`);
            res.json(jwtToken);
        }
    };

    async createUser(req, res) {
        const userModel = new umodel();

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(422).json({ error: 'inappropriate parameters' })
            return;
        }
        // Insert user information into the users table
        const existResult = await userModel.checkUserExist(email);
        if (existResult) {
            res.status(409).json({ error: 'User already exist' });
            return;
        }
        const result = await userModel.createUser(name, email, password);
        if (result == false) {
            res.status(500).json({ error: 'Failed to insert user information' });
        } else {
            res.status(200).json({ message: 'User information inserted successfully' });
        }
    };

    async user(req, res) {
        const userId = req.userId;

        const userModel = new umodel();
        const result = await userModel.user(userId);

        if (result == false) {
            res.status(500).json({ error: 'Failed to get user information' });
        } else {
            res.status(200).json(result);
        }
    };

    async star(req, res) {
        const userId = req.userId;
        const { receiver, rate } = req.body;

        const userModel = new umodel();
        const result = await userModel.star(userId, receiver, rate);

        if (result == false) {
            res.status(500).json({ error: 'Failed to star user' });
        } else {
            res.status(200).json({ message: 'Star inserted successfully' });
        }
    };
}