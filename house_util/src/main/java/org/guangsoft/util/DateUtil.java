package org.guangsoft.util;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
/**
 * @ClassName: DateUtil
 * @Description: 时间的工具类
 * @author guanghe
 */
public final class DateUtil {
	public static String dateFormatStr = "yyyy-MM-dd";
	public static DateFormat dateFormat = new SimpleDateFormat(dateFormatStr);
	/**
	 * 字符串格式转日期格式
	 * @param dateStr 字符串日期
	 * @return 日期格式日期
	 */
	public static Date getDateFromStr(String dateStr) {
		try {
			return dateFormat.parse(dateStr);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;
	}
	/**
	 * 指定日期格式转换为字符串
	 * @param dateFormat 指定日期格式类型
	 * @return 日期格式日期
	 */
	public static String dateToStr(Date date, String dateFormat) {
		try {
			if(date == null) {
				return "";
			}
			SimpleDateFormat df = new SimpleDateFormat(dateFormat);
			String dateStr = df.format(date);
			return dateStr;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	/**
	 * 格式化日期为字符串
	 * @param date 日期
	 * @return 字符创格式日期
	 */
	public static String getStrFromDate(Date date) {
		return dateFormat.format(date);
	}
	/**
	 * 增减天数给日期
	 * @param date 日期
	 * @param day 增减的天数
	 * @return 处理后的日期
	 */
	public static Date addDate(Date date,long day) {
		try {
			long time = date.getTime(); // 得到指定日期的毫秒数
			day = day*24*60*60*1000; // 要加上的天数转换成毫秒数
			time += day; // 相加得到新的毫秒数
			return new Date(time); // 将毫秒数转换成日期
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}