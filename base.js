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
    var res = bigInt(strnum,strbase1,stralph).toString(strbase2,stralph);
    if(res.length>=100000){
      document.getElementById("res").innerHTML = "Output length: "+res.length;
    }else{
      document.getElementById("res").innerHTML = bigInt(strnum,strbase1,stralph).toString(strbase2,stralph);
    }
  }catch(error){
    document.getElementById("res").innerHTML = error;
  }
}