function getNameFromAuth(){
  
firebase.auth().onAuthStateChanged(user=> {
  if (user){
    console.log(user.uid); //print the uid in the browser console
    console.log(user.displayName);  //print the user name in the browser console
    userName = user.displayName;

    document.getElementById('name-goes-here').innerText = user.displayName;
    //method #2:  insert using jquery
    // $("#name-goes-here").text(userName); //using jquery

  }else{

  }
})
  
}

getNameFromAuth();