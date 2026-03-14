function checkPassword(){

const pw = document.getElementById("passwordInput").value;

if(pw === "12345"){

document.getElementById("lockScreen").style.display="none";
document.getElementById("app").style.display="block";

}else{

alert("Wrong Password");

}

}

function goHome(){

location.href="../index.html"

}


function loadSets(){

const sets = JSON.parse(localStorage.getItem("wordSets")) || []

const list = document.getElementById("setList")

list.innerHTML=""

sets.forEach((set,i)=>{

const div=document.createElement("div")

div.innerHTML=set.name

list.appendChild(div)

})

}


function addSet(){

const name = document.getElementById("setName").value

if(!name)return

const sets = JSON.parse(localStorage.getItem("wordSets")) || []

sets.push({name:name,words:[]})

localStorage.setItem("wordSets",JSON.stringify(sets))

loadSets()

}


if(document.getElementById("setList")){

loadSets()

}

function loadPassages(){

const passages = JSON.parse(localStorage.getItem("passages")) || []

const list = document.getElementById("passageList")

if(!list)return

list.innerHTML=""

passages.forEach(p=>{

const div=document.createElement("div")

div.innerHTML=p.title

list.appendChild(div)

})

}


function addPassage(){

const title=document.getElementById("title").value
const text=document.getElementById("text").value
const translation=document.getElementById("translation").value
const topic=document.getElementById("topic").value

const passages=JSON.parse(localStorage.getItem("passages"))||[]

passages.push({title,text,translation,topic})

localStorage.setItem("passages",JSON.stringify(passages))

loadPassages()

}


loadPassages()
