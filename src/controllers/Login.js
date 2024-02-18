import { request } from 'express';
import User from '../repositories/User.js';
import Cookies from 'cookies';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default class Login {
  print(req, res) {
    res.render('login');
  }
  postData = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        console.error('Aucun utilisateur trouvé avec cet email');
        return res.redirect('/login');
      }
      const match = await bcrypt.compare(password, user.password);
      console.log(match);
      console.log(user.firstname, user.lastname, user.email, user.role);
      if (match) {
        req.session.user = {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          role: user.role,
        };
        const token = jwt.sign(
          { email: user.email, role: user.role },
          process.env.JWT_SECRET
        );
        let cookies = new Cookies(req, res);
        cookies.set('jwt', token, { httpOnly: true });
        console.log('logged');
        req.flash('notify', `Connecté !`);
        res.redirect('/');
      }
    } catch (err) {
      console.error('Erreur de connexion', err);
    }
  };
}
