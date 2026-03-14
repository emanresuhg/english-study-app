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


let currentSetIndex=null

function loadSets(){

const sets = JSON.parse(localStorage.getItem("wordSets")) || []

const list=document.getElementById("setList")

if(!list) return

list.innerHTML=""

sets.forEach((set,i)=>{

const div=document.createElement("div")

div.className="wordCard"

div.innerHTML=`

<b>${set.name}</b>

<div class="wordActions">

<button class="smallBtn" onclick="openSet(${i})">열기</button>

<button class="smallBtn" onclick="deleteSet(${i})">삭제</button>

</div>

`

list.appendChild(div)

})

}

function addSet(){

const name=document.getElementById("setName").value

if(!name) return

const sets=JSON.parse(localStorage.getItem("wordSets"))||[]

sets.push({name:name,words:[]})

localStorage.setItem("wordSets",JSON.stringify(sets))

document.getElementById("setName").value=""

loadSets()

}

function deleteSet(i){

const sets=JSON.parse(localStorage.getItem("wordSets"))||[]

sets.splice(i,1)

localStorage.setItem("wordSets",JSON.stringify(sets))

loadSets()

}

function openSet(i){

currentSetIndex=i

const sets=JSON.parse(localStorage.getItem("wordSets"))||[]

document.getElementById("currentSetTitle").innerText=sets[i].name

document.getElementById("wordSection").style.display="block"

loadWords()

}

function backToSets(){

document.getElementById("wordSection").style.display="none"

}

function loadWords(){

const sets=JSON.parse(localStorage.getItem("wordSets"))||[]

const words=sets[currentSetIndex].words

const list=document.getElementById("wordList")

list.innerHTML=""

words.sort((a,b)=>a.eng.localeCompare(b.eng))

words.forEach((w,i)=>{

const div=document.createElement("div")

div.className="wordCard"

div.innerHTML=`

<b>${w.eng}</b> : ${w.mean.join(", ")}

<div class="wordActions">

<button class="smallBtn" onclick="speakWord('${w.eng}')">🔊</button>

<button class="smallBtn" onclick="toggleFavorite(${i})">${w.favorite?"★":"☆"}</button>

<button class="smallBtn" onclick="deleteWord(${i})">삭제</button>

</div>

`

list.appendChild(div)

})

}

function addWord(){

const eng=document.getElementById("englishWord").value

const meanings=document.getElementById("meanings").value

if(!eng || !meanings) return

const sets=JSON.parse(localStorage.getItem("wordSets"))||[]

const meanList=meanings.split(",")

sets[currentSetIndex].words.push({

eng:eng,

mean:meanList,

favorite:false

})

localStorage.setItem("wordSets",JSON.stringify(sets))

document.getElementById("englishWord").value=""
document.getElementById("meanings").value=""

loadWords()

}

function deleteWord(i){

const sets=JSON.parse(localStorage.getItem("wordSets"))||[]

sets[currentSetIndex].words.splice(i,1)

localStorage.setItem("wordSets",JSON.stringify(sets))

loadWords()

}

function toggleFavorite(i){

const sets=JSON.parse(localStorage.getItem("wordSets"))||[]

const word=sets[currentSetIndex].words[i]

word.favorite=!word.favorite

localStorage.setItem("wordSets",JSON.stringify(sets))

loadWords()

}

function speakWord(word){

const msg=new SpeechSynthesisUtterance(word)

speechSynthesis.speak(msg)

}

loadSets()
