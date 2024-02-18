import Home from '../src/controllers/Home.js';
import Login from '../src/controllers/Login.js';
import Logout from '../src/controllers/Logout.js';
import MyMusics from '../src/controllers/MyMusics.js';
import MyPlaylists from '../src/controllers/MyPlaylists.js';
import SaveTrack from '../src/controllers/SaveTrack.js';
import Search from '../src/controllers/Search.js';
import Subscribe from '../src/controllers/Subscribe.js';

export default (app) => {
  app.get('/', new Home().print);
  app.get('/subscribe', new Subscribe().print);
  app.post('/subscribe', new Subscribe().postData);
  app.get('/login', new Login().print);
  app.post('/login', new Login().postData);
  app.get('/search', new Search().search);
  app.post('/save-track', new SaveTrack().save);
  app.get('/logout', new Logout().logout);
  app.get('/my-musics', new MyMusics().getMusics);
  app.post('/delete-track', new MyMusics().deleteMuscic);
  app.get('/my-playlists', new MyPlaylists().getPlaylists);
  app.post('/my-playlists/add', new MyPlaylists().create);
  app.get('/my-playlists/:id', new MyPlaylists().select);
  app.post('/add-to-playlist', new MyMusics().addToPlaylist);
  app.post('/delete-playlist', new MyPlaylists().delete);
  app.post('/delete-from-playlist', new MyPlaylists().deleteFromPlaylist);
};
