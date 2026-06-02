/************************************* 
// script.js
// written by Nia 
// Nia's Nectarines
*************************************/
console.log("Running Nia's Nectarines")

//constants
const HTML_OUTPUT = document.getElementById("databaseOutput");

//variables
var GLOBAL_user;
let loggedIn = false;
let formFilled = false;
let emailFilled = false;
var userName;
var userEmail;
let customer;
let customerFavFruit ;
let customerID;
let customerReview;

/************************************* 
//logging in
*************************************/

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
    userID = GLOBAL_user.uid
    console.log("Name: " + userName)
    console.log("Email: " + userEmail)
    console.log("ID: " + userID)
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
    userID = GLOBAL_user.uid
    console.log(GLOBAL_user);
    console.log("Name: " + userName)
    console.log("Email " + userEmail)
    console.log("ID: " + userID)
    HTML_OUTPUT.innerHTML += "<p> Welcome " + userEmail + "! <p>"
    loggedIn = true
  });
}

/**************************************************************************************** 
//getting the users information, saving it to the database, and displaying it in an email
*****************************************************************************************/

function fb_write(){
    // Get the form data
    if(loggedIn == true) {
      const personName = document.getElementById("name").value;
      const personFruit = document.getElementById("favoriteFruit").value;
      const personServings = document.getElementById("fruitQuantity").value;

      p_name.textContent = "Welcome " + personName  
      p_favoriteFruit.textContent = "Your favourite fruit is " + personFruit
      p_servings.textContent = "You like to have it " + personServings + " times."
      p_offer.textContent = "Please click 'email' to receive your offer"

      customer = personName
      customerFavFruit = personFruit
      customerID = userID
      saveFavFruit()
      formFilled = true;
    } else {
      alert("Please log in first");
    }
  }

  function saveFavFruit(){
   console.log("Running savefavFruit()")
   firebase.database().ref('/fruits/customers/'+customerID).update(
    {
    Name: customer,
    FavouriteFruit: customerFavFruit 
    }
   );
   //firebase.database().ref('/fruits/customers/'+customer).set(customerFavFruit);
  }

 function fb_review() {
  if (formFilled == true) {
  console.log("Running fb_review");
  const personReview = document.getElementById("userReview").value;
  customerReview = personReview
  saveUserReview();
  }
  else {
  alert("Please fill out the form before submitting a review")
  }
 }

 function saveUserReview() {
  console.log("Running saveUserReview");
  firebase.database().ref('/fruits/customers/'+customerID).update(
    {
    Review: customerReview
    }
  )
 }

 function fb_viewReviews() {
  if (formFilled == true) {
    fb_logDatabaseRead();
    p_reviews.textContent 
  }
 }

  function fb_email() {
    if(loggedIn == true && formFilled == true) {
    const personName = document.getElementById("name").value;
    const personFruit = document.getElementById("favoriteFruit").value;
    const personServings = document.getElementById("fruitQuantity").value;

    console.log("running fb_email()");
    p_email.textContent = "Thank you for purchasing from Nia's Nectarines " + personName + "! You have selected " + personServings + " helpings of " + personFruit 
    p_emailTwo.textContent =  "Click purchase to finalise your purchase."
    emailFilled = true;
    } else {
      alert("Please submit the form first");
    }
  }

  function fb_purchase(){
    if(loggedIn == true && formFilled == true && emailFilled == true) {
    p_purchase.textContent = "Your purchase has been confirmed, you'll receive your order in 5 business days!! Thank you for shopping with Nia's Nectarines!"
    }
    else {
      alert("Please click 'email' to recieve your offer first")
    }
  }

  function fb_logDatabaseRead() {
    console.log("Reading message");
    firebase.database().ref("/fruits/customers/").once("value", display, fb_readError);
    console.log("Leaving fb_logDatabaseRead");
  }

  function display(snapshot) {
   var dbData = snapshot.val();
   if (dbData == null) { //if there is no data, dbData will be null
      console.log('There was no record when trying to read the message');
    }
    else {
      console.log("The message is: " + dbData)
    }
}

function fb_readError(error) {
  console.log("There was an error reading the message");
  console.error(error);
}