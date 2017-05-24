package com.journaldev.spring.controller;

import com.journaldev.spring.controller.domain.MenuItem;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;

import java.math.BigDecimal;

/**
 * Created by Gabor_Fekete on 5/24/2017.
 */
public class MenuItemRowMapper implements XlsRowMapper {

    @Override
    public MenuItem parse(Row row) {
        MenuItem item = new MenuItem();
        if(row.getCell(0).getCellType() == Cell.CELL_TYPE_STRING)
        item.setName(row.getCell(0).getStringCellValue());

        if(row.getCell(2) != null) {
            if(row.getCell(1).getCellType() == Cell.CELL_TYPE_STRING)
                item.setDescription(row.getCell(1).getStringCellValue());

            if(row.getCell(2).getCellType() == Cell.CELL_TYPE_NUMERIC) {
                item.setPrice(BigDecimal.valueOf(row.getCell(2).getNumericCellValue()));
            }

            if(row.getCell(3).getCellType() == Cell.CELL_TYPE_STRING)
                item.setCurrency(row.getCell(3).getStringCellValue());

            if(row.getCell(4).getCellType() == Cell.CELL_TYPE_STRING)
                item.setLanguage(row.getCell(4).getStringCellValue());
        }

        return item;
    }

}
