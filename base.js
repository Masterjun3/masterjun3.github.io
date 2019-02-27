function convert(){
  var cbase = document.getElementById("cbase").checked;
  document.getElementById("base1").disabled = !cbase;
  var calph = document.getElementById("calph").checked;
  document.getElementById("alph").disabled = !calph;
  if(!cbase){
    document.getElementById("base1").value="10";
  }
  if(!calph){
    document.getElementById("alph").value="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  var strnum = document.getElementById("num").value;
  var strbase1 = document.getElementById("base1").value;
  var stralph = document.getElementById("alph").value;
  var strbase2 = document.getElementById("base2").value;
  
  try{
    var cur = bigInt(strnum,strbase1,stralph);
    if(strbase2=="1" && cur.compare(1000)==1){ throw "Base 1 is a bad idea for big numbers"; }
    document.getElementById("res").innerHTML = cur.toString(strbase2,stralph);
  }catch(error){
    document.getElementById("res").innerHTML = error;
  }
}