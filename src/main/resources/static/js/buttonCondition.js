function isEmpty(obj, msg) {
    if (typeof obj == "string") {
        obj = document.querySelector("#" + obj);
    }
    if (obj.value == "" || obj.value == "선택") {
        alert(msg);
        obj.focus();
        return true;
    }
    return false;
}

function doAction1() {
    var ks = document.keywordSearch;

    if (isEmpty(ks.keyword, "검색어 입력")) return false;

    ks.submit();
}

function doAction2() {
    var ds = document.detailSearch;

    if (isEmpty(ds.categoryB, "카테고리 입력")) return false;
    if (isEmpty(ds.date, "날짜 입력")) return false;
    if (isEmpty(ds.price, "가격 입력")) return false;

    ds.submit();
}