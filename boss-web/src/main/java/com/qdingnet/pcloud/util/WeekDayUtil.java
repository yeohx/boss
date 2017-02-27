package com.qdingnet.pcloud.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;

public class WeekDayUtil {
	  public static String WeekDay(Integer day) {  
		  SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			  Calendar c = Calendar.getInstance();
			  int day_of_week = c.get(Calendar.DAY_OF_WEEK) - 1;
			  if (day_of_week == 0)
			   day_of_week = day;
			  c.add(Calendar.DATE, -day_of_week + 7);
			return  sdf.format(c.getTime()); 
			 }
}
