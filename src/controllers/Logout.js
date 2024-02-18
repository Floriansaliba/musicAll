export default class Logout {
  logout(req, res) {
    if (req.session.user) {
      req.session.user = null;
    }
    res.redirect('/');
  }
}
