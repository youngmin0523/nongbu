<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE HTML>
<html lang="ko" xmlns:th="http://www.thymeleaf.org">

<head>
    <meta charset="utf-8">
    <link href="main-test.css" rel="stylesheet">
    <link href="item-test.css" rel="stylesheet">
    <link href="BtoB-test.css" rel="stylesheet">

    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

    <title>BtoB 계약재배 첫 페이지</title>
</head>

<body>
<div class="container">
    <nav class="main-nav">
        <div style="text-align: left">
            <img class="mainImg" src="main.png" style="margin-top:100px;">
        </div>

        <!--왼쪽 메뉴 네비게이션-->
        <ul class="main-menu">
            <li><a href="endpage.jsp">데이터센터</a></li>
            <li><a href="endpage.jsp">계약재배</a></li>
            <li><a href="endpage.jsp">크라우드펀딩</a></li>
        </ul>

        <!--오른쪽 메뉴 네비게이션-->
        <ul class="right-menu">
            <li>
                <a href="SearchRes.jsp">로그인</a>
                <a style="display: none" href="endpage.jsp">로그아웃</a>
            </li>
            <li>
                <a href="endpage.jsp">회원가입</a>
                <a style="display: none" href='endpage.jsp'>정보수정</a>
            </li>
            <li>
                <a href="endpage.jsp">마이페이지</a>
            </li>
        </ul>
    </nav>


    <!--item content-->
    <section>
        <!--검색창-->
        <div style="text-align:center">
            <br><br>
            <h1>설명이 들어갈 공간</h1>
            <br><br><br><br><br>
            <h1>설명이 들어갈 공간</h1>
            <br><br><br><br><br>
            <h1>설명이 들어갈 공간</h1>
            <br><br><br><br><br>
            <h1>설명이 들어갈 공간</h1>
            <br><br><br><br><br>
            <h1>설명이 들어갈 공간</h1>
            <br><br><br><br><br>
            <h1>설명이 들어갈 공간</h1>
            <br><br><br><br><br>
        </div>

        <!--검색창-->
        <div class="search">
            <form action="./keywordSearch" method="get" name="keywordSearch">
                <input id="searchbox" type="text" name="keyword" placeholder="검색어를 입력해주세요."
                       onkeypress="if(event.keyCode == 13){doAction1(); return false;}"
                       onfocus="this.placeholder=''" onblur="this.placeholder='검색어를 입력해주세요.'" autocomplete="off">
                <button class="searchBtn" type="button" onclick="doAction1()">검색</button>
            </form>
        </div>

        <!--상세 검색 모달 페이지-->
        <div>
            <button class="openBtn">상세 검색</button>
            <div class="modal hidden">
                <div class="bg"></div>
                <span class="modalBox">
                        <form action="./detailSearch" method="get" name="detailSearch">
                            <table>
                                <tr>
                                    <th>카테고리</th>
                                    <td>
                                        <select class="form-control" id="categoryA" name="categoryA" autocomplete="off"
                                                onchange="categoryChange(this)" style="width:120px; height:30px;">
                                            <option>선택</option>
                                            <option value="과일">과일</option>
                                            <option value="채소">채소</option>
                                            <option value="작물">작물</option>
                                        </select>
                                        &nbsp;
                                        <select class="form-control" id="categoryB" name="categoryB"
                                                style="width:120px; height:30px;"></select>
                                    </td>
                                </tr>

                                <tr>
                                    <th>예상 출하 시기</th>
                                    <td>
                                        <input type="text" id="datepicker1" name="date"
                                               style="width:120px; height:30px;" autocomplete="off">
                                    </td>
                                </tr>

                                <!--
                                <tr>
                                    <th>지역</th>
                                    <td>
                                        <select class="form-control" id="regionA" name="regionA"
                                            onchange="regionChange(this)" style="width:80px; height:30px;">
                                            <option>선택</option>
                                            <option value="경상남도">경상남도</option>
                                            <option value="경상북도">경상북도</option>
                                            <option value="강원도">강원도</option>
                                        </select>
                                        &nbsp;
                                        <select class="form-control" id="regionB" name="regionB"
                                            style="width:80px; height:30px;"></select>
                                    </td>
                                </tr>
                                -->

                                <tr>
                                    <th>kg당 가격(원)</th>
                                    <td>
                                        <select class="form-control" id="price" name="price" autocomplete="off"
                                                style="width:120px; height:30px;">
                                            <option>선택</option>
                                            <option value="5000">5000원 이하</option>
                                            <option value="10000">10000원 이하</option>
                                            <option value="15000">15000원 이하</option>
                                            <option value="20000">20000원 이하</option>
                                            <option value="25000">25000원 이하</option>
                                        </select>
                                    </td>
                                </tr>
                            </table>
                            <button class="submit" type="reset" onclick="doAction2()">검색</button>
                            <button class="closeBtn"></button>
                        </form>
                    </span>
            </div>
        </div>
    </section>
</div>

<!-- Footer -->
<footer class="footer">
    <div class="footer-inner">
        <div><i class="fas fa-globe fa-2x"></i> 한국어</div>
        <ul>
            <li><a href="https://www.nongnet.or.kr/index.do" target="_blank">농넷</a></li>
            <li><a href="https://www.kamis.or.kr/customer/main/main.do" target="_blank">KAMIS</a></li>
            <li><a href="https://kosis.kr/statHtml/statHtml.do?orgId=678&tblId=DT_67801_E000020&conn_path=I2"
                   target="_blank">한국농어촌공사</a></li>
            <li><a href="https://www.yu.ac.kr/main/index.do" target="_blank">영남대학교</a></li>
        </ul>
    </div>
</footer>

<script type="text/javascript" src="modal.js"></script>
<script type="text/javascript" src="changer.js"></script>
<script type="text/javascript" src="datepicker.js"></script>
<script type="text/javascript" src="buttonCondition.js"></script>
</body>

</html>