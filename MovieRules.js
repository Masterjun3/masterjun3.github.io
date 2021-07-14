function ansclick(id, idans, green) {
    var size = green ? "0.0em" : "1.5em"
    document.getElementsByClassName("explanation")[id].style["font-size"] = size;
    var color = green ? "#80FF80" : "#FF8080";
    document.getElementsByClassName("container")[id].style["background"] = color;
    var allans = document.getElementsByClassName("options")[id].getElementsByClassName("answer")
    for (var i = 0; i < allans.length; i++) {
        if (i == idans) {
            allans[i].classList.add("clicked");
        } else {
            allans[i].classList.remove("clicked");
        }
    };
}