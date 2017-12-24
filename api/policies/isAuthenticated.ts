import * as passport from 'passport';

/**
 * @description policy to authenticate the JWT token and put the decrypted user from the jwt token in
 * req.user object
 */
module.exports = (req: Request, res: Response, next: any) => {

    passport.authenticate('jwt', (err: Error, user: dynamicObjects, info: dynamicObjects) => {
        if (err) return res.serverError(err);

        if (!user) {
            return res.status(401).send({
                message: 'You Are not Authorized'
            });
        }

        req.user = user;

        next();
    })(req, res, next);
}