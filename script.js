
console.log("Running Sal's Strawberries")

//constants
const HTML_OUTPUT = document.getElementById("databaseOutput");

/************************************* 
//logging in
*************************************/

var GLOBAL_user;
var userName;
var userEmail;
var favFruit;
let loggedIn = false

function fb_authenticate() {
  console.log("Logging in user")
  authenticationListener = firebase.auth().onAuthStateChanged(fb_handleLogin);
}

//run when the login state of the user changes
function fb_handleLogin(_user) {
  if(_user) {
    GLOBAL_user = _user; //save the user to a global variable
    console.log("User is logged in")
    userName = GLOBAL_user.displayName
    userEmail = GLOBAL_user.email
    console.log("Name: " + userName)
    console.log("Email " + userEmail)
    HTML_OUTPUT.innerHTML += "<p> Welcome " + userEmail + "! <p>"
    loggedIn = true
  } else {
    console.log("User is NOT logged in - starting the popup process")
    fb_popupLogin();
  }
}

//run the Google login popup
function fb_popupLogin() {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then((result) => {
    GLOBAL_user = result.user; //save the user details object to a global variable
    console.log("User has logged in")
    userName = GLOBAL_user.displayName
    userEmail = GLOBAL_user.email
    console.log("Name: " + userName)
    console.log("Email " + userEmail)
    HTML_OUTPUT.innerHTML += "<p> Welcome " + userEmail + "! <p>"
    loggedIn = true
  });
}

function fb_write(){
    // Get the form data
    const favoriteFruit = document.getElementById("favoriteFruit").value;
    if(loggedIn == true) {
    var favFruit = prompt("Hello " + userName + "! What is your favourite fruit?");
    console.log(userName + " likes " + favFruit + " best.");
    saveFavFruit()
    } else {
      alert("Please log in first");
    }
  }

  function saveFavFruit(){
   console.log("Running savefavFruit()")
   firebase.database().ref('/').set(
    {
      message: favFruit
    }
  )
}