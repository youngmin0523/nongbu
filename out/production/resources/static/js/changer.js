function categoryAChange(e) {
    var fruit = ["선택", "사과", "복숭아", "배", "포도"];
    var vegetable = ["선택", "배추", "상추", "고추", "오이"];
    var crop = ["선택", "쌀", "콩", "팥", "녹두"];
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
function categoryBChange(e) {
    var apple = ["선택", "홍로", "쓰가루", "후지"];
    var peach = ["선택", "백도", "유명"];
    var pear = ["선택", "신고", "원황"];
    var grape = ["선택", "캠벨얼리", "거봉", "샤인머스켓"];
    var cabbage = ["선택", "봄", "고랭지", "가을", "월동"];
    var lettuce = ["선택", "적", "청"];
    var chili = ["선택", "풋고추", "꽈리고추", "청양고추", "오이고추"];
    var cucumber = ["선택", "가시", "다다기", "취청"];
    var rice = ["선택", "일반", "햇일반"];
    var bean = ["선택", "국산", "수입"];
    var redbean = ["선택", "국산", "수입"];
    var mungbean = ["선택", "국산", "수입"];

    var target = document.getElementById("categoryC");

    if(e.value == "사과") var d = apple;
    else if(e.value == "복숭아") var d = peach;
    else if(e.value == "배") var d = pear;
    else if(e.value == "포도") var d = grape;
    else if(e.value == "배추") var d = cabbage;
    else if(e.value == "상추") var d = lettuce;
    else if(e.value == "고추") var d = chili;
    else if(e.value == "오이") var d = cucumber;
    else if(e.value == "쌀") var d = rice;
    else if(e.value == "콩") var d = bean;
    else if(e.value == "팥") var d = redbean;
    else if(e.value == "녹두") var d = mungbean;

    target.options.length = 0;

    for(x in d) {
        var opt = document.createElement("option");
        opt.value = d[x];
        opt.innerHTML = d[x];
        target.appendChild(opt);
    }
}



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



function priceChange(z) {
    var a = ["선택", 5000, 10000, 15000, 20000, 25000, 30000];
    var b = ["선택", 10000, 15000, 20000, 25000, 30000];
    var c = ["선택", 15000, 20000, 25000, 30000];
    var d = ["선택", 20000, 25000, 30000];
    var e = ["선택", 25000, 30000];
    var f = ["선택", 30000];

    var target = document.getElementById("priceB");

    if(z.value == "0") var y = a;
    else if(z.value == "5000") var y = b;
    else if(z.value == "10000") var y = c;
    else if(z.value == "15000") var y = d;
    else if(z.value == "20000") var y = e;
    else if(z.value == "25000") var y = f;

    target.options.length = 0;

    for(x in y) {
        var opt = document.createElement("option");
        opt.value = y[x];
        opt.innerHTML = y[x];
        target.appendChild(opt);
    }
}