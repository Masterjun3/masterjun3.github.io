oldlog = console.log
console.log = function(s){
  document.getElementById("out").innerHTML += s+"<br>";
}

function run(){  
  document.getElementById("code").style.height = "auto";
  document.getElementById("code").style.height = (25+document.getElementById("code").scrollHeight)+"px";
  
  document.getElementById("out").innerHTML = "";
  try{
    fengari.load(document.getElementById("code").value)();
  }catch(error){
    document.getElementById("out").innerHTML = error;
  }
}