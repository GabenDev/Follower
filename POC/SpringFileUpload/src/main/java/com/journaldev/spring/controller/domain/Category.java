package com.journaldev.spring.controller.domain;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Gabor_Fekete on 5/24/2017.
 */
public final class Category {

    private final String name;
    private final List<MenuItem> items = new ArrayList<MenuItem>();
    private final String place;
    private final String country;
    private final int order;

    static int createdItems = 0;

    private Category(final String name) {
        this.name = name;
        this.place = "59245f209791c610ca9111a8";
        this.country = "59245c0475aab10eb58875dd";
        this.order = createdItems++;
    }

    public static final Category newInstance(final String name) {
        return new Category(name);
    }

    public boolean addItem(MenuItem item) {
        return this.items.add(item);
    }


    public String getName() {
        return name;
    }

    public String getPlace() {
        return place;
    }

    public String getCountry() {
        return country;
    }

    public int getOrder() {
        return order;
    }

    public List<MenuItem> getItems() {
        return new ArrayList<MenuItem>(items);
    }

    @Override
    public String toString(){
        return getName();
    }
}
