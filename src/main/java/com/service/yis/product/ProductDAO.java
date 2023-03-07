package com.service.yis.product;

import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Date;

public class ProductDAO {
    Connection conn = null;
    Statement stmt = null;
    ResultSet rs = null;

    public List listKeyword(ProductVO productVO) {
        List<ProductVO> keywordList = new ArrayList<>();
        String keyword = productVO.getCategoryB();

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            String jdbcDriver = "jdbc:mysql://localhost:3306/test?" +
                    "useSSL=false&serverTimezone=UTC";
            String dbUser = "root";
            String dbPass = "tmdgns1234";

            conn = DriverManager.getConnection(jdbcDriver, dbUser, dbPass);
            stmt = conn.createStatement();
            rs = stmt.executeQuery("select * from test where categoryB = '" + keyword + "'");

            while (rs.next()) {
                String product_id = rs.getString("product_id");
                String categoryA = rs.getString("categoryA");
                String categoryB = rs.getString("categoryB");
                String D_date = rs.getString("D_date");
                String price = rs.getString("price");
                String farm_name = rs.getString("farm_name");

                ProductVO vo = new ProductVO();
                vo.setProduct_id(product_id);
                vo.setCategoryA(categoryA);
                vo.setCategoryB(categoryB);
                vo.setDate(D_date);
                vo.setPrice(price);
                vo.setFarmname(farm_name);

                keywordList.add(vo);
            }
        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
            ex.printStackTrace();
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } finally {
            if (rs != null) try {
                rs.close();
            } catch (SQLException ex) {
            }
            if (stmt != null) try {
                stmt.close();
            } catch (SQLException ex) {
            }
            if (conn != null) try {
                conn.close();
            } catch (SQLException ex) {
            }
        }
        return keywordList;
    }



    public List listDetail(ProductVO productVO) throws ParseException {
        List<ProductVO> detailList = new ArrayList<>();
        String category = productVO.getCategoryB();
        String date = productVO.getDate();
        String prices = productVO.getPrice();

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date dateRes = formatter.parse(date);
        java.sql.Date sqlDate = new java.sql.Date(dateRes.getTime());
        int sqlprice = Integer.parseInt(prices);

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            String jdbcDriver = "jdbc:mysql://localhost:3306/test?" +
                    "useSSL=false&serverTimezone=UTC";
            String dbUser = "root";
            String dbPass = "tmdgns1234";

            conn = DriverManager.getConnection(jdbcDriver, dbUser, dbPass);
            stmt = conn.createStatement();
            rs = stmt.executeQuery("select * " +
                    "from test " +
                    "where categoryB = '" + category + "'" +
                    "and D_date = '" + sqlDate + "'" +
                    "and price <= '" + sqlprice + "'");

            while (rs.next()) {
                String product_id = rs.getString("product_id");
                String categoryA = rs.getString("categoryA");
                String categoryB = rs.getString("categoryB");
                String D_date = rs.getString("D_date");
                String price = rs.getString("price");
                String farm_name = rs.getString("farm_name");

                ProductVO vo = new ProductVO();
                vo.setProduct_id(product_id);
                vo.setCategoryA(categoryA);
                vo.setCategoryB(categoryB);
                vo.setDate(D_date);
                vo.setPrice(price);
                vo.setFarmname(farm_name);

                detailList.add(vo);
            }
        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
            ex.printStackTrace();
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } finally {
            if (rs != null) try {
                rs.close();
            } catch (SQLException ex) {
            }
            if (stmt != null) try {
                stmt.close();
            } catch (SQLException ex) {
            }
            if (conn != null) try {
                conn.close();
            } catch (SQLException ex) {
            }
        }
        return detailList;
    }
}
