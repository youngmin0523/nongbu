<<<<<<< HEAD
package com.service.yis.service;

import com.service.yis.domain.item.Item_Entity;
import com.service.yis.domain.item.Item_Repository;
import com.service.yis.domain.item.Item_Entity;
import com.service.yis.domain.item.Item_Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Data_Center_Service {
    @Autowired
    private Item_Repository item_Repository;

    public List<Item_Entity> getItem(){return item_Repository.getItem();}
    public List<Item_Entity> getItemAvgByDate(String name) {
        return item_Repository.getItemAvgByDate(name);
    }
    public List<Item_Entity> getItemAvgByDateMarket(String name, String date) {return item_Repository.getItemAvgByDateMarket(name, date);}
    public List<Item_Entity> getItemAllAvgByDate(String name) {return item_Repository.getItemAllAvgByDate(name);}
    public List<Item_Entity> getItemByBtwDateAndDate(String name, String startDate, String endDate) {return item_Repository.getItemByBtwDateAndDate(name, startDate, endDate);}
    public List<Item_Entity> getItemAvgMonth(String name) {return item_Repository.getItemAvgMonth(name);}
    public List<Item_Entity> getItemAvgYear(String name) {return item_Repository.getItemAvgYear(name);}
    public List<Item_Entity> getItemAvg3Month(String name) {return item_Repository.getItemAvg3Month(name);}
    public List<Item_Entity> getItemAvg6Month(String name) {return item_Repository.getItemAvg6Month(name);}
    public List<Item_Entity> getItemAvgByKind(String name) {return item_Repository.getItemAvgByKind(name);}

}
=======
package com.service.yis.service;

import com.service.yis.domain.item.Item_Entity;
import com.service.yis.domain.item.Item_Repository;
import com.service.yis.domain.item.Item_Entity;
import com.service.yis.domain.item.Item_Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Data_Center_Service {
    @Autowired
    private Item_Repository item_Repository;

    public List<Item_Entity> getItem() {
        return item_Repository.getItem();
    }

    public List<Item_Entity> getItemAvgByDate(String name) {
        return item_Repository.getItemAvgByDate(name);
    }

    public List<Item_Entity> getItemAvgByDateMarket(String name, String date) {
        return item_Repository.getItemAvgByDateMarket(name, date);
    }

    public List<Item_Entity> getItemAllAvgByDate(String name) {
        return item_Repository.getItemAllAvgByDate(name);
    }

    public List<Item_Entity> getItemByBtwDateAndDate(String name, String startDate, String endDate) {
        return item_Repository.getItemByBtwDateAndDate(name, startDate, endDate);
    }

    public List<Item_Entity> getItemAvgMonth(String name) {
        return item_Repository.getItemAvgMonth(name);
    }

    public List<Item_Entity> getItemAvgYear(String name) {
        return item_Repository.getItemAvgYear(name);
    }

    public List<Item_Entity> getItemAvg3Month(String name) {
        return item_Repository.getItemAvg3Month(name);
    }

    public List<Item_Entity> getItemAvg6Month(String name) {
        return item_Repository.getItemAvg6Month(name);
    }

    public List<Item_Entity> getItemAvgByKind(String name) {
        return item_Repository.getItemAvgByKind(name);
    }

}
>>>>>>> e8e155d4ba798d63e8976dbd8eefda5e83cf6199
