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


let testWords=[]
let currentQuestion=0
let correctCount=0
let wrongWords=[]
let timerInterval
let timeLeft=10

function loadTestSets(){

const sets=JSON.parse(localStorage.getItem("wordSets"))||[]

const container=document.getElementById("setSelection")

if(!container) return

container.innerHTML=""

sets.forEach((set,i)=>{

const div=document.createElement("div")

div.className="setItem"

div.innerHTML=`
<label>
<input type="checkbox" value="${i}">
${set.name}
</label>
`

container.appendChild(div)

})

}

function startWordTest(){

const checkboxes=document.querySelectorAll("#setSelection input:checked")

const sets=JSON.parse(localStorage.getItem("wordSets"))||[]

testWords=[]

checkboxes.forEach(cb=>{

const setIndex=cb.value

testWords=testWords.concat(sets[setIndex].words)

})

if(testWords.length===0){

alert("세트를 선택하세요")

return

}

shuffleArray(testWords)

currentQuestion=0
correctCount=0
wrongWords=[]

document.getElementById("testArea").style.display="block"

showQuestion()

}

function showQuestion(){

if(currentQuestion>=testWords.length){

endTest()

return

}

const type=document.getElementById("testType").value

const word=testWords[currentQuestion]

const q=document.getElementById("question")

if(type==="meaning"){

q.innerText=word.eng

}else{

q.innerText=word.mean.join(", ")

}

document.getElementById("answerInput").value=""

startTimer()

}

function submitAnswer(){

clearInterval(timerInterval)

const type=document.getElementById("testType").value

const word=testWords[currentQuestion]

const userAnswer=document.getElementById("answerInput").value.trim()

let correct=false

if(type==="meaning"){

correct=word.mean.includes(userAnswer)

}else{

correct=userAnswer.toLowerCase()===word.eng.toLowerCase()

}

if(correct){

correctCount++

}else{

wrongWords.push({

question:word.eng,

correct:word.mean.join(", "),

user:userAnswer

})

alert("정답: "+word.mean.join(", "))

}

currentQuestion++

showQuestion()

}

function endTest(){

document.getElementById("testArea").style.display="none"

const result=document.getElementById("resultArea")

result.innerHTML=`

<h2>테스트 종료</h2>

<p>정답률: ${correctCount}/${testWords.length}</p>

`

saveWrongNotes()

}

function startTimer(){

timeLeft=10

const timer=document.getElementById("timer")

timer.innerText="남은 시간: "+timeLeft

timerInterval=setInterval(()=>{

timeLeft--

timer.innerText="남은 시간: "+timeLeft

if(timeLeft<=0){

clearInterval(timerInterval)

submitAnswer()

}

},1000)

}

function shuffleArray(array){

for(let i=array.length-1;i>0;i--){

const j=Math.floor(Math.random()*(i+1))

[array[i],array[j]]=[array[j],array[i]]

}

}

function saveWrongNotes(){

if(wrongWords.length===0) return

let notes=JSON.parse(localStorage.getItem("wrongNotes"))||[]

wrongWords.forEach(w=>{

notes.push({

type:"wordMeaning",

question:w.question,

correct:w.correct,

user:w.user

})

})

localStorage.setItem("wrongNotes",JSON.stringify(notes))

}

loadTestSets()
