import User from '../repositories/User.js';

export default class SaveTrack {
  async save(req, res) {
    try {
      if (req.session.user) {
        const userEmail = req.session.user.email;

        const response = req.body;
        const newTrack = {
          id: response.id,
          artist: response.artist,
          title: response.title,
          imagePath: response.imgSrc,
          audioPath: response.audioSrc,
        };

        // Trouver l'utilisateur par email
        const user = await User.findOne({ email: userEmail });

        // Ajouter le nouveau morceau au tableau des likes de l'utilisateur
        user.likes.push(newTrack);

        // Sauvegarder les modifications apportées à l'utilisateur
        await user.save();

        res.json({ message: 'success' });
      } else {
        res.status(401).json({ message: 'User not logged in.' });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: 'An error occurred while saving the track.', error });
    }
  }
}
