package com.service.yis.domain.item;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

@NoArgsConstructor
@ToString
@Getter
@Entity(name="sold_items_table")
public class Item_Entity {
    @Id
    int sold_num;
    String item_name;
    String date;
    String market;
    String location;
    String kind;
    int price;   // 평균 거래가격
    int total_quantity; // 총 거래량
    int quantity;   // 거래량
}
