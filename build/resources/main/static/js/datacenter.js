//전역변수 설정
let itemList = new Array();
$.ajax({  // itemList 초기화
        url: "getItems.do",
        async:false,
        type: "POST",
        success : function(data) {
            for(let i=0; i<data.length; i++){
                itemList[i] = data[i].item_name
            }
        },
        error : function() {
            alert("ajax error")
        }
});

let listIndex = 0
var rankInfo = new Array()

let resentPrice = 0
let resentQuantity = 0

let selectedItemOnMapChart =""
/////////////////////////////////////////////////////////////////
//초기 화면 세팅
//requestItemList()
for(let i=1, j=listIndex; i<7; i++, j++){
    requestAvgData(i, j, 'state')
}
SetMapChart()
setDetailChart()

// 아이템 받아오는 함수
function requestItemList(){

}

/////////////////////////////////////////////////////////////////
// 그래프 화면 구성
function requestAvgData(graph_index, item_index, option){
    $.ajax({
        url: "getItemList.do",
        data: "itemName=" + itemList[item_index],
        type: "POST",
        success : function(data) { // controller에서 list를 return 받았음
            if(option == 'state'){
                SetGraph(graph_index, item_index, data)
                DrawStateGraph(graph_index, data)
            }
            else if(option == 'mapchart'){
                resentPrice = data[0].price
                resentQuantity = data[0].quantity
                    $("#mapData").empty();  // 태그 요소 초기화

                    let insert=""
                    if(resentPrice >= 1000){
                        var a = String(resentPrice)
                        var b = ","
                        resentPrice = a.slice(0,-3)+ b + a.slice(-3, a.length)
                    }
                    if(resentQuantity >=1000){
                        var a = String(resentQuantity)
                        var b = ","
                        resentQuantity = a.slice(0,-3)+ b + a.slice(-3, a.length)
                    }
                    insert += "<b style=\"color: blue; font-weight: 900;\">"+ itemList[item_index] +"</b> 전국도매시장 거래정보 : 평균<b style=\"color: red;\">"+ resentPrice +"원</b>/kg, 물량<b style=\"color: rgb(109, 109, 218); \">"+ resentQuantity +"</b>톤"

                    $("#mapData").append(insert);
            }
            //alert('success')
        },
        error : function() {
            alert("ajax error")
        }
      });
}


function SetGraph(graph_index, item_index, list){
	let priceChangeRate = ((list[0].price - list[1].price) / list[1].price) * 100  // 가격 변화율 계산
    priceChangeRate = priceChangeRate.toFixed(1)  // 소수점 1자리만 표현
	$("#stateGraphItem"+graph_index).empty();  // 태그 요소 초기화
	let insert=""
	insert += "<h6 class=\"item-header\"><b style=\"color:blue; font-size: 25px;\">"+ itemList[item_index] +" </b>"
	if(list[0].price < 1000){  // 1000원 이하일때
	    insert += "<b style=\"color:black; font-size: 25px;\">"+ list[0].price +"</b> 원/kg </br>"
	}
	else{   // 1000원 이상일때
        var a = String(list[0].price)
        var b = ","
        var output = a.slice(0,-3)+ b + a.slice(-3, a.length)

    	insert += "<b style=\"color:black; font-size: 25px;\">"+ output +"</b> 원/kg </br>"
	}
	if(priceChangeRate > 0){
	    insert += "<b style=\"color:red; font-size: 20px;\">▲"+ Math.abs(list[0].price - list[1].price) +"원("+priceChangeRate+"%)</b></h6>"
	}
	else if (priceChangeRate <0){
	    insert += "<b style=\"color:blue; font-size: 20px;\">▼"+ Math.abs(list[0].price - list[1].price) +"원("+priceChangeRate+"%)</b></h6>"
	}
	else{
	    insert += "<b style=\"color:black; font-size: 20px;\">"+ Math.abs(list[0].price - list[1].price) +"원("+priceChangeRate+"%)</b></h6>"
	}

	insert += "<div class=\"card-body\"><div class=\"chart-area\"><canvas id=\"bar-chart"+ graph_index +"\" width=\"255\" height=\"190\"></canvas></div></div>"
	$("#stateGraphItem"+graph_index).append(insert);   // 태그 요소 세팅
}

function DrawStateGraph(i, list){
	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 10일치 별 가격, 거래량 차
			const config = {
			  type: 'line',
			  data: {
				labels: [list[9].date.substr(5,10), list[8].date.substr(5,10), list[7].date.substr(5,10), list[6].date.substr(5,10), list[5].date.substr(5,10), list[4].date.substr(5,10), list[3].date.substr(5,10), list[2].date.substr(5,10), list[1].date.substr(5,10), list[0].date.substr(5,10)],
				datasets: [{
				  label: '가격 : ',
				  data: [list[9].price, list[8].price, list[7].price, list[6].price, list[5].price, list[4].price, list[3].price, list[2].price, list[1].price, list[0].price],
				  borderColor: "#fe195b",   // 선 색깔
				  borderWidth: 3,
				  tension: 0.4,
				  yAxisID: 'priceY'
				},
				{
				  label: '거래량 : ',
				  type: 'bar',
				  data: [list[9].quantity, list[8].quantity, list[7].quantity, list[6].quantity, list[5].quantity, list[4].quantity, list[3].quantity, list[2].quantity, list[1].quantity, list[0].quantity],
				  backgroundColor: ["#c2b5ea", "#c2b5ea", "#c2b5ea", "#c2b5ea", "#c2b5ea", "#c2b5ea", "#c2b5ea", "#c2b5ea", "#c2b5ea", "#c2b5ea"],
				  borderWidth: 1,
				  yAxisID: 'volumeY'
				}]
			  },
			  options: {
				responsive: false,  // 그래프 크기 조정가능
                interaction: {
                    mode: 'index'   // 다중 차트에서 마우스 호버시 같은 x좌표에있으면 같이 보임
                },
				plugins: {   // 라벨 지우기
				  legend: {
					display: false
				  }
				},
				scales: {
				  priceY: {
					ticks: {
					  maxTicksLimit: 4,  // y축 최소눈금 설정
					  beginAtZero: true,  // y축에 0 표시
					  fontSize: 13,  // 눈금 글자 크기
					},
					beginAtZero: true,
					position: 'left',
					grid: {
					  display: false
					},
				  },
				  volumeY: {
					ticks: {
					  maxTicksLimit: 4,  // y축 최소눈금 설정
					  beginAtZero: true,  // y축에 0 표시
					  fontSize: 13,  // 눈금 글자 크기
					},
					beginAtZero: true,
					position: 'right',
					grid: {
					  display: false
					}
				  },
				  x: {
					grid: {
					  display: false
					}
				  },
				}
			  }
			};
			// render init block
			new Chart(document.getElementById('bar-chart'+i), config);
}

//이전 버튼 클릭시
$(".btnPrev").click(function() {
	listIndex -=6
	if(listIndex <= 0){
		listIndex = 0
	}
    for(let i=1, j=listIndex; i<7; i++, j++){
        requestAvgData(i, j, 'state')
    }
});

//다음 버튼 클릭시
$(".btnNext").click(function() {
	let j =0
	listIndex += 6
	if(listIndex >= itemList.length){
		listIndex = itemList.length-1
	}
    for(let i=1, j=listIndex; i<7; i++, j++){
        if(j >= itemList.length){
        	$("#stateGraphItem"+i).empty();  // 태그 요소 초기화
        }
        else{ requestAvgData(i, j, 'state') }
    }
});
/////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////
// 랭킹 화면 구성
function requestAllAvgData(item_index){
    $.ajax({
        url: "getItemList.do",
        data: "itemName=" + itemList[item_index],
        type: "POST",
        success : function(data) {
            let priceChangeRate = ((data[0].price - data[1].price) / data[1].price) * 100  // 가격 변화율 계산
            priceChangeRate = priceChangeRate.toFixed(1)  // 소수점 1자리만 표현

            rankInfo[item_index] = { name : itemList[item_index], totalAmt : data[0].total_quantity, rate : priceChangeRate}

            // 데이터를 다 받으면 랭킹화면을 구성한다.
            if(item_index >= itemList.length-1){
                for(let i=0; i<rankInfo.length; i++){   // null 값만 들어와서 itemRank에서 에러남
                    if(rankInfo[i] ==null){  // 하나라도 null 값이면
                        for(let i=0; i<itemList.length; i++){  // 하나라도 null 값이면 값이 들어올때까지 반복
                            requestAllAvgData(i)
                        }
                        return
                    }

                }
                itemRank()
            }
        },
        error : function() {
            alert("ajax error")
        }
    });
}

for(let i=0; i<itemList.length; i++){
    requestAllAvgData(i)
}

function itemRank(){
    // 주간 인기상품 랭킹 ////////////////////////////////////////////////////////////////////////////////////////////////////
    // 총 거래액순으로 정렬
    rankInfo.sort(function(a, b) {
        return b.totalAmt - a.totalAmt;
    });

	$(".rankByVolumeTable").empty();  // 태그 요소 초기화
	let insert=""
	insert += "<table class=\"table\"><tbody>"
	insert += "<tr><td>1</td><td class=\"td-name\">"+ rankInfo[0].name +"</td><td style=\"text-align: right\">"+ (rankInfo[0].totalAmt/1000).toFixed(0) +'억원</td></tr>'
	insert += "<tr><td>2</td><td class=\"td-name\">"+ rankInfo[1].name +"</td><td style=\"text-align: right\">"+ (rankInfo[1].totalAmt/1000).toFixed(0) +'억원</td></tr>'
	insert += "<tr><td>3</td><td class=\"td-name\">"+ rankInfo[2].name +"</td><td style=\"text-align: right\">"+ (rankInfo[2].totalAmt/1000).toFixed(0) +'억원</td></tr>'
	insert += "<tr><td>4</td><td class=\"td-name\">"+ rankInfo[3].name +"</td><td style=\"text-align: right\">"+ (rankInfo[3].totalAmt/1000).toFixed(0) +'억원</td></tr>'
	insert += "<tr><td>5</td><td class=\"td-name\">"+ rankInfo[4].name +"</td><td style=\"text-align: right\">"+ (rankInfo[4].totalAmt/1000).toFixed(0) +'억원</td></tr>'
	insert += "<tr><td>6</td><td class=\"td-name\">"+ rankInfo[5].name +"</td><td style=\"text-align: right\">"+ (rankInfo[5].totalAmt/1000).toFixed(0) +'억원</td></tr>'
	insert += "<tr><td>7</td><td class=\"td-name\">"+ rankInfo[6].name +"</td><td style=\"text-align: right\">"+ (rankInfo[6].totalAmt/1000).toFixed(0) +'억원</td></tr>'
	insert += "<tr><td>8</td><td class=\"td-name\">"+ rankInfo[7].name +"</td><td style=\"text-align: right\">"+ (rankInfo[7].totalAmt/1000).toFixed(0) +'억원</td></tr>'
	insert += "<tr><td>9</td><td class=\"td-name\">"+ rankInfo[8].name +"</td><td style=\"text-align: right\">"+ (rankInfo[8].totalAmt/1000).toFixed(0) +'억원</td></tr>'
	insert += "<tr><td>10</td><td class=\"td-name\">"+ rankInfo[9].name +"</td><td style=\"text-align: right\">"+ (rankInfo[9].totalAmt/1000).toFixed(0) +'억원</td></tr>'
    insert += "</tbody></table>"
    $(".rankByVolumeTable").append(insert);

    // 주간 가격상승, 가격하락 랭킹 ////////////////////////////////////////////////////////////////////////////////////////////////////
    //가격 변화율순으로  정렬
    rankInfo.sort(function(a, b) {
        return b.rate - a.rate;
    });

    $(".rankByPriceDownTable").empty();  // 태그 요소 초기화
    $(".rankByPriceUpTable").empty();  // 태그 요소 초기화

    let insert1=""
    let insert2=""
    insert1 += "<table class=\"table\"><tbody>"
    insert2 += "<table class=\"table\"><tbody>"

    // 상승 품목 10개
    let i
    let upCount = 1;
    let downCount =1;
    for(i=0; i<10; i++){
        if(rankInfo[i].rate <=0 || rankInfo[i].rate == null) {break}
        insert1 += "<tr><td>"+ upCount +"</td><td class=\"td-name\">"+ rankInfo[i].name +"</td><td style=\"text-align: right\">"+ rankInfo[i].rate +'</td><td ><img src=\"/img/rank-up.png\"></td></tr>'
        upCount +=1
    }
    for(i= rankInfo.length-1; i > rankInfo.length-10; i--){
        if(rankInfo[i].rate >=0 || rankInfo[i].rate == null) {break}
        insert2 += "<tr><td>"+ downCount +"</td><td class=\"td-name\">"+ rankInfo[i].name +"</td><td style=\"text-align: right\">"+ rankInfo[i].rate +'</td><td ><img src=\"/img/rank-down.png\"></td></tr>'
        downCount +=1
    }
      insert1 += "</tbody></table>"
      insert2 += "</tbody></table>"

      $(".rankByPriceUpTable").append(insert1);   // 태그 요소 세팅
      $(".rankByPriceDownTable").append(insert2);   // 태그 요소 세팅
}
/////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////
// 지역별 도매시장 정보
let marketData = [
    {location : '서울', market : '서울가락도매'},
    {location : '서울', market : '서울강서도매'},
    {location : '경기도', market : '수원도매시장'},
    {location : '경기도', market : '수원도매'},
    {location : '경기도', market : '구리도매시장'},
    {location : '경기도', market : '구리도매'},
    {location : '경기도', market : '안산도매시장'},
    {location : '경기도', market : '안산도매'},
    {location : '경기도', market : '안양도매시장'},
    {location : '경기도', market : '안양도매'},
    {location : '인천', market : '인천구월도매'},
    {location : '인천', market : '인천삼산도매'},
    {location : '인천', market : '인천남촌도매'},

    {location : '강원도', market : '강릉도매시장'},
    {location : '강원도', market : '강릉도매'},
    {location : '강원도', market : '원주도매시장'},
    {location : '강원도', market : '원주도매'},
    {location : '강원도', market : '춘천도매시장'},
    {location : '강원도', market : '춘천도매'},

    {location : '충청남도', market : '천안도매시장'},
    {location : '충청남도', market : '천안시장'},
    {location : '대전', market : '대전노은도매'},
    {location : '대전', market : '대전오정도매'},
    {location : '충청북도', market : '청주도매시장'},
    {location : '충청북도', market : '청주도매'},
    {location : '충청북도', market : '충주도매시장'},
    {location : '충청북도', market : '충주도매'},

    {location : '전라북도', market : '익산도매시장'},
    {location : '전라북도', market : '익산도매'},
    {location : '전라북도', market : '정읍도매시장'},
    {location : '전라북도', market : '정읍도매'},
    {location : '전라남도', market : '순천도매시장'},
    {location : '전라남도', market : '순천도매'},
    {location : '전라남도', market : '전주도매시장'},
    {location : '전라남도', market : '전주도매'},

    {location : '광주', market : '광주각화도매'},
    {location : '광주', market : '광주서부도매'},
    {location : '경상북도', market : '구미도매시장'},
    {location : '경상북도', market : '구미도매'},
    {location : '경상북도', market : '안동도매시장'},
    {location : '경상북도', market : '안동도매'},
    {location : '경상북도', market : '포항도매시장'},
    {location : '경상북도', market : '포항도매'},
    {location : '대구', market : '대구북부도매'},
    {location : '경상남도', market : '진주도매시장'},
    {location : '경상남도', market : '진주도매'},
    {location : '경상남도', market : '창원내서도매시장'},
    {location : '경상남도', market : '창원팔용도매시장'},
    {location : '울산', market : '울산도매시장'},
    {location : '울산', market : '울산도매'},
    {location : '부산', market : '부산반여도매'},
    {location : '부산', market : '부산엄궁도매'},

    {location : '제주도', market : ''},
    ]

function SetMapChart(){
    let insert =""
    insert +="<option value=\"품목\">품목</option>"
    for(let i=0; i<itemList.length; i++){
        insert += "<option value=\""+ itemList[i] + "\">"+ itemList[i] +"</option>"
    }
	$("#itemSelect").append(insert);   // 태그 요소 세팅
}

$(document).ready(function() {
    $('#itemSelect').change(function() {
    selectedItemOnMapChart = $('#itemSelect option:selected').val();
    if( selectedItemOnMapChart != "품목")
    {
        requestMarketData(selectedItemOnMapChart)  // 선택한 품목에 대한 도매시장 정보를 요청
    }
    });
});

function requestMarketData(itemName){
    $.ajax({
        url: "getMarketData.do",
        data: { itemName: itemName, date: "2022-05-18"},
        type: "POST",
        success : function(data) { // controller에서 list를 return 받았음
            // 맵차트에 적용될 데이터
            let locationData = [    {location : '서울', price : 0, quantity:0, count:0},
                                    {location : '경기도', price : 0, quantity:0, count:0},
                                    {location : '인천', price : 0, quantity:0, count:0},
                                    {location : '강원도', price : 0, quantity:0, count:0},
                                    {location : '충청남도', price : 0, quantity:0, count:0},
                                    {location : '세종', price : 0, quantity:0, count:0},
                                    {location : '대전', price : 0, quantity:0, count:0},
                                    {location : '충청북도', price : 0, quantity:0, count:0},
                                    {location : '전라북도', price : 0, quantity:0, count:0},
                                    {location : '전라남도', price : 0, quantity:0, count:0},
                                    {location : '광주', price : 0, quantity:0, count:0},
                                    {location : '경상북도', price : 0, quantity:0, count:0},
                                    {location : '대구', price : 0, quantity:0, count:0},
                                    {location : '경상남도', price : 0, quantity:0, count:0},
                                    {location : '울산', price : 0, quantity:0, count:0},
                                    {location : '부산', price : 0, quantity:0, count:0},
                                    {location : '제주도', price : 0, quantity:0, count:0},
                               ]
            if(data.length == 0){
                    $("#mapData").empty();  // 태그 요소 초기화
                    let insert=""
                    insert += "<b style=\"color: blue; font-weight: 900;\">"+ itemName +"</b> 전국 도매시장 거래정보 : 평균 <b style=\"color: red;\">-원</b>/kg, 물량 <b style=\"color: rgb(109, 109, 218); \">-</b>톤"
                    $("#mapData").append(insert);
            }
            else{
                for(let i =0; i <data.length; i++){
                    //console.log(itemName+", "+data[i].date+", "+data[i].market+", "+data[i].price+", "+data[i].quantity)

                    // 선택한 품목의 가장 최근 가격, 거래량을 입력한다.
                    let j;
                    for(j=0; j<itemList.length; j++){
                        if(itemList[j] == itemName){
                            break;
                        }
                    }
                    requestAvgData(0, j, 'mapchart')


                    // 도매시장이 어느 지역에 속해있는지를 구분함
                    for(let j =0; j<marketData.length; j++){
                        if(data[i].market == marketData[j].market){
                            locationData[locationData.findIndex(i=>i.location==marketData[j].location)].price += data[i].price
                            locationData[locationData.findIndex(i=>i.location==marketData[j].location)].quantity += data[i].quantity
                            locationData[locationData.findIndex(i=>i.location==marketData[j].location)].count += 1
                        }
                    }
                }
            }
            let insert =""
            $("#content5").empty();   // 태그 요소 세팅
            insert +="<canvas id=\"bar-chart-horizontal1\"  width=\"380\" height=\"320\"></canvas><div id=\"rankArea1\"> 지역별 가격 순위</div>"
            insert +="<canvas id=\"bar-chart-horizontal2\"  width=\"380\" height=\"320\"></canvas><div id=\"rankArea2\"> 지역별 거래량 순위</div>"
            $("#content5").append(insert);   // 태그 요소 세팅

            // 지역별 가격의 평균을 구함
            for(let j =0; j<locationData.length; j++){
                if(locationData[j].count !=0){
                    locationData[j].price = (locationData[j].price / locationData[j].count).toFixed(0)
                }
            }

            // 지역 데이터를 가격순으로 정렬한다.
            locationData.sort(function(a, b) {
                return b.price - a.price;
            });
            DrawLocationGraphOrderByPrice(locationData)

            // 지역 데이터를 총물량 순으로 정렬한다.
            locationData.sort(function(a, b) {
                return b.quantity - a.quantity;
            });
            DrawLocationGraphOrderByTotalQuantity(locationData)

            // 맵차트에 라벨 표시
            mapData = [
                {"level1":900,"branchName":"서울","v":0,"h":0,"price":locationData[locationData.findIndex(i=>i.location=="서울")].price, "quantity":locationData[locationData.findIndex(i=>i.location=="서울")].quantity},
                {"level1":200,"branchName":"경기도","v":0,"h": 10,"price":locationData[locationData.findIndex(i=>i.location=="경기도")].price, "quantity":locationData[locationData.findIndex(i=>i.location=="경기도")].quantity},
                {"level1":1100,"branchName":"인천","v":0,"h":0,"price":locationData[locationData.findIndex(i=>i.location=="인천")].price, "quantity":locationData[locationData.findIndex(i=>i.location=="인천")].quantity},
                {"level1":100,"branchName":"강원도","v":0,"h":0,"price":locationData[locationData.findIndex(i=>i.location=="강원도")].price, "quantity":locationData[locationData.findIndex(i=>i.location=="강원도")].quantity},
                {"level1":1500,"branchName":"충청남도","v":0,"h":0,"price":locationData[locationData.findIndex(i=>i.location=="충청남도")].price, "quantity":locationData[locationData.findIndex(i=>i.location=="충청남도")].quantity},
                {"level1":1700,"branchName":"세종","v":-10,"h":0,"price":locationData[locationData.findIndex(i=>i.location=="세종")].price, "quantity":locationData[locationData.findIndex(i=>i.location=="세종")].quantity},
                {"level1":700,"branchName":"대전","v":0,"h":0,"price":locationData[locationData.findIndex(i=>i.location=="대전")].price, "quantity":locationData[locationData.findIndex(i=>i.location=="대전")].quantity},
                {"level1":1600,"branchName":"충청북도","v":0,"h":0,"price":locationData[locationData.findIndex(i=>i.location=="충청북도")].price, "quantity":locationData[locationData.findIndex(i=>i.location=="충청북도")].quantity},
                {"level1":1300,"branchName":"전라북도","v":0,"h":0,"price":locationData[locationData.findIndex(i=>i.location=="전라북도")].price, "quantity":locationData[locationData.findIndex(i=>i.location=="전라북도")].quantity},
                {"level1":1200,"branchName":"전라남도","v":0,"h":0,"price":locationData[locationData.findIndex(i=>i.location=="전라남도")].price, "quantity":locationData[locationData.findIndex(i=>i.location=="전라남도")].quantity},
                {"level1":500,"branchName":"광주","v":0,"h":0,"price":locationData[locationData.findIndex(i=>i.location=="광주")].price, "quantity":locationData[locationData.findIndex(i=>i.location=="광주")].quantity},
                {"level1":400,"branchName":"경상북도","v":0,"h":0,"price":locationData[locationData.findIndex(i=>i.location=="경상북도")].price, "quantity":locationData[locationData.findIndex(i=>i.location=="경상북도")].quantity},
                {"level1":600,"branchName":"대구","v":0,"h":0,"price":locationData[locationData.findIndex(i=>i.location=="대구")].price, "quantity":locationData[locationData.findIndex(i=>i.location=="대구")].quantity},
                {"level1":300,"branchName":"경상남도","v":0,"h":0,"price":locationData[locationData.findIndex(i=>i.location=="경상남도")].price, "quantity":locationData[locationData.findIndex(i=>i.location=="경상남도")].quantity},
                {"level1":1000,"branchName":"울산","v":0,"h":0,"price":locationData[locationData.findIndex(i=>i.location=="울산")].price, "quantity":locationData[locationData.findIndex(i=>i.location=="울산")].quantity},
                {"level1":800,"branchName":"부산","v":0,"h":0,"price":locationData[locationData.findIndex(i=>i.location=="부산")].price, "quantity":locationData[locationData.findIndex(i=>i.location=="부산")].quantity},
                {"level1":1400,"branchName":"제주도","v":0,"h":0,"price":locationData[locationData.findIndex(i=>i.location=="제주도")].price, "quantity":locationData[locationData.findIndex(i=>i.location=="제주도")].quantity},
            ];
//            // 가격이나 거래량이 없는 지역은 표시하지 않는다.
//            for(let i=0; i< mapData.length; i++){
//                if(mapData[i].price <=1 || mapData[i].quantity <=1){
//                    console.log("branchName:"+mapData[i].branchName)
//                    console.log("price:"+mapData[i].price)
//                    console.log("quantity:"+mapData[i].quantity)
//                    mapData.splice(i, 1)
//                }
//            }
            rMateMapChartH5.create("map1", "mapHolder", mapVars, "100%", "100%");
        },
        error : function() {
            alert("ajax error")
        }
      });
}

function DrawLocationGraphOrderByPrice(locationData){
    const config = {
          type: 'bar',
          data: {
            labels: [locationData[0].location, locationData[1].location, locationData[2].location, locationData[3].location, locationData[4].location, locationData[5].location, locationData[6].location, locationData[7].location, locationData[8].location, locationData[9].location],
            yAxisID: 'y',
            datasets: [
              {
                label: "가격",
                backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                data: [locationData[0].price, locationData[1].price, locationData[2].price, locationData[3].price, locationData[4].price, locationData[5].price, locationData[6].price, locationData[7].price, locationData[8].price, locationData[9].price]
              }
            ],
          },
          options: {
            responsive: false,  // 그래프 크기 조정가능
            indexAxis: 'y',  // 수평막대 그래프
            plugins: {
              legend: {
                display: false
              },
            },
            scale: {
              x: {
                ticks: {
                  maxTicksLimit: 3,  // y축 최소눈금 설정
                  beginAtZero: true,  // y축에 0 표시
                  fontSize: 13,  // 눈금 글자 크기
                },
                grid: {
                  display: false
                },
              },
            }
          }
        };

        var chart1 = new Chart(document.getElementById("bar-chart-horizontal1"), config);

}

function DrawLocationGraphOrderByTotalQuantity(locationData){
        if(document.getElementById("bar-chart-horizontal2") != null){
            document.getElementById("bar-chart-horizontal2")
        }
        const config = {
          type: 'bar',
          data: {
            labels: [locationData[0].location, locationData[1].location, locationData[2].location, locationData[3].location, locationData[4].location, locationData[5].location, locationData[6].location, locationData[7].location, locationData[8].location, locationData[9].location],
            yAxisID: 'y',
            datasets: [
              {
                label: "거래량",
                backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                data: [locationData[0].quantity, locationData[1].quantity, locationData[2].quantity, locationData[3].quantity, locationData[4].quantity, locationData[5].quantity, locationData[6].quantity, locationData[7].quantity, locationData[8].quantity, locationData[9].quantity]
              }
            ],
          },
          options: {
            responsive: false,  // 그래프 크기 조정가능
            indexAxis: 'y',  // 수평막대 그래프
            plugins: {
              legend: {
                display: false
              },
            },
            scale: {
              x: {
                ticks: {
                  maxTicksLimit: 3,  // y축 최소눈금 설정
                  beginAtZero: true,  // y축에 0 표시
                  fontSize: 13,  // 눈금 글자 크기
                },
                grid: {
                  display: false
                },
              },
            }
          }
        };

        const chart2 = new Chart(document.getElementById("bar-chart-horizontal2"), config);
}

// 맵차트 구성

// -----------------------맵차트 설정 시작-----------------------
var mapVars = "rMateOnLoadCallFunction=mapReadyHandler";

function mapReadyHandler(id) {
	document.getElementById(id).setLayout(layoutStr);
	document.getElementById(id).setData(mapData);
	document.getElementById(id).setMapDataBaseURLEx(mapDataBaseURL);
	document.getElementById(id).setSourceURLEx(sourceURL);
}
// Map Data 경로 정의
var mapDataBaseURL = "../Samples/MapDataBaseXml/SouthKorea.xml";

// MapChart Source 선택
var sourceURL = "../Samples/MapSource/SouthKorea.svg";

// 나중에 사용자 데이터 넣을때 지침서 11페이지 보고 넣기

// rMateMapChart 를 생성합니다.
rMateMapChartH5.create("map1", "mapHolder", mapVars, "100%", "100%");

// 마우스 오버시 뵤여줄 html
function divDataTipFunction(seriesId, code, label, data) {
    let insert =""
    insert += "<table margin=0 padding=0 width=100 height=1 style='text-align:left;color:#888888;letter-spacing:-1px;'>"
    insert += "<b style=\"color: black; font-weight: 900; font-size: 17px\">"+ selectedItemOnMapChart +"</br></b><b style=\"color: black; font-size: 15px\">가격 : "+ data.price +"원/kg</b></br><b style=\"color: black; font-size: 15px \">물량 :  "+ data.quantity +"</b>톤"
    insert += "</table>";
    return insert
}


var layoutStr = '\
<?xml version="1.0" encoding="utf-8"?>\
<rMateMapChart horizontalAlign="center">\
  <MapChart id="mainMap" drillDownEnabled="false" showDataTips="true" followDataTip="true" divDataTipJsFunction="divDataTipFunction">\
      <series>\
         <MapSeries id="mapseries" interactive="false">\
             <showDataEffect>\
                 <SeriesInterpolate duration="1000"/>\
             </showDataEffect>\
             <stroke>\
                 <Stroke color="#CAD7E0" weight="0.8" alpha="1"/>\
             </stroke>\
         </MapSeries>\
         <MapPlotSeries id="plot1" areaCodeField="level1" labelField="branchName" horizontalCenterGapField="h" verticalCenterGapField="v" adjustedRadius="10" fill="#ffffff" labelPositionField="lapos" color="#888888" fontWeight="bold" labelPosition="bottom" displayName="지역" rangeLegendDataField="value" subLabelField="address">\
             <stroke>\
                 <Stroke color="#2a9c08" weight="2" alpha="1"/>\
             </stroke>\
             <showDataEffect>\
                 <SeriesInterpolate duration="1000"/>\
             </showDataEffect>\
         </MapPlotSeries>\
     </series>\
    </MapChart>\
</rMateMapChart>\
';

// -----------------------맵차트 설정 끝 -----------------------

/////////////////////////////////////////////////////////////////
// 품목 상세검색

function setDetailChart(){
	let insert=""
	insert += "<table id=\"itemSelectedTable\" class=\"table\"><tbody>"

	for(let i=0; i<itemList.length; i++){
		insert += "<tr><td class=\"td-name\" style=\"font-weight:900;\">"+ itemList[i] +"</td></tr>"
	}
    insert += "</tbody></table>"
    $(".searchItems").append(insert);

	let insert2=""
	insert2 += "<table id=\"MarketSelectedTable\" class=\"table\"><tbody>"

    marketList = ['A 협동조합', 'B 협동조합', 'C 협동조합', 'D 협동조합', 'E 협동조합', 'F 협동조합', 'G 협동조합', 'H 협동조합', 'I 협동조합', 'J 협동조합', 'K 협동조합',]
	for(let i=0; i<marketList.length; i++){
		insert2 += "<tr><td class=\"td-name\" style=\"font-weight:900;\">"+ marketList[i] +"</td></tr>"
	}
    insert += "</tbody></table>"
    $(".searchMarkets").append(insert2);
}

let isClicked = false
let selectedItem
// 상세 차트 그리기
function DrawDetailChart(itemName, list){
    // html 구성
    $("#graph-wrap").empty();
    let insert = ""
    insert += "<div id=\"selectedItem\" style=\"font-size: 30px; font-weight: 900;\">"+ itemName +"</div>"
    insert += "<div id=\"detailGraph\"><div style=\" margin-top:20px; margin-left :520px; font-weight: 900; font-size: 20px;\">"+ itemName +" 일자별 도매가격 변화(원/kg)</div>"
    insert += "<div class=\"detailChart scrollBar\"\"><canvas id=\"detailPrice\" width=\""+ list.length * 100 +"\" height=\"520\"></canvas></div>"
    insert += "<canvas id=\"FixedLeftYAxis\" width=\"100\" height=\"520\"></canvas>"
    insert += "<canvas id=\"FixedRightYAxis\" width=\"100\" height=\"520\"></canvas></div>"
    $("#graph-wrap").append(insert);

    // 데이터 삽입
    let label =new Array()
    let priceData =new Array()
    let volumeData =new Array()

    let j=0
    for(let i = list.length-1; i>=0; i--){
        label[j] = list[i].date
        priceData[j] = list[i].price
        volumeData[j] = list[i].quantity
        j +=1
    }

    // 차트 구성
    const config = {
      type: 'line',
      data: {
        labels: label,
        datasets: [{
            label: '가격 : ',
            data: priceData,
            borderColor: "#fe195b",   // 선 색깔
            borderWidth: 3,
            tension: 0.4,
            yAxisID: 'priceY'
            },
        {
            label: '거래량 : ',
	        type: 'bar',
	        data: volumeData,
		    backgroundColor: ["#c2b5ea", "#c2b5ea", "#c2b5ea", "#c2b5ea", "#c2b5ea", "#c2b5ea", "#c2b5ea", "#c2b5ea", "#c2b5ea", "#c2b5ea"],
		    borderWidth: 1,
            yAxisID: 'volumeY'
		}],
      },
	    options: {
			responsive: false,  // 그래프 크기 조정가능
            interaction: {
              mode: 'index'   // 다중 차트에서 마우스 호버시 같은 x좌표에있으면 같이 보임
            },
		    plugins: {   // 라벨 지우기
	            legend: {
	    		display: false
		     	}
			},
			scales: {
		        priceY: {
				    ticks: {
					    beginAtZero: true,  // y축에 0 표시
					    fontSize: 13,  // 눈금 글자 크기
					},
					beginAtZero: true,
					position: 'left',
					grid: {
					  display: false
					},
					display: false
				},
				volumeY: {
				    ticks: {
					    beginAtZero: true,  // y축에 0 표시
					    fontSize: 13,  // 눈금 글자 크기
					},
					beginAtZero: true,
					position: 'right',
					grid: {
					  display: false
					},
					display: false
				},
				x: {
					grid: {
					  display: false
					}
				},
			}
	    }
	};

    new Chart(document.getElementById("detailPrice"), config);

    const config2 = {
      type: 'line',
      data: {
        datasets: [{
            label: '가격 : ',
	        type: 'bar',
	        data: priceData,
            yAxisID: 'priceY'
        }],
      },
	    options: {
			responsive: false,  // 그래프 크기 조정가능'
		    plugins: {   // 라벨 지우기
	            legend: {
	    		display: false
		     	}
			},
			scales: {
		        priceY: {
				    ticks: {
					    beginAtZero: true,  // y축에 0 표시
					    fontSize: 20,  // 눈금 글자 크기
					},
					beginAtZero: true,
					position: 'right',
					grid: {
					  display: false
					},
				},
				x: {
					grid: {
					  display: false
					},

				},
			}
	    }
	};
	new Chart(document.getElementById("FixedLeftYAxis"), config2);

    const config3 = {
      type: 'bar',
      data: {
        datasets: [{
            label: '거래량 : ',
            data: volumeData,
            yAxisID: 'volumeY'
        }],
      },
	    options: {
			responsive: false,  // 그래프 크기 조정가능'
		    plugins: {   // 라벨 지우기
	            legend: {
	    		display: false
		     	}
			},
			scales: {
		        volumeY: {
				    ticks: {
					    beginAtZero: true,  // y축에 0 표시
					    fontSize: 20,  // 눈금 글자 크기
					},
					beginAtZero: true,
					position: 'left',
					grid: {
					  display: false
					},
				},
			}
	    }
	};
	new Chart(document.getElementById("FixedRightYAxis"), config3);
}

// 품종별 차트
function DrawKindChart(itemName, list){
    $("#kind-graph-wrap").empty();
    let insert = ""
    insert += "<div id=\"rankKindPrice\">"
    insert += "<div style=\" margin-left :225px; font-weight: 900; font-size: 20px;\">"+ itemName +" 품종별 평균가격(원/kg)</div>"
    insert += "<canvas id=\"kindPriceChart\" width=\"680\" height=\"310\"></canvas></div>"
    insert += "<div id=\"rankKindQuantity\">"
    insert += "<div style=\" margin-left :250px; font-weight: 900; font-size: 20px;\">"+ itemName +" 품종별 거래량(kg)</div>"
    insert += "<canvas id=\"kindQuantityChart\" width=\"680\" height=\"310\"></canvas></div>"
    $("#kind-graph-wrap").append(insert);

    let kindName = new Array()
    let priceKind = new Array()
    let priceQuantity = new Array()

    // 가격은 정렬되고 거래량은 정렬되지 않음
    let j=0;
    for(let i=list.length-1; i>=0; i--){
        kindName[j] = list[i].kind
        priceKind[j] = list[i].price
        priceQuantity[j] = list[i].quantity
        j +=1
    }

    const config = {
          type: 'bar',
          data: {
            labels: kindName,
            yAxisID: 'y',
            datasets: [
              {
                label: "가격",
                backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                data: priceKind
              }
            ],
          },
          options: {
            responsive: false,  // 그래프 크기 조정가능
            indexAxis: 'y',  // 수평막대 그래프
            plugins: {
              legend: {
                display: false
              },
            },
            scale: {
              x: {
                ticks: {
                  maxTicksLimit: 3,  // y축 최소눈금 설정
                  beginAtZero: true,  // y축에 0 표시
                  fontSize: 13,  // 눈금 글자 크기
                },
                grid: {
                  display: false
                },
              },
            }
          }
        };

    new Chart(document.getElementById("kindPriceChart"), config);

    const config2 = {
          type: 'bar',
          data: {
            labels: kindName,
            yAxisID: 'y',
            datasets: [
              {
                label: "거래량",
                backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                data: priceQuantity
              }
            ],
          },
          options: {
            responsive: false,  // 그래프 크기 조정가능
            indexAxis: 'y',  // 수평막대 그래프
            plugins: {
              legend: {
                display: false
              },
            },
            scale: {
              x: {
                ticks: {
                  maxTicksLimit: 3,  // y축 최소눈금 설정
                  beginAtZero: true,  // y축에 0 표시
                  fontSize: 13,  // 눈금 글자 크기
                },
                grid: {
                  display: false
                },
              },
            }
          }
        };

        new Chart(document.getElementById("kindQuantityChart"), config2);
}

// 그냥 데이터 받아온다.
function requestAllItems(itemName){
    $.ajax({
        url: "getAllItems.do",
        data: "itemName=" + itemName,
        type: "POST",
        success : function(data) { // controller에서 list를 return 받았음
            //console.log(data)

            DrawDetailChart(itemName, data)

            // 기본 일봉버튼으로 세팅해준다.
            $("#interval6Month").css("backgroundColor", "#EFEFEF")  // 모든요소 배경 색상 변경
            $("#interval6Month").css("color", "black")  // 모든요소 글자 색상 변경
            $("#intervalMonth").css("backgroundColor", "#EFEFEF")  // 모든요소 배경 색상 변경
            $("#intervalMonth").css("color", "black")  // 모든요소 글자 색상 변경
            $("#interval3Month").css("backgroundColor", "#EFEFEF")  // 모든요소 배경 색상 변경
            $("#interval3Month").css("color", "black")  // 모든요소 글자 색상 변경
            $("#intervalYear").css("backgroundColor", "#EFEFEF")  // 모든요소 배경 색상 변경
            $("#intervalYear").css("color", "black")  // 모든요소 글자 색상 변경

            $("#intervalDate").css("backgroundColor", "#217af4")  // 클릭요소 배경색상 변경
            $("#intervalDate").css("color", "white")  // 클릭요소 글자 색상 변경

            //alert('success')
        },
        error : function() {
            alert("ajax error")
        }
      });
}

// 날짜1 ~ 날짜2 로 데이터 받아온다.
function requestAllItemsDate(itemName, startDate, endDate){
    $.ajax({
        url: "getAllItemsDate.do",
        data: { itemName: itemName, StartDate: startDate, EndDate: endDate},
        type: "POST",
        success : function(data) { // controller에서 list를 return 받았음
            //console.log(data)

            DrawDetailChart(itemName, data)

            // 기본 일봉버튼으로 세팅해준다.
            $("#interval6Month").css("backgroundColor", "#EFEFEF")  // 모든요소 배경 색상 변경
            $("#interval6Month").css("color", "black")  // 모든요소 글자 색상 변경
            $("#intervalMonth").css("backgroundColor", "#EFEFEF")  // 모든요소 배경 색상 변경
            $("#intervalMonth").css("color", "black")  // 모든요소 글자 색상 변경
            $("#interval3Month").css("backgroundColor", "#EFEFEF")  // 모든요소 배경 색상 변경
            $("#interval3Month").css("color", "black")  // 모든요소 글자 색상 변경
            $("#intervalYear").css("backgroundColor", "#EFEFEF")  // 모든요소 배경 색상 변경
            $("#intervalYear").css("color", "black")  // 모든요소 글자 색상 변경

            $("#intervalDate").css("backgroundColor", "#217af4")  // 클릭요소 배경색상 변경
            $("#intervalDate").css("color", "white")  // 클릭요소 글자 색상 변경


            //alert('success')
        },
        error : function() {
            alert("ajax error")
        }
      });
}

// 품종별 데이터 받아온다.
function requestDataByKind(itemName){
    $.ajax({
        url: "getKindData.do",
        data: "itemName=" + itemName,
        type: "POST",
        success : function(data) { // controller에서 list를 return 받았음
            //console.log(data)

            DrawKindChart(itemName, data)

            //alert('success')
        },
        error : function() {
            alert("ajax error")
        }
      });
}


// 품목검색///////////////////////////////
// 요소를 클릭하면 요소를 가져옴
$("#itemSelectedTable tr").click(function(){
    isClicked = true
    $("tr").css("backgroundColor", "white")  // 모든요소 배경 색상 변경
    $("tr").css("color", "black")  // 모든요소 글자 색상 변경

    // 현재 클릭된 Row
    selectedItem = $(this)
    $(this).css("backgroundColor", "#217af4")  // 클릭요소 배경색상 변경
    $(this).css("color", "white")  // 클릭요소 글자 색상 변경

    // ajax 통신으로 데이터 가져옴
    requestAllItems($(this).text())
    requestDataByKind($(this).text())
});

// 마우스 오버시
$('#itemSelectedTable tr').mouseover(function(){
    if(isClicked){
        if(selectedItem.text() == $(this).text()){}
        else{
        $(this).css("backgroundColor","#ccc");
            $(this).css("color", "black")  // 클릭요소 글자 색상 변경
        }
    }
    else{
        $(this).css("backgroundColor","#ccc");
        $(this).css("color", "black")  // 클릭요소 글자 색상 변경
    }
});

// 마우스 오버해제시
$('#itemSelectedTable tr').mouseout(function(){
    if(isClicked){
        if(selectedItem.text() == $(this).text()){}
        else{
            $(this).css("backgroundColor","#fff");
            $(this).css("color", "black")
        }
    }
    else{
        $(this).css("backgroundColor","#fff");
        $(this).css("color", "black")
    }
});


// input박스 활성화상태에서 엔터버튼 클릭시
$("#itemSearchInput").keydown(function(key) {
    if( key.keyCode == 13 ){  // 엔터버튼 키코드
        getSearchInputBoxVal()
    }
});

// 품목검색버튼 클릭시
$("#itemSearchBtn").click(function(){
    getSearchInputBoxVal()
});

// input 박스에서 값 가져와 처리하는 함수
function getSearchInputBoxVal(){
    // 품목검색 input에서 값 가져오기
    var searchItem = $("#itemSearchInput").val()

    // table의 모든 tr행의 0번째 열(td)를 가져온다.
    $('#itemSelectedTable tr').each(function(){
        var tr = $(this);
        var td = tr.children();
        var text = td.eq(0).text();   // 모든행의 값
        if(searchItem == text){  // 입력한 품목이 테이블내에 있을경우
            isClicked =true;
            selectedItem = $(this)

            $("#itemSelectedTable tr").css("backgroundColor", "white")  // 모든요소 배경 색상 변경
            $("#itemSelectedTable tr").css("color", "black")  // 모든요소 글자 색상 변경

            $(this).css("backgroundColor", "#217af4")  // 클릭요소 배경색상 변경
            $(this).css("color", "white")  // 클릭요소 글자 색상 변경

            // 테이블내에서 자동으로 스크롤 이동
            const offset = $(this).position();
            //$("html, body").animate({scrollTop: offset.top}, 0);

            // ajax 통신으로 데이터 가져옴
            requestAllItems($(this).text())
            requestDataByKind($(this).text())
            return
        }
    });
}

// 협동조합 검색///////////////////////////////
// 요소를 클릭하면 요소를 가져옴

let selectedMarket
$("#MarketSelectedTable tr").click(function(){
    isClicked = true
    $("tr").css("backgroundColor", "white")  // 모든요소 배경 색상 변경
    $("tr").css("color", "black")  // 모든요소 글자 색상 변경

    // 현재 클릭된 Row
    selectedMarket = $(this)
    $(this).css("backgroundColor", "#217af4")  // 클릭요소 배경색상 변경
    $(this).css("color", "white")  // 클릭요소 글자 색상 변경

    // ajax 통신으로 데이터 가져옴
    //requestAllItems($(this).text())
    //requestDataByKind($(this).text())
});

// 마우스 오버시
$('#MarketSelectedTable tr').mouseover(function(){
    if(isClicked){
        if(selectedMarket.text() == $(this).text()){}
        else{
        $(this).css("backgroundColor","#ccc");
            $(this).css("color", "black")  // 클릭요소 글자 색상 변경
        }
    }
    else{
        $(this).css("backgroundColor","#ccc");
        $(this).css("color", "black")  // 클릭요소 글자 색상 변경
    }
});

// 마우스 오버해제시
$('#MarketSelectedTable tr').mouseout(function(){
    if(isClicked){
        if(selectedMarket.text() == $(this).text()){}
        else{
            $(this).css("backgroundColor","#fff");
            $(this).css("color", "black")
        }
    }
    else{
        $(this).css("backgroundColor","#fff");
        $(this).css("color", "black")
    }
});


// input박스 활성화상태에서 엔터버튼 클릭시
$("#MarketSearchInput").keydown(function(key) {
    if( key.keyCode == 13 ){  // 엔터버튼 키코드
        //getSearchInputBoxVal() // 차후 협동조합 DB 보고 작성
    }
});

// 품목검색버튼 클릭시
$("#MarketSearchInput").click(function(){
    //getSearchInputBoxVal() // 차후 협동조합 DB 보고 작성
});




// 상세 필터

// 날짜 검색 버튼 클릭시
$("#dateSearch").click(function(){
    var startDate = $('#startDate').val();
    var endDate = $('#endDate').val();

    if(startDate != "" && endDate != "" && selectedItem != null){
        // 날짜가 제대로 입력되면 이곳이 실행됨
            requestAllItemsDate(selectedItem.text(), startDate, endDate)
        return
    }
    else{

    }
});


// 일봉 버튼 클릭시
$("#intervalDate").click(function(){
    $("#interval6Month").css("backgroundColor", "#EFEFEF")  // 모든요소 배경 색상 변경
    $("#interval6Month").css("color", "black")  // 모든요소 글자 색상 변경
    $("#intervalMonth").css("backgroundColor", "#EFEFEF")  // 모든요소 배경 색상 변경
    $("#intervalMonth").css("color", "black")  // 모든요소 글자 색상 변경
    $("#interval3Month").css("backgroundColor", "#EFEFEF")  // 모든요소 배경 색상 변경
    $("#interval3Month").css("color", "black")  // 모든요소 글자 색상 변경
    $("#intervalYear").css("backgroundColor", "#EFEFEF")  // 모든요소 배경 색상 변경
    $("#intervalYear").css("color", "black")  // 모든요소 글자 색상 변경

    $(this).css("backgroundColor", "#217af4")  // 클릭요소 배경색상 변경
    $(this).css("color", "white")  // 클릭요소 글자 색상 변경

    if(isClicked){
        requestAllItems(selectedItem.text());
    }
});

// 순봉 데이터 받아오는 함수
function requestDataBy6Month(itemName){
    $.ajax({
        url: "get6MonthData.do",
        data: "itemName=" + itemName,
        type: "POST",
        success : function(data) { // controller에서 list를 return 받았음
            //console.log(data)

            DrawDetailChart(itemName, data)


            //alert('success')
        },
        error : function() {
            alert("ajax error")
        }
      });
}

// 순봉 버튼 클릭시
$("#interval6Month").click(function(){
    $("#intervalDate").css("backgroundColor", "#EFEFEF")  // 모든요소 배경 색상 변경
    $("#intervalDate").css("color", "black")  // 모든요소 글자 색상 변경
    $("#intervalMonth").css("backgroundColor", "#EFEFEF")  // 모든요소 배경 색상 변경
    $("#intervalMonth").css("color", "black")  // 모든요소 글자 색상 변경
    $("#interval3Month").css("backgroundColor", "#EFEFEF")  // 모든요소 배경 색상 변경
    $("#interval3Month").css("color", "black")  // 모든요소 글자 색상 변경
    $("#intervalYear").css("backgroundColor", "#EFEFEF")  // 모든요소 배경 색상 변경
    $("#intervalYear").css("color", "black")  // 모든요소 글자 색상 변경

    $(this).css("backgroundColor", "#217af4")  // 클릭요소 배경색상 변경
    $(this).css("color", "white")  // 클릭요소 글자 색상 변경

    if(isClicked){
        requestDataBy6Month(selectedItem.text());
    }
});

// 월봉 데이터 받아오는 함수
function requestDataByMonth(itemName){
    $.ajax({
        url: "getMonthData.do",
        data: "itemName=" + itemName,
        type: "POST",
        success : function(data) { // controller에서 list를 return 받았음
            //console.log(data)

            DrawDetailChart(itemName, data)


            //alert('success')
        },
        error : function() {
            alert("ajax error")
        }
      });
}
// 월봉 버튼 클릭시
$("#intervalMonth").click(function(){
    $("#interval6Month").css("backgroundColor", "#EFEFEF")  // 모든요소 배경 색상 변경
    $("#interval6Month").css("color", "black")  // 모든요소 글자 색상 변경
    $("#intervalDate").css("backgroundColor", "#EFEFEF")  // 모든요소 배경 색상 변경
    $("#intervalDate").css("color", "black")  // 모든요소 글자 색상 변경
    $("#interval3Month").css("backgroundColor", "#EFEFEF")  // 모든요소 배경 색상 변경
    $("#interval3Month").css("color", "black")  // 모든요소 글자 색상 변경
    $("#intervalYear").css("backgroundColor", "#EFEFEF")  // 모든요소 배경 색상 변경
    $("#intervalYear").css("color", "black")  // 모든요소 글자 색상 변경

    $(this).css("backgroundColor", "#217af4")  // 클릭요소 배경색상 변경
    $(this).css("color", "white")  // 클릭요소 글자 색상 변경

    if(isClicked){
        requestDataByMonth(selectedItem.text())
    }
});

// 분기 데이터 받아오는 함수
function requestDataBy3Month(itemName){
    $.ajax({
        url: "getMonth3Month.do",
        data: "itemName=" + itemName,
        type: "POST",
        success : function(data) { // controller에서 list를 return 받았음
            //console.log(data)

            DrawDetailChart(itemName, data)
            //alert('success')
        },
        error : function() {
            alert("ajax error")
        }
      });
}

// 분기 버튼 클릭시
$("#interval3Month").click(function(){
    $("#interval6Month").css("backgroundColor", "#EFEFEF")  // 모든요소 배경 색상 변경
    $("#interval6Month").css("color", "black")  // 모든요소 글자 색상 변경
    $("#intervalMonth").css("backgroundColor", "#EFEFEF")  // 모든요소 배경 색상 변경
    $("#intervalMonth").css("color", "black")  // 모든요소 글자 색상 변경
    $("#intervalDate").css("backgroundColor", "#EFEFEF")  // 모든요소 배경 색상 변경
    $("#intervalDate").css("color", "black")  // 모든요소 글자 색상 변경
    $("#intervalYear").css("backgroundColor", "#EFEFEF")  // 모든요소 배경 색상 변경
    $("#intervalYear").css("color", "black")  // 모든요소 글자 색상 변경

    $(this).css("backgroundColor", "#217af4")  // 클릭요소 배경색상 변경
    $(this).css("color", "white")  // 클릭요소 글자 색상 변경

    if(isClicked){
        requestDataBy3Month(selectedItem.text())
    }
});

// 연봉 데이터 받아오는 함수
function requestDataByYear(itemName){
    $.ajax({
        url: "getMonthYear.do",
        data: "itemName=" + itemName,
        type: "POST",
        success : function(data) { // controller에서 list를 return 받았음
            //console.log(data)

            DrawDetailChart(itemName, data)
            //alert('success')
        },
        error : function() {
            alert("ajax error")
        }
      });
}
// 연봉 버튼 클릭시
$("#intervalYear").click(function(){
    $("#interval6Month").css("backgroundColor", "#EFEFEF")  // 모든요소 배경 색상 변경
    $("#interval6Month").css("color", "black")  // 모든요소 글자 색상 변경
    $("#intervalMonth").css("backgroundColor", "#EFEFEF")  // 모든요소 배경 색상 변경
    $("#intervalMonth").css("color", "black")  // 모든요소 글자 색상 변경
    $("#interval3Month").css("backgroundColor", "#EFEFEF")  // 모든요소 배경 색상 변경
    $("#interval3Month").css("color", "black")  // 모든요소 글자 색상 변경
    $("#intervalDate").css("backgroundColor", "#EFEFEF")  // 모든요소 배경 색상 변경
    $("#intervalDate").css("color", "black")  // 모든요소 글자 색상 변경

    $(this).css("backgroundColor", "#217af4")  // 클릭요소 배경색상 변경
    $(this).css("color", "white")  // 클릭요소 글자 색상 변경

    if(isClicked){
        requestDataByYear(selectedItem.text())
    }
});