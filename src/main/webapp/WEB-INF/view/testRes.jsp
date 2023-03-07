<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.example.demo.ProductVO" %>
<%@ page import="com.example.demo.ProductDAO" %>
<%@ page import="java.util.Collections" %>

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <link href="main-test.css" rel="stylesheet">
    <link href="item-test.css" rel="stylesheet">
    <link href="BtoB-test.css" rel="stylesheet">

    <title>Test Page</title>
</head>
<body>


<div class="search" style="margin-top: 30px;">
    <form action="./keywordSearch" method="get" name="keywordSearch">
        <input id="searchbox" type="text" name="keyword" placeholder="검색어를 입력해주세요."
               onkeypress="if(event.keyCode == 13){ doAction1(); return false; }"
               onfocus="this.placeholder=''" onblur="this.placeholder='검색어를 입력해주세요.'" autocomplete="off">
        <button class="searchBtn" type="button" onclick="doAction1()">검색</button>
    </form>
</div>


<h1 style="margin:auto; text-align:center">농가 이름</h1>
<div id="BtnContainer" style="margin:auto; text-align:center">
    <button class="filter_btn active" id = "filterall" value = "모두" onclick="filterSelection('모두'); filterEvent(this.id);">모두</button>
    <c:forEach items="${fnResult}" var="fnResult">
        <button class="filter_btn" id = "${fnResult}+filter" value="${fnResult}" onclick="filterSelection('${fnResult}'); filterEvent(this.id);">${fnResult}</button>
    </c:forEach>

</div>
<br>


<div class="Rescontainer" style="margin:0px auto; text-align:center">
    <c:forEach items="${list}" var="list">
        <div class="filterDiv ${list.getFarmname()}">
                ${list.getProduct_id()}
                ${list.getCategoryA()}
                ${list.getCategoryB()}
                ${list.getDate()}
                ${list.getPrice()}
        </div>
    </c:forEach>
</div>


<table border=1 style="width:800px;text-align:center;margin:20px auto;" id="productTable">
    <thead>
    <tr align="center" bgcolor="#FFFF66">
        <th>상품번호</th>
        <th>카테고리</th>
        <th>품목</th>
        <th>예상 출하 날짜</th>
        <th>가격</th>
        <th>농가 이름</th>
    </tr>
    </thead>
    <tbody>
    <c:forEach items="${list}" var="list">
        <tr align="center" class="${list.getFarmname()}">
            <td>${list.getProduct_id()}</td>
            <td>${list.getCategoryA()}</td>
            <td>${list.getCategoryB()}</td>
            <td>${list.getDate()}</td>
            <td>${list.getPrice()}</td>
            <td>${list.getFarmname()}</td>
        </tr>
    </c:forEach>
    </tbody>
</table>

<script type="text/javascript" src="buttonCondition.js"></script>
<script type="text/javascript" src="divFilter.js"></script>
<script type="text/javascript" src="tableFilter.js"></script>
</body>
</html>

