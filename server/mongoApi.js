const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/whiteboard');

const db = mongoose.connection;

// initial checks
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connection Successful');
});

const schema = new mongoose.Schema({
  room_name: 'String',
  photo_url: 'String',
  description: 'String',
});

const photosModel = mongoose.model('photos_model', schema);

const getPhotos = function getPhotosByRoomName(name, cb) {
  photosModel.find({ room_name: name }, (err, docs) => {
    if (err) throw err;
    cb(docs);
  });
};

const postPhoto = function postNewPhotoInformation(photoObject, cb) {
  photosModel.insertMany(photoObject, (err, docs) => {
    if (err) throw err;
    cb(docs);
  });
};

const putPhoto = function modifyPhotoInformation(conditions, update, cb) {
  photosModel.findOneAndUpdate(conditions, update, (err, doc) => {
    cb(doc);
  });
};

const deletePhoto = function deletePhoto(conditions, cb) {
  photosModel.findOneAndDelete(conditions, (err, doc) => {
    cb(doc);
  });
};

module.exports = {
  getPhotos,
  postPhoto,
  putPhoto,
  deletePhoto,
};
