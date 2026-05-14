// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDrFWDkr0Xf8VX4KwhkYm0P3eJYGr02RE",
  authDomain: "nia-jobanputra-strawberry.firebaseapp.com",
  databaseURL: "https://nia-jobanputra-strawberry-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nia-jobanputra-strawberry",
  storageBucket: "nia-jobanputra-strawberry.firebasestorage.app",
  messagingSenderId: "166417945217",
  appId: "1:166417945217:web:c2b019c1c8557fce723380"
};

//Set up the connection to your Firebase Realtime Database
firebase.initializeApp(firebaseConfig);

console.log(firebase);