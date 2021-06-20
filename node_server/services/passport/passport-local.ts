import passport from 'passport';
import { Strategy } from 'passport-local'
import UserModel from '../../models/user-model'

const authFields = {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true as true,
  };

passport.use("login", 
  new Strategy(
      authFields, async (req, username, password, done) => {
        try {
          const user = await UserModel.findOne({email: username})
          if (!user) throw new Error('No found user')
          const validatePassword = await user.validatePassword(password)
          if (!validatePassword) {
            throw new Error('Invalid user or password')
          }
          return done(null, user)          
        } catch (error) {
          return done(error)
        }
      }
  ) 
)

passport.use("signup",
  new Strategy(
      authFields, async (req, email, password, done) => {
        try{
          const checkEmail = await UserModel.checkExistingField('email', email);
          if (checkEmail) {
            throw new Error('Email already registered, log in instead')
          }
          const newUser = await UserModel
            .build(
              { 
                email: email
              }
            )
          newUser.passwordToHash(password)
          await newUser.save();
            return done(null, newUser);
          } catch (err) {
            return done(err, false, {message: err.message});
          }
        }
  )
)

export default passport