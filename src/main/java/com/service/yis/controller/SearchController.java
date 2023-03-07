package com.service.yis.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.util.*;
import com.service.yis.product.ProductVO;
import com.service.yis.product.ProductDAO;

@Controller
public class SearchController {

    @RequestMapping("/")
    public String doA(){
        return "BtoB";
    }
    
    String keyword = "";
    ProductVO productVO = new ProductVO();
    ProductDAO dao = new ProductDAO();
    List productList = null;

    @RequestMapping(value = "/keywordSearch", method = RequestMethod.GET)
    public String doB(HttpServletRequest request, Model model) {
        keyword = request.getParameter("keyword");
        productVO.setCategoryB(keyword);
        productList = dao.listKeyword(productVO);

        model.addAttribute("list", productList);

        ArrayList<String> farm_name = new ArrayList<>();
        for(int i = 0; i < productList.size(); i++){
            ProductVO vo = (ProductVO) productList.get(i);
            farm_name.add(vo.getFarmname());
        }
        Set<String> set = new HashSet<>(farm_name);
        ArrayList<String> result = new ArrayList<>(set);
        Collections.sort(result);

        model.addAttribute("fnResult", result);

        return "testRes";
    }

    @RequestMapping(value = "/detailSearch", method = RequestMethod.GET)
    public String doC(HttpServletRequest request, Model model) throws ParseException {
        keyword = request.getParameter("categoryB");
        String dateS = request.getParameter("date");
        String priceS = request.getParameter("price");
        productVO.setCategoryB(keyword);
        productVO.setDate(dateS);
        productVO.setPrice(priceS);
        productList = dao.listDetail(productVO);

        model.addAttribute("list", productList);

        ArrayList<String> farm_name = new ArrayList<>();
        for(int i = 0; i < productList.size(); i++){
            ProductVO vo = (ProductVO) productList.get(i);
            farm_name.add(vo.getFarmname());
        }
        Set<String> set = new HashSet<>(farm_name);
        ArrayList<String> result = new ArrayList<>(set);
        Collections.sort(result);

        model.addAttribute("fnResult", result);

        return "testRes";
    }
}

