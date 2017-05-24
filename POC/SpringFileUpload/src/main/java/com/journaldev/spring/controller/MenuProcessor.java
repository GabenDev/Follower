package com.journaldev.spring.controller;

import com.journaldev.spring.controller.domain.Category;
import com.journaldev.spring.controller.domain.MenuItem;
import org.springframework.http.*;
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
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
//            headers.set("Authorization", "Basic " + "xxxxxxxxxxxx");
            HttpEntity<Category> entity = new HttpEntity<Category>(category, headers);

            System.out.println(entity.toString());

            // send request and parse result
            ResponseEntity<String> response = restTemplate
                    .exchange("http://10.0.12.197:8000/api/menu/category/59245f209791c610ca9111a8", HttpMethod.POST, entity, String.class);

//            for(MenuItem menuItem : category.getItems()) {
//                System.out.println("\t" + menuItem);
//            }
        }
    }
}
