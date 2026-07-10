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
  var pq = getPQ(contFrac);
  addLine(pq[0],pq[1],pq[0]/pq[1]);
}
function getPQ(contFrac){
  var p = "0";
  var q = "1";
  for(var i=contFrac.length-1; i>=0; i--){
    var cur = contFrac[i];
    cur = mulStrInt(cur,q);
    cur = addStrInt(cur,p);
    p = q;
    q = cur;
  }
  return [q,p];
}
function isBetter(p1,q1,p2,q2,a,b){
  var aq1 = mulStrInt(a,q1);
  var bp1 = mulStrInt(b,p1);
  var d1 = lessThan(aq1,bp1) ? subStrInt(bp1,aq1) : subStrInt(aq1,bp1);
  var aq2 = mulStrInt(a,q2);
  var bp2 = mulStrInt(b,p2);
  var d2 = lessThan(aq2,bp2) ? subStrInt(bp2,aq2) : subStrInt(aq2,bp2);
  return lessThan(mulStrInt(d1,q2), mulStrInt(d2,q1));
}

function addContLine(contFrac){
  document.getElementById("cont").innerHTML = contFrac;
}

function approxFrac(){
  document.getElementById("frac").innerHTML = "";
  var strnum = document.getElementById("num").value;
  
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
  
  
  var origA = a;
  var origB = b;
  var contFrac = [];
  var fract;
  var step = 0;
  do{
    fract = divStrInt(a,b);
    var cur = fract[0];
    if(step == 0){
      contFrac.push(cur);
      addFracLine(contFrac);
    }else{
      var start = divStrInt(addStrInt(cur,"1"),"2")[0];
      for(var k=start; lessThan(k,cur) || k==cur; k=addStrInt(k,"1")){
        if(k==start && divStrInt(cur,"2")[1]=="0"){
          var pq1 = getPQ(contFrac.concat([k]));
          var pq2 = getPQ(contFrac);
          if(!isBetter(pq1[0],pq1[1],pq2[0],pq2[1],origA,origB)){ continue; }
        }
        addFracLine(contFrac.concat([k]));
      }
      contFrac.push(cur);
    }
    a=b;
    b=fract[1];
    step++;
  }while(fract[1]!="0");
  
  addContLine("["+contFrac.toString().replace(",",";")+"]",1,0);
}