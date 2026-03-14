function checkPassword(){

const pw = document.getElementById("passwordInput").value;

if(pw === "12345"){

document.getElementById("lockScreen").style.display="none";
document.getElementById("app").style.display="block";

}else{

alert("Wrong Password");

}

}
