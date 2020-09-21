


let fetchBucketList = async () => {   

document.getElementById("list").innerHTML = ""

let activities = [] 
    for(let i=0; i < 10; i++){ 
    
    await fetch("https://www.boredapi.com/api/activity/") 
    .then(response => response.json())  
    .then(data => activities.push(data))
   } 
   
document.getElementById("list").innerHTML = ""

  
   activities.forEach((v) => {  

    let li = document.createElement("LI")  

    let liText = document.createTextNode(v.activity) 
    
    li.appendChild(liText)

    document.getElementById("list").appendChild(li)
 
   })


   
    // const response = await fetch("https://www.boredapi.com/api/activity/")
    // const list = await response.json() 

    
    // // look into promise
    
    // for(i = 0; i == 10; i++) { 
    // await list  
    // console.log(list)
    // }
}   

let generate = document.getElementById("generate");

generate.addEventListener("click", fetchBucketList)