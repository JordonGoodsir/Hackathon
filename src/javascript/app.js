function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

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

    setTimeout(function(){
        document.getElementById("insultDiv").innerHTML = "";
   },5000);
})

.catch(() => console.log("Can’t access " + url + " response. Blocked by browser?")) 



}  



document.getElementById("insult").addEventListener("click",insult) 

