package com.journaldev.spring.controller;

/**
 * Created by Gabor_Fekete on 5/24/2017.
 */

import com.journaldev.spring.controller.domain.MenuItem;
import org.apache.poi.ss.usermodel.Row;

public interface XlsRowMapper<T extends Row, K extends MenuItem> {

    public K parse(T row);

}
