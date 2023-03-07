package com.service.yis.domain.item;

import com.service.yis.domain.item.Item_Entity;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface Item_Repository extends JpaRepository<Item_Entity, Long> {

    // 아이템 리스트 출력
    @Query(value = "select * from sold_items_table group by item_name", nativeQuery = true)
    public List<Item_Entity> getItem();

    // 최근날짜별 가격, 거래량 평균 10개의 행을 가져오는 쿼리함수
    @Query(value = "select sold_num, item_name, date, market, location, kind, avg(price) as price, sum(total_quantity) as total_quantity, sum(quantity) as quantity from sold_items_table where item_name = :item_name group by date order by date DESC limit 10;", nativeQuery = true)
    public List<Item_Entity> getItemAvgByDate(@Param("item_name")String item_name);

    // 날짜와 도매시장기준 데이터 가져온다.
    @Query(value = "select sold_num, item_name, date, market, location, kind, avg(price) as price, sum(total_quantity) as total_quantity, sum(quantity) as quantity from sold_items_table where item_name = :item_name and date= :date group by market order by date DESC", nativeQuery = true)
    public List<Item_Entity> getItemAvgByDateMarket(@Param("item_name")String item_name, @Param("date")String date);

    // 모든 데이터 받아온느 함수
    @Query(value = "select sold_num, item_name, date, market, location, kind, avg(price) as price, sum(total_quantity) as total_quantity, sum(quantity) as quantity from sold_items_table where item_name = :item_name group by date order by date DESC", nativeQuery = true)
    public List<Item_Entity> getItemAllAvgByDate(@Param("item_name")String item_name);

    // 날짜 2개 입력받아서 그 사이에 있는 데이터 받아오는 함수
    @Query(value = "select sold_num, item_name, date, market, location, kind, avg(price) as price, sum(total_quantity) as total_quantity, sum(quantity) as quantity from sold_items_table where item_name = :item_name group by date having date between :startDate and :endDate order by date DESC", nativeQuery = true)
    public List<Item_Entity> getItemByBtwDateAndDate(@Param("item_name")String item_name, @Param("startDate")String startDate, @Param("endDate") String endDate);

    // 월 단위로 데이터 받는 함수
    @Query(value = "select sold_num, item_name, date, market, location, kind, avg(price) as price, sum(total_quantity) as total_quantity, sum(quantity) as quantity\n" +
            "from (select sold_num, item_name, date_format(date, '%Y-%m') as date, market, location, kind, avg(price) as price, sum(total_quantity) as total_quantity, sum(quantity) as quantity from sold_items_table where item_name = :item_name group by date) B\n" +
            "group by B.date order by B.date DESC", nativeQuery = true)
    public List<Item_Entity> getItemAvgMonth(@Param("item_name")String item_name);

    // 년 단위로 데이터 받는 함수
    @Query(value = "select sold_num, item_name, date, market, location, kind, avg(price) as price, sum(total_quantity) as total_quantity, sum(quantity) as quantity\n" +
            "from (select sold_num, item_name, date_format(date, '%Y') as date, market, location, kind, avg(price) as price, sum(total_quantity) as total_quantity, sum(quantity) as quantity from sold_items_table where item_name = :item_name group by date) B\n" +
            "group by B.date order by B.date DESC", nativeQuery = true)
    public List<Item_Entity> getItemAvgYear(@Param("item_name")String item_name);

    // 분기 단위로 데이터 받는 함수
    @Query(value = "select sold_num, item_name, date, market, location, kind, avg(price) as price, sum(total_quantity) as total_quantity, sum(quantity) as quantity \n" +
            "from (select sold_num, item_name, concat(date_format(date, '%Y-'),quarter(date)) as date, market, location, kind, avg(price) as price, sum(total_quantity) as total_quantity, sum(quantity) as quantity \n" +
            "from sold_items_table where item_name = :item_name \n" +
            "group by date) B\n" +
            "group by B.date \n" +
            "order by B.date DESC\n", nativeQuery = true)
    public List<Item_Entity> getItemAvg3Month(@Param("item_name")String item_name);

    @Query(value = "select sold_num, item_name, date, market, location, kind, price, total_quantity, quantity\n" +
            "            from ((select sold_num, item_name, date, market, location, kind, avg(price) as price, sum(total_quantity) as total_quantity, sum(quantity) as quantity\n" +
            "            from (select sold_num, item_name, date_format(date, '%Y-1') as date, market, location, kind, avg(price) as price, sum(total_quantity) as total_quantity, sum(quantity) as quantity\n" +
            "            from sold_items_table where item_name = :item_name\n" +
            "            group by date\n" +
            "            having quarter(date) = '1' OR quarter(date) = '2'\n" +
            "            ) B\n" +
            "            group by B.date\n" +
            "            order by B.date DESC)\n" +
            "            Union\n" +
            "            (select sold_num, item_name, date, market, location, kind, avg(price) as price, sum(total_quantity) as total_quantity, sum(quantity) as quantity\n" +
            "            from (select sold_num, item_name, date_format(date, '%Y-6') as date, market, location, kind, avg(price) as price, sum(total_quantity) as total_quantity, sum(quantity) as quantity\n" +
            "            from sold_items_table where item_name = :item_name\n" +
            "\t\t\tgroup by date\n" +
            "            having quarter(date) = '3' OR quarter(date) = '4'\n" +
            "            ) B\n" +
            "            group by B.date\n" +
            "            order by B.date DESC)) C\n" +
            "            order by C.date desc", nativeQuery = true)
    public List<Item_Entity> getItemAvg6Month(@Param("item_name")String item_name);


    // 품종별로 데이터 받아온다.
    @Query(value = "select sold_num, item_name, date, market, location, kind, avg(price) as price, sum(total_quantity) as total_quantity, sum(quantity) as quantity from sold_items_table where item_name = :item_name group by kind order by price desc;", nativeQuery = true)
    public List<Item_Entity> getItemAvgByKind(@Param("item_name")String item_name);
}
