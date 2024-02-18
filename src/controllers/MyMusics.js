import User from '../repositories/User.js';

export default class MyMusics {
  async getMusics(req, res) {
    try {
      if (req.session.user) {
        const userEmail = req.session.user.email;
        // Trouver l'utilisateur par email
        const user = await User.findOne({ email: userEmail });
        res.render('myMusics', { user: user });
      }
    } catch (err) {
      console.error(err);
    }
  }
  async deleteMuscic(req, res) {
    const id = req.body.id;
    try {
      if (req.session.user) {
        const userEmail = req.session.user.email;
        // Trouver l'utilisateur par email
        const user = await User.findOne({ email: userEmail });
        // Filtrer les likes pour enlever l'élément avec l'id donné
        const filteredLikes = user.likes.filter((like) => like.id !== id);
        // Mettre à jour l'utilisateur avec les nouveaux likes
        user.likes = filteredLikes;
        await user.save();
        // Rafraichir la page pour afficher les nouvelles likes
        req.flash('success', 'Musique supprimée👍');
        res.json({ message: 'Like deleted successfully', status: 'ok' });
      } else {
        res.status(403).json({ message: 'User not logged in' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred' });
    }
  }
  async addToPlaylist(req, res) {
    const userEmail = req.session.user.email;
    const likeId = req.body.likeId;
    const playlistName = req.body.playlistName;
    const user = await User.findOne({ email: userEmail });
    user.likes.forEach((like) => {
      if (like.id === likeId) {
        console.log(like);
        user.playLists.forEach(async (playList) => {
          if (playList.name === playlistName) {
            console.log(playList.name);
            await User.findOneAndUpdate(
              { email: userEmail, 'playLists.name': playlistName },
              { $addToSet: { 'playLists.$.musics': like } }
            );
            console.log('musique ajoutée dans sa playlist');
          }
        });
      }
    });

    res.json({ message: 'ok' });
  }
}
