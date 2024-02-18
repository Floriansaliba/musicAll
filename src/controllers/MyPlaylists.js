import User from '../repositories/User.js';
import { v4 as uuidv4 } from 'uuid';

export default class MyPlaylists {
  async getPlaylists(req, res) {
    try {
      if (req.session.user) {
        const userEmail = req.session.user.email;
        // Trouver l'utilisateur par email
        const user = await User.findOne({ email: userEmail });
        const playLists = user.playLists;
        res.render('myPlaylists', { playLists: playLists });
      }
    } catch (err) {
      console.error(err);
    }
  }
  async create(req, res) {
    try {
      if (req.session.user) {
        console.log(req.body.playlist);
        const userEmail = req.session.user.email;
        const user = await User.findOne({ email: userEmail });
        const playlist = req.body.playlist;
        user.playLists.push({ id: uuidv4(), name: playlist, musics: [] });
        await user.save();
        res.redirect('/my-playlists');
      }
    } catch (err) {
      console.error(err);
    }
  }
  async select(req, res) {
    try {
      if (req.session.user) {
        const userEmail = req.session.user.email;
        const user = await User.findOne({ email: userEmail });
        console.log(req.params.id);
        const playlist = user.playLists.find(
          (playlist) => playlist.id === req.params.id
        );

        console.log(playlist);
        res.render('selectedPlaylist', { musics: playlist.musics });
      }
    } catch (err) {
      console.error(err);
    }
  }
  async delete(req, res) {
    try {
      if (req.session.user) {
        const userEmail = req.session.user.email;
        const user = await User.updateOne(
          { email: userEmail },
          { $pull: { playLists: { id: req.body.id } } }
        );
        console.log('Playlist supprimée');
        // Vérifiez si le document a été modifié
        if (user.modifiedCount === 0) {
          return res
            .status(404)
            .json({ message: 'Playlist not found or user not found.' });
        }
        res.status(200).json({ message: 'Playlist deleted successfully.' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteFromPlaylist(req, res) {
    try {
      if (req.session.user) {
        const musicId = req.body.musicId;
        const playListId = req.body.playlistId;
        const userEmail = req.session.user.email;
        // `{"email" : "${userEmail}", 'playLists.id': "${playListId}", 'playLists.musics': {$elemMatch: { "id": "${musicId}" }}}`
        console.log(
          `{"email" : "${userEmail}", "playLists.id": "${playListId}", "playLists.musics": {$elemMatch: { "id": "${musicId}" }}}`
        );
        const user = await User.updateOne(
          { email: userEmail, 'playLists.id': playListId },
          {
            $pull: {
              'playLists.$.musics': { id: musicId },
            },
          }
        );
        // Vérifiez si le document a été modifié
        if (user.modifiedCount === 0) {
          return res
            .status(404)
            .json({ message: 'Playlist not found or user not found.' });
        }
        res.status(200).json({ message: 'Music deleted from playlist.' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
