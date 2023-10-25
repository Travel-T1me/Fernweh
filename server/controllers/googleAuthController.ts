import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

export const googleAuth = passport.authenticate('google', { scope: ["profile", "email", "https://www.googleapis.com/auth/userinfo.profile"] });

export const googleCallback = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('google', (err: any, user: any, info: any) => {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(401).send(info);
    req.logIn(user, function (err) {
      if (err) return next(err);
      return res.status(200).redirect('http://localhost:3000');
    });
  })(req, res, next);
};

export const isAuthenticated = (req: Request, res: Response) => {
  if (req.isAuthenticated()) return res.status(200).json(req.user);
  return res.status(401).json({ message: 'Unauthorized' });
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    res.clearCookie('connect.sid');
    if (err) res.status(400).send("Couldn't log out");
    else res.status(200).redirect('http://localhost:3000');
  });
};