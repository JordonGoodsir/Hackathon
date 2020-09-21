function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }  


  let audio = new Audio("resources/ohh.mp4") 
  audio.volume = 0.02 


insult = async () => {    

document.getElementById("insultDiv").innerHTML = "" 


const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = "https://evilinsult.com/generate_insult.php?lang=en&type=json";
fetch(proxyurl + url)
.then(response => response.json())
.then(contents => { 
    h5 = document.createElement("H5");
    pText = document.createTextNode(decodeHtml(contents.insult))  
    h5.appendChild(pText)  

    h5.style.padding = "1.2rem"

    document.getElementById("insultDiv").appendChild(h5)   
    
    audio.play() 

    setTimeout(function(){
        document.getElementById("insultDiv").innerHTML = "";
   },5000); 


})

.catch(() => { 
    h5 = document.createElement("H5");
    pText = document.createTextNode("You've been insulted enough")  
    h5.appendChild(pText)  

    h5.style.padding = "1.2rem"

    document.getElementById("insultDiv").appendChild(h5)  
    
    audio.play() 

    setTimeout(function(){
        document.getElementById("insultDiv").innerHTML = "";
   },5000); 
}) 



}  



document.getElementById("insult").addEventListener("click",insult) 

