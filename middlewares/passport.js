const passport = require("passport");
const jwtConfig = require('../config/jwt');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const models = require('../models');

const params = {
    secretOrKey: jwtConfig.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = function () {
    var strategy = new JwtStrategy(params, function (payload, done) {
        models.User
            .findByPk(payload.id)
            .then(user => {
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }

            }).catch(err => done(err, false));
    });

    passport.use(strategy);

    return {
        initialize: function () {
            return passport.initialize();
        },
        authenticate: function () {
            return passport.authenticate("jwt", { session: jwtConfig.session });
        },
        session: function () {
            return passport.session();
        }
    };
};