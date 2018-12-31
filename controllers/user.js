const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

async function isUserExist(email) {
    return models.User.count({ where: { email: email } })
        .then(count => {
            if (count != 0) {
                return true;
            }
            return false;
        });
}

/**
 * Create an user
 */
exports.register = function (req, res) {
    let { email, password } = req.body;

    // Validate Fields
    if (!email || !password) {
        res
            .status(409)
            .json({ message: 'Please enter both email and password' });
    }

    isUserExist(email).then(userExist => {
        if (!userExist) {
            models.User
                .build({
                    email,
                    password
                })
                .save()
                .then(user => res.status(201).json({ message: 'Created successfully' }))
                .catch(err => console.log(err));
        } else {
            res
                .status(409)
                .json({ message: 'Email already exists' });
        }
    });
}
/**
 * Authenticate user
 */
exports.authenticate = function (req, res) {
    let { email, password } = req.body;

    // Validate Fields
    if (!email || !password) {
        res
            .status(409)
            .json({ message: 'Please enter both email and password' });
    }

    models.User.findOne({ where: { email: email } })
        .then(user => {
            if (bcrypt.compareSync(password, user.password)) {
                let token = jwt.sign({
                    id: user.id,
                    email: user.email

                },
                    jwtConfig.secret,
                    {
                        expiresIn: jwtConfig.expiresIn
                    }
                );

                res.json({
                    user: {
                        id: user.id,
                        email: user.email
                    },
                    token: token
                });
            } else {
                res.status(409).json({ message: 'Not a valid password' });
            }
        })
        .catch(err => res.status(404).json({ message: 'Email not found' }));

}