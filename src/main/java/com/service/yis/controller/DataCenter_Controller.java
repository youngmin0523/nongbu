<<<<<<< HEAD
package com.service.yis.controller;

import com.service.yis.service.Data_Center_Service;
import com.service.yis.domain.item.Item_Entity;
import com.service.yis.service.Data_Center_Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RequiredArgsConstructor
@Slf4j   // 로깅을 위한 키워드
@Controller
public class DataCenter_Controller {

    private final Data_Center_Service data_Center_Service;

    @GetMapping("/datacenter")
    public String Data_Center(Model model) {

        return "DataCenter/html/DataCenter.html";
    }

    @RequestMapping(value = "getItems.do", method = RequestMethod.POST)
    @ResponseBody   //아이템 리스트 받아오는 함수
    public Object getItems() {
        List<Item_Entity> list = data_Center_Service.getItem();
        return list;
    }

    @RequestMapping(value = "getItemList.do", method = RequestMethod.POST)
    @ResponseBody   //최근 10개의 데이터만 받아오는함수
    public Object getItemList(HttpServletRequest request) {

        // 자바스크립트에서 요청받은 품목에 대한 데이터를 가져온다.
        String itemName = request.getParameter("itemName");

        List<Item_Entity> list = data_Center_Service.getItemAvgByDate(itemName);
        return list;
    }

    @RequestMapping(value = "getMarketData.do", method = RequestMethod.POST)
    @ResponseBody   // 특정날의 도매시장 정보를 받아오는 함수
    public Object getMarketData(HttpServletRequest request) {

        // 자바스크립트에서 요청받은 품목에 대한 데이터를 가져온다.
        String itemName = request.getParameter("itemName");
        String date = request.getParameter("date");

        List<Item_Entity> list = data_Center_Service.getItemAvgByDateMarket(itemName, date);
        return list;

    }

    @RequestMapping(value = "getAllItems.do", method = RequestMethod.POST)
    @ResponseBody   // 모든 데이터 받아오는 함수
    public Object getAllItems(HttpServletRequest request) {

        // 자바스크립트에서 요청받은 품목에 대한 데이터를 가져온다.
        String itemName = request.getParameter("itemName");

        List<Item_Entity> list = data_Center_Service.getItemAllAvgByDate(itemName);

        return list;
    }

    @RequestMapping(value = "getAllItemsDate.do", method = RequestMethod.POST)
    @ResponseBody   // 날짜를 입력해서 날짜 사이에 있는 데이터 받아오는 함수
    public Object getAllItemsDate(HttpServletRequest request) {

        // 자바스크립트에서 요청받은 품목에 대한 데이터를 가져온다.
        String itemName = request.getParameter("itemName");
        String startDate = request.getParameter("StartDate");
        String endDate = request.getParameter("EndDate");

        List<Item_Entity> list = data_Center_Service.getItemByBtwDateAndDate(itemName, startDate, endDate);
        return list;
    }

    @RequestMapping(value = "getMonthData.do", method = RequestMethod.POST)
    @ResponseBody   // 월 단위로 데이터 받는 함수
    public Object getMonthData(HttpServletRequest request) {

        // 자바스크립트에서 요청받은 품목에 대한 데이터를 가져온다.
        String itemName = request.getParameter("itemName");

        List<Item_Entity> list = data_Center_Service.getItemAvgMonth(itemName);
        return list;
    }

    @RequestMapping(value = "getMonthYear.do", method = RequestMethod.POST)
    @ResponseBody   // 년 단위로 데이터 받는 함수
    public Object getMonthYear(HttpServletRequest request) {

        // 자바스크립트에서 요청받은 품목에 대한 데이터를 가져온다.
        String itemName = request.getParameter("itemName");

        List<Item_Entity> list = data_Center_Service.getItemAvgYear(itemName);
        return list;
    }

    @RequestMapping(value = "getMonth3Month.do", method = RequestMethod.POST)
    @ResponseBody   // 분기 단위로 데이터 받는 함수
    public Object getMonth3Month(HttpServletRequest request) {

        // 자바스크립트에서 요청받은 품목에 대한 데이터를 가져온다.
        String itemName = request.getParameter("itemName");

        List<Item_Entity> list = data_Center_Service.getItemAvg3Month(itemName);
        return list;
    }

    @RequestMapping(value = "get6MonthData.do", method = RequestMethod.POST)
    @ResponseBody   // 반년 단위로 데이터 받는 함수
    public Object get6MonthData(HttpServletRequest request) {

        // 자바스크립트에서 요청받은 품목에 대한 데이터를 가져온다.
        String itemName = request.getParameter("itemName");

        List<Item_Entity> list = data_Center_Service.getItemAvg6Month(itemName);
        return list;
    }

    @RequestMapping(value = "getKindData.do", method = RequestMethod.POST)
    @ResponseBody   //품종별로 데이터 받는 함수
    public Object getKindData(HttpServletRequest request) {

        // 자바스크립트에서 요청받은 품목에 대한 데이터를 가져온다.
        String itemName = request.getParameter("itemName");

        List<Item_Entity> list = data_Center_Service.getItemAvgByKind(itemName);
        return list;
    }
}
=======
package com.service.yis.controller;

import com.service.yis.service.Data_Center_Service;
import com.service.yis.domain.item.Item_Entity;
import com.service.yis.service.Data_Center_Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RequiredArgsConstructor
@Slf4j   // 로깅을 위한 키워드
@Controller
public class DataCenter_Controller {

    private final Data_Center_Service data_Center_Service;

    @GetMapping("/datacenter")
    public String Data_Center(Model model) {

        return "DataCenter/html/DataCenter.html";
    }

    @RequestMapping(value = "getItems.do", method = RequestMethod.POST)
    @ResponseBody   //아이템 리스트 받아오는 함수
    public Object getItems() {
        List<Item_Entity> list = data_Center_Service.getItem();
        return list;
    }

    @RequestMapping(value = "getItemList.do", method = RequestMethod.POST)
    @ResponseBody   //최근 10개의 데이터만 받아오는함수
    public Object getItemList(HttpServletRequest request) {

        // 자바스크립트에서 요청받은 품목에 대한 데이터를 가져온다.
        String itemName = request.getParameter("itemName");

        List<Item_Entity> list = data_Center_Service.getItemAvgByDate(itemName);
        return list;
    }

    @RequestMapping(value = "getMarketData.do", method = RequestMethod.POST)
    @ResponseBody   // 특정날의 도매시장 정보를 받아오는 함수
    public Object getMarketData(HttpServletRequest request) {

        // 자바스크립트에서 요청받은 품목에 대한 데이터를 가져온다.
        String itemName = request.getParameter("itemName");
        String date = request.getParameter("date");

        List<Item_Entity> list = data_Center_Service.getItemAvgByDateMarket(itemName, date);
        return list;

    }

    @RequestMapping(value = "getAllItems.do", method = RequestMethod.POST)
    @ResponseBody   // 모든 데이터 받아오는 함수
    public Object getAllItems(HttpServletRequest request) {

        // 자바스크립트에서 요청받은 품목에 대한 데이터를 가져온다.
        String itemName = request.getParameter("itemName");

        List<Item_Entity> list = data_Center_Service.getItemAllAvgByDate(itemName);

        return list;
    }

    @RequestMapping(value = "getAllItemsDate.do", method = RequestMethod.POST)
    @ResponseBody   // 날짜를 입력해서 날짜 사이에 있는 데이터 받아오는 함수
    public Object getAllItemsDate(HttpServletRequest request) {

        // 자바스크립트에서 요청받은 품목에 대한 데이터를 가져온다.
        String itemName = request.getParameter("itemName");
        String startDate = request.getParameter("StartDate");
        String endDate = request.getParameter("EndDate");

        List<Item_Entity> list = data_Center_Service.getItemByBtwDateAndDate(itemName, startDate, endDate);
        return list;
    }

    @RequestMapping(value = "getMonthData.do", method = RequestMethod.POST)
    @ResponseBody   // 월 단위로 데이터 받는 함수
    public Object getMonthData(HttpServletRequest request) {

        // 자바스크립트에서 요청받은 품목에 대한 데이터를 가져온다.
        String itemName = request.getParameter("itemName");

        List<Item_Entity> list = data_Center_Service.getItemAvgMonth(itemName);
        return list;
    }

    @RequestMapping(value = "getMonthYear.do", method = RequestMethod.POST)
    @ResponseBody   // 년 단위로 데이터 받는 함수
    public Object getMonthYear(HttpServletRequest request) {

        // 자바스크립트에서 요청받은 품목에 대한 데이터를 가져온다.
        String itemName = request.getParameter("itemName");

        List<Item_Entity> list = data_Center_Service.getItemAvgYear(itemName);
        return list;
    }

    @RequestMapping(value = "getMonth3Month.do", method = RequestMethod.POST)
    @ResponseBody   // 분기 단위로 데이터 받는 함수
    public Object getMonth3Month(HttpServletRequest request) {

        // 자바스크립트에서 요청받은 품목에 대한 데이터를 가져온다.
        String itemName = request.getParameter("itemName");

        List<Item_Entity> list = data_Center_Service.getItemAvg3Month(itemName);
        return list;
    }

    @RequestMapping(value = "get6MonthData.do", method = RequestMethod.POST)
    @ResponseBody   // 반년 단위로 데이터 받는 함수
    public Object get6MonthData(HttpServletRequest request) {

        // 자바스크립트에서 요청받은 품목에 대한 데이터를 가져온다.
        String itemName = request.getParameter("itemName");

        List<Item_Entity> list = data_Center_Service.getItemAvg6Month(itemName);
        return list;
    }

    @RequestMapping(value = "getKindData.do", method = RequestMethod.POST)
    @ResponseBody   //품종별로 데이터 받는 함수
    public Object getKindData(HttpServletRequest request) {

        // 자바스크립트에서 요청받은 품목에 대한 데이터를 가져온다.
        String itemName = request.getParameter("itemName");

        List<Item_Entity> list = data_Center_Service.getItemAvgByKind(itemName);
        return list;
    }
}
>>>>>>> e8e155d4ba798d63e8976dbd8eefda5e83cf6199
