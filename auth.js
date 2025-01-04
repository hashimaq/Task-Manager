const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');

// Initialize Passport Local Strategy
passport.use(
    new LocalStrategy(
        async (username, password, done) => {
            try {
                // Find user by username
                const user = await User.findOne({ username });
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }

                // Check password
                const isPasswordMatch = await user.comparePassword(password);
                if (isPasswordMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Incorrect password.' });
                }
            } catch (error) {
                return done(error);
            }
        }
    )
);

//middleware to put authentication
const authenticate = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized', info });
        }
        req.user = user;
        next();
    })(req, res, next);
}

module.exports= {passport,authenticate};