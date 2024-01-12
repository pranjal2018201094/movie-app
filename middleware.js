const { jwtDecode } = require('jwt-decode');
const UserModel = require('./models/users');

class Middleware {
    static async validate(req, res, next) {
        try {
            let token = (req.headers.authorization);
            const { email } = jwtDecode(token.split(' ')[1]);
            const userDetails = await UserModel.getUser(email);
            if (userDetails?._id) {
                req.currentUser = userDetails;
                next();
            } else {
                res.sendStatus(401);
            }
        } catch(error) {
            console.log('[ERROR IN MIDDLEWARE]: ', error)
            res.sendStatus(401);
        }
    }
}

module.exports = Middleware;
