package com.service.yis.config;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class DatabaseConfig {
    @Bean
    public DataSource dataSource(){
        DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
        dataSourceBuilder.driverClassName("com.mysql.cj.jdbc.Driver");

        /*azure*/
        dataSourceBuilder.username("yis");
        dataSourceBuilder.password("1234");
        dataSourceBuilder.url("jdbc:mysql://20.214.186.164:3306/yis?useSSL=false&serverTimezone=UTC");


        /* 로컬 */
        //dataSourceBuilder.username("yis");
        //dataSourceBuilder.password("1234");
        //dataSourceBuilder.url("jdbc:mysql://localhost:3306/yis?useSSL=false&serverTimezone=UTC");
        

        return dataSourceBuilder.build();
    }
}
