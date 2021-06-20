import { config } from 'dotenv';
import {Request} from 'express';
import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

config()

const jwtPublicSecret = process.env.JWT_PUBLIC_SECRET.replace(/\\n/g, "\n")

const options = {
  secretOrKey: jwtPublicSecret,
  algorithms: ['RS256'],
  passReqToCallback: true,
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
  ])
};

passport.use('client',
  new Strategy (options, async (req: Request, jwtPayload: any, done: any) => {
    try{ 
      done(null, jwtPayload.formId)
    }catch(err) {
      done(err, false)
    }
  }),
);

export default passport;