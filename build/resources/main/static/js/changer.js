function categoryChange(e) {
    var fruit = ["선택", "사과", "포도", "딸기", "참외", "수박"];
    var vegetable = ["선택", "배추", "무", "마늘", "고추", "양파"];
    var crop = ["선택", "쌀", "감자", "고구마"];
    var target = document.getElementById("categoryB");

    if(e.value == "과일") var d = fruit;
    else if(e.value == "채소") var d = vegetable;
    else if(e.value == "작물") var d = crop;

    target.options.length = 0;

    for(x in d) {
        var opt = document.createElement("option");
        opt.value = d[x];
        opt.innerHTML = d[x];
        target.appendChild(opt);
    }
}

/*
function regionChange(e) {
    var gyengnam = ["선택", "김해", "밀양", "창원", "진주"];
    var gyengbuk = ["선택", "경산", "포항", "경주", "김천"];
    var gangwon = ["선택", "원주", "평창", "강릉", "태백"];
    var target = document.getElementById("regionB");

    if(e.value == "경상남도") var d = gyengnam;
    else if(e.value == "경상북도") var d = gyengbuk;
    else if(e.value == "강원도") var d = gangwon;

    target.options.length = 0;

    for(x in d) {
        var opt = document.createElement("option");
        opt.value = d[x];
        opt.innerHTML = d[x];
        target.appendChild(opt);
    }
}
*/

