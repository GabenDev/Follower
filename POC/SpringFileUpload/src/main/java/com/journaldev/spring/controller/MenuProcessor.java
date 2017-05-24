package com.journaldev.spring.controller;

import com.journaldev.spring.controller.domain.Category;
import com.journaldev.spring.controller.domain.MenuItem;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.client.RestTemplate;

import java.util.List;

/**
 * Created by Gabor_Fekete on 5/24/2017.
 */
public class MenuProcessor {

    RestTemplate restTemplate = new RestTemplate();

    public MenuProcessor() {
//        restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());
    }

    public void process(List<Category> categories) {
        for(Category category : categories) {
            System.out.println(category);
            for(MenuItem menuItem : category.getItems()) {
                System.out.println("\t" + menuItem);
            }
        }
    }
}
