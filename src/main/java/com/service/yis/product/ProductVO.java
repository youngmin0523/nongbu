package com.service.yis.product;

public class ProductVO {
    private String product_id;
    private String categoryA;
    private String categoryB;
    private String date;
    private String price;
    private String farm_name;

    public String getProduct_id() {
        return product_id;
    }
    public void setProduct_id(String product_id) {
        this.product_id = product_id;
    }

    public String getCategoryA() {
        return categoryA;
    }
    public void setCategoryA(String categoryA) {
        this.categoryA = categoryA;
    }

    public String getCategoryB() {
        return categoryB;
    }
    public void setCategoryB(String categoryB) {
        this.categoryB = categoryB;
    }

    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }

    public String getPrice() {
        return price;
    }
    public void setPrice(String price) {
        this.price = price;
    }

    public String getFarmname() {
        return farm_name;
    }
    public void setFarmname(String farm_name) {
        this.farm_name = farm_name;
    }
}