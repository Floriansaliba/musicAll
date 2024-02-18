import User from '../repositories/User.js';
import bcrypt from 'bcryptjs';

export default class Subscribe {
  print(req, res) {
    res.render('subscribe');
  }

  async postData(req, res) {
    const { firstName, lastName, email, password } = req.body;

    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const newUser = new User();
      newUser.lastname = lastName.toLowerCase();
      newUser.firstname = firstName.toLowerCase();
      newUser.email = email.toLowerCase();
      newUser.password = hash;
      newUser.role = 'user';

      await newUser.save();
      req.flash('notify', '🎉 Inscrit  !');
      res.redirect('/');
    } catch (error) {
      console.error('Error during user registration: ', error);
      res.status(500).send('An error occurred during user registration.');
    }
  }
}
