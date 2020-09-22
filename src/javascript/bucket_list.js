let activityType = { 
    social: "fa-users", 
    charity:"fa-hand-holding-heart", 
    busywork:"fa-briefcase", 
    recreational:"fa-laugh-beam", 
    education:"fa-book-open",
    relaxation:"fa-peace",
    music:"fa-music", 
    diy: "fa-hammer", 
    cooking:"fa-cookie-bite"
}


let fetchBucketList = async () => {   

document.getElementById("list").innerHTML = "" 

console.log(document.getElementById("social_distance").checked)

let activities = [] 
    for(let i=0; i < 10; i++){ 
    
    await fetch("https://www.boredapi.com/api/activity/") 
    .then(response => response.json())  
    .then(data => { 
    if (document.getElementById("social_distance").checked) {
      data.type != "social" ? activities.push(data) : i--
    } else { 
       activities.push(data) 
    }

   }) 
}
   
document.getElementById("list").innerHTML = ""

   activities.forEach((v) => {  

    let li = document.createElement("LI")  

    let liText = document.createTextNode(v.activity) 

    let i = document.createElement("I")  

    i.classList.add("fas")   

    i.classList.add(`${activityType[v.type]}`)  

    li.appendChild(i)
    
    li.appendChild(liText)

    document.getElementById("list").appendChild(li)  

   })
}   

let generate = document.getElementById("generate");

generate.addEventListener("click", fetchBucketList)