package com.journaldev.spring.controller;

import com.journaldev.spring.controller.domain.Category;
import com.journaldev.spring.controller.domain.MenuItem;
import com.mongodb.DB;
import com.mongodb.MongoClient;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Iterator;
import java.util.List;

/**
 * Created by Gabor_Fekete on 5/23/2017.
 */
public class ReadExcelDemoHttp
{
    private static final XlsRowMapper<Row, MenuItem> ROW_MAPPER = new MenuItemRowMapper();
    private static final List<Category> CATEGORIES = new ArrayList<Category>();

    public static void main(String[] args)
    {
        Category currentCategory = null;
        try
        {
            MongoClient mongoClient = new MongoClient( "gaben.gleeze.com" , 27017 );
            DB db = mongoClient.getDB("wisequeue");

            FileInputStream file = new FileInputStream(new File("c:\\Users\\Gabor_Fekete\\follower\\Follower\\POC\\etlap.xlsx"));

            //Create Workbook instance holding reference to .xlsx file
            XSSFWorkbook workbook = new XSSFWorkbook(file);

            //Get first/desired sheet from the workbook
            XSSFSheet sheet = workbook.getSheetAt(0);

            //Iterate through each rows one by one
            Iterator<Row> rowIterator = sheet.iterator();
            int i = 0;
            while (rowIterator.hasNext())
            {
                if(i++ == 0) {
                    continue;
                }
                Row row = rowIterator.next();
                MenuItem menuItem = ROW_MAPPER.parse(row);
                if(menuItem.isCategory()) {
                    currentCategory = Category.newInstance(menuItem.getName());
                    CATEGORIES.add(currentCategory);
                } else {
                    currentCategory.addItem(menuItem);
                }
            }
            new MenuProcessor().process(CATEGORIES);

            file.close();
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
    }
}