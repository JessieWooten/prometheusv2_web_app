var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");


var config = {
  'apiKey': 'AIzaSyB466PlobIDE2K4e0KVCEu7Jx6palpd79g',
  'authDomain': 'projectoracle-b9c0e.firebaseapp.com',
  'databaseURL': 'https://projectoracle-b9c0e.firebaseio.com',
  'storageBucket': 'projectoracle-b9c0e.appspot.com'
}

const fb = firebase.initializeApp(config)

export default fb