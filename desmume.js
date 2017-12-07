function reroll(){
  var s = "desmume";
  var sn;
  do {
    sn="";
    for (var i=0; i<s.length; i++){
      sn = sn + (Math.random()<0.5 ? s.charAt(i).toUpperCase() : s.charAt(i).toLowerCase());
    }
  } while (sn=="DeSmuME" || sn=="desmume" || sn=="DESMUME");
  document.getElementById("wrong").innerHTML = "not "+sn;
}
reroll();
setInterval(reroll,100)