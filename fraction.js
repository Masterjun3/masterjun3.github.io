function remLeadZero(a){
  while(a.substr(0,1)=="0"){ a=a.substr(1); }
  if(a=="" || a.substr(0,1)=="."){ a="0"+a; }
  return a;
}
function addStrInt(a,b){
  do{ a="0"+a; } while(a.length<b.length+1);
  do{ b="0"+b; } while(b.length<a.length);
  var c = 0
  var ret = ""
  for(var i=a.length-1;i>=0;i--){
    var cur = a.substr(i,1)- -b.substr(i,1) + c; // beautiful adding
    c = cur>=10 ? 1 : 0;
    ret = cur%10 + ret;
  }
  return remLeadZero(ret);
}
function subStrInt(a,b){
  while(b.length<a.length){ b="0"+b; }
  var c = 0;
  var ret = "";
  for(var i=a.length-1;i>=0;i--){
    var cur = a.substr(i,1) - b.substr(i,1) - c;
    c = cur<0 ? 1 : 0;
    ret = (cur+10)%10 + ret;
  }
  return remLeadZero(ret);
}
function mulStrInt(a,b){
  if(a.length>b.length){ var tmp=a,a=b,b=tmp; }
  var ret = "0";
  for(var i=1; i<=a.length; i++){
    for(var j=0; j<a.substr(-i,1); j++){
      ret = addStrInt(ret,b);
    }
    b=b+"0";
  }
  return ret;
}
function lessThan(a,b){
  a=remLeadZero(a);
  b=remLeadZero(b);
  if(a.length<b.length){ return true; }
  if(a.length>b.length){ return false; }
  while(a!=""){
    if(a.substr(0,1)<b.substr(0,1)){ return true; }
    if(a.substr(0,1)>b.substr(0,1)){ return false; }
    a=a.substr(1);
    b=b.substr(1);
  }
  return false;
}
function divStrInt(a,b){
  if(lessThan(a,b)){ return ["0",a]; }
  if(!lessThan(b,a)){ return ["1","0"]; }
  var ret = "";
  for(var len=1; len<=a.length; len++){
    var add = "0";
    while(!lessThan(a.substr(0,len),b)){
      add=addStrInt(add,"1");
      var sub = subStrInt(a.substr(0,len),b);
      while(sub.length<len){ sub="0"+sub; }
      a=sub+a.substr(len);
    }
    ret+=add;
  }
  return [remLeadZero(ret),remLeadZero(a)];
}

function addLine(p,q,pdq){
  document.getElementById("frac").innerHTML +=
    "<b>"+p+"</b>"+
    "/<b>"+q+"</b>"+
    " &#8773; "+pdq+"<br>";
}
function addFracLine(contFrac){
  var p = "0";
  var q = "1";
  for(var i=contFrac.length-1; i>=0; i--){
    var cur = contFrac[i];
    cur = mulStrInt(cur,q);
    cur = addStrInt(cur,p);
    p = q;
    q = cur;
  }
  addLine(q,p,q/p);
}

function addContLine(contFrac){
  document.getElementById("cont").innerHTML = contFrac;
}

function approxFrac(){
  document.getElementById("frac").innerHTML = "";
  var strnum = document.getElementById("num").value
  
  if(!strnum.match(/^\d+(\.(\d+|\d*\(\d+\)))?$/)){
    addLine(0,1,0);
    addContLine("[0]");
    return;
  }
  strnum=remLeadZero(strnum);
  var lb = strnum.indexOf("(");
  var rep = "0";
  var den9 = "";
  if(lb!=-1){
    rep = strnum.substr(lb+1,strnum.length-lb-2);
    for(var i=0; i<rep.length; i++){ den9+="9"; }    
    strnum = strnum.substr(0,lb);
  }
  var dot = strnum.indexOf(".");
  var pow = strnum.length-dot;
  if(dot==-1){ pow=1; }
  else{ strnum = remLeadZero(strnum.substr(0,dot)+strnum.substr(dot+1)); }
  var pow10 = "1";
  for(var i=1;i<pow;i++){ pow10+="0"; den9+="0"; }
  var a=strnum;
  var b=pow10;
  if(lb!=-1){
    a = addStrInt(mulStrInt(a,den9),mulStrInt(rep,b));
    b = mulStrInt(b,den9);
  }
  
  
  var contFrac = [];
  var fract;
  do{
    fract = divStrInt(a,b);
    contFrac.push(fract[0]);
    addFracLine(contFrac);
    a=b;
    b=fract[1];
  }while(fract[1]!="0");
  
  addContLine("["+contFrac.toString().replace(",",";")+"]",1,0);
}