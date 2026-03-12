let lastMaintenance = 0

function calcMaintenance(){
let age=+ageEl().value
let h=+heightEl().value
let w=+weightEl().value
let g=genderEl().value
let a=+activityEl().value

if(!age||!h||!w) return alert("Fill all fields")

let bmr = g==="male"
 ? 10*w + 6.25*h - 5*age + 5
 : 10*w + 6.25*h - 5*age - 161

lastMaintenance = Math.round(bmr*a)

document.getElementById("result").innerHTML =
`Maintenance Calories: <b>${lastMaintenance} kcal/day</b>`
}

function calcTransformation(){
let cur=+document.getElementById("currentWeight").value
let target=+document.getElementById("targetWeight").value
let weeks=+document.getElementById("weeks").value

if(!lastMaintenance) return alert("Calculate maintenance first")
if(!cur||!target||!weeks) return alert("Fill transformation fields")

let change = target-cur
let totalCalories = change*7700
let daily = totalCalories/(weeks*7)

let goalCalories = Math.round(lastMaintenance+daily)

let mode = change>0 ? "gain" : "lose"

document.getElementById("transformResult").innerHTML =
`To ${mode} weight and reach ${target}kg:<br>
Eat about <b>${goalCalories} kcal/day</b>`
}

/* Helpers */
function ageEl(){return document.getElementById("age")}
function heightEl(){return document.getElementById("height")}
function weightEl(){return document.getElementById("weight")}
function genderEl(){return document.getElementById("gender")}
function activityEl(){return document.getElementById("activity")}

/* DAILY TRACKER */

function saveDay(){
let w=document.getElementById("dayWeight").value
let c=document.getElementById("dayCalories").value
if(!w||!c) return alert("Fill both")

let data=JSON.parse(localStorage.getItem("progress")||"[]")

data.push({
date:new Date().toLocaleDateString(),
weight:+w,
calories:+c
})

localStorage.setItem("progress",JSON.stringify(data))
drawGraph(7)
}

function drawGraph(range){
let data=JSON.parse(localStorage.getItem("progress")||"[]")
if(range!=="all") data=data.slice(-range)

let canvas=document.getElementById("graph")
let ctx=canvas.getContext("2d")
ctx.clearRect(0,0,320,180)

if(data.length<2) return

let max=Math.max(...data.map(d=>d.weight))
let min=Math.min(...data.map(d=>d.weight))
let scale=140/(max-min||1)

ctx.beginPath()
ctx.moveTo(0,180-(data[0].weight-min)*scale)

data.forEach((d,i)=>{
let x=i*(320/(data.length-1))
let y=180-(d.weight-min)*scale
ctx.lineTo(x,y)
})

ctx.strokeStyle="#00ff99"
ctx.lineWidth=2
ctx.stroke()
}
