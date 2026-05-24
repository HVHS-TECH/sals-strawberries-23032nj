/************************************* 
// script.js
// written by Nia 
// Sal's Strawberries
*************************************/
console.log("Running Sal's Strawberries")

//constants
const HTML_OUTPUT = document.getElementById("databaseOutput");

//variables
var GLOBAL_user;
let loggedIn = false;
var userName;
var userEmail;
var favFruit;
let customer;
let customerFavFruit ;

/************************************* 
//logging in
*************************************/

 firebase.database().ref('/').set (
  {
    fruits: {
      customers: {
        Anu: 'Watermelon'
      }
    }
  }
 );

function fb_authenticate() {
  console.log("Logging in user")
  authenticationListener = firebase.auth().onAuthStateChanged(fb_handleLogin);
  //fruitsTable();
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

/************************************* 
//getting the users information, saving it to the database, and displaying it in an email
*************************************/

function fb_write(){
    // Get the form data
    if(loggedIn == true) {
      const personName = document.getElementById("name").value;
      const personFruit = document.getElementById("favoriteFruit").value;
      const personServings = document.getElementById("fruitQuantity").value;

      p_name.textContent = "Welcome " + personName  
      p_favoriteFruit.textContent = "Your favourite fruit is " + personFruit
      p_servings.textContent = "You like to have it " + personServings + " times."

      customer = personName
      customerFavFruit = personFruit
      saveFavFruit()
    } else {
      alert("Please log in first");
    }
  }

  function saveFavFruit(){
   console.log("Running savefavFruit()")
   firebase.database().ref('/fruits/customers/'+customer).update({customerFavFruit});
  }

  //old code

//if(loggedIn == true) {
//var favFruit = prompt("Hello " + userName + "! What is your favourite fruit?");
//console.log(userName + " likes " + favFruit + " best.");
//customer = userName
//customerFavFruit = favFruit