package com.journaldev.spring.controller.domain;

import org.springframework.web.bind.annotation.ResponseBody;

import java.math.BigDecimal;

/**
 * Created by Gabor_Fekete on 5/24/2017.
 */
@ResponseBody
public class MenuItem {

    private String name;
    private String description;
    private BigDecimal price;
    private String currency;
    private String language;

    public boolean isCategory() {
        return price == null;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    @Override
    public String toString(){
        return getName() + " - " + getPrice() + " " + getCurrency() + " ... " + getDescription();
    }
}
