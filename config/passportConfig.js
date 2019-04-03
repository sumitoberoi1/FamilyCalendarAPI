const passport = require("passport");
const userData = require("../data/users");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt');
module.exports.setup = function () {
    passport.serializeUser((user,done) => {
        done(null,user._id)
    })
    passport.deserializeUser(async (id,done) => {   
        try {
            const user = await userData.getUserByID(id)
            done(null,user)
        } catch (e) {
            done(e,user)
        }
    })
    passport.use(`local`,new LocalStrategy({passReqToCallback : true}, async (req,userName,password,done) => {
        
        try {
            const user = await userData.getUserByUsername(userName);
            if (user) {
                const passwordsMatch = await bcrypt.compare(password, user.hashedPassword);
                if (passwordsMatch) {
                    return done(null,user)
                } else {
                    return done(null,false,req.flash("error",'Invalid Password'))
                }
            } else {
                return done(null,false,req.flash("error",`User doesn' exist`));
            }
        } catch(e) {
            return done(null,false,req.flash("error",'Invalid Password'));
        }
    }))
 } 
    

module.exports.ensureAuthenticated = (req,res,next) => {
    if (req.isAuthenticated()) {
        next();
      } else {
        req.flash("info", "You must be logged in to see this page.");
        res.redirect("/login");
      }
}