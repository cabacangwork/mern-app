const multer = require('multer');
const uuidv4 = require('uuid/v4');
const router = require('express').Router();


/**
 * FOR UPLOAD
 * adi man tutorial - https://www.positronx.io/react-file-upload-tutorial-with-node-express-and-multer/
 */

const DIR = './public/'; // temporary la ini na storage kuntaloy (backend > public)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

/**
 * END FOR UPLOAD
 */

let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// it upload.single('avatar') - middleware hit '/users/add' na route
router.post('/add', upload.single('avatar'), (req, res) => {
  const url = req.protocol + '://' + req.get('host'); // get current server url
  const username = req.body.username;

  const newUser = new User({
    username,
    avatar: url + '/public/' + req.file.filename,
  });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;