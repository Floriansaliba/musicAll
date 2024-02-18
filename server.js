import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import routes from './app/routes.js';
import Mongoose from 'mongoose';
import session from 'express-session';
import flash from 'express-flash-messages';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();
const app = express();

//--------------------------------------------------------------------
//      Mise en place du moteur de template
//--------------------------------------------------------------------
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

//--------------------------------------------------------------------
//      Mise en place du répertoire static
//--------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // For parsing application/json

app.use((req, res, next) => {
  console.log('ici 2', req.body);
  next();
});
//--------------------------------------------------------------------
//      Connection à Mongodb
//--------------------------------------------------------------------

const uri =
  'mongodb+srv://Flo:16111988@cluster0.0rxry7j.mongodb.net/?retryWrites=true&w=majority';

Mongoose.connect(uri)
  .then(() => console.log('Connecté à la DB!'))
  .catch((err) => console.error(err));

// Configuration de la session avant d'utiliser flash

app.use(
  session({
    secret: '1234',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 },
  })
);

// Utilisation de flash message
app.use(flash());

// Session en mode test
app.use((req, res, next) => {
  if (process.env.DEV_MODE == 'test') {
    req.session.user = {
      id: '5ff7ce619c36183a7433247b',
      firstName: 'John',
      lastName: 'Doe',
      email: 'zizou@gmail.com',
    };
    console.log('connecté', req.session.user);
    res.locals.user = req.session.user;
  }
  next();
});

// Vérification de la session
app.use((req, res, next) => {
  if (req.session.user) {
    console.log('connecté', req.session.user);
    res.locals.user = req.session.user;
  } else {
    console.log('non connecté');
  }
  next();
});

//--------------------------------------------------------------------
//      Chargement des routes
//--------------------------------------------------------------------
routes(app);

//--------------------------------------------------------------------
//     Ecoute du serveur HTTP
//--------------------------------------------------------------------
app.listen(process.env.PORT, () => {
  console.log(`Le serveur est démarré : http://localhost:${process.env.PORT}`);
});
