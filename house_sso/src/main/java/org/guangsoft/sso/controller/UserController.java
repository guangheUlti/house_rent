package org.guangsoft.sso.controller;
import java.io.IOException;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.guangsoft.dto.AntdDataDto;
import org.guangsoft.dto.CommDto;
import org.guangsoft.pojo.TbUser;
import org.guangsoft.sso.service.UserService;
import org.guangsoft.util.DateUtil;
import org.guangsoft.util.ExceptionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
/**
 * 用户登录服务controller
 * 
 * @author guanghe
 *
 */
@Controller
@RequestMapping("/user")
public class UserController {
	@Autowired
	private UserService userService;
	/**
	 * 用户登录接口
	 * @param username 用户名
	 * @param password 密码
	 * @param captcha 验证码
	 * @param request 
	 * @param repsonse
	 * @return 标准DTO
	 */
	@RequestMapping(value = "/login", method = { RequestMethod.POST,
			RequestMethod.GET })
	@ResponseBody
	public CommDto userLogin(String username, String password, String captcha,
			HttpServletRequest request, HttpServletResponse repsonse) {
		HttpSession session = request.getSession();
		if (!(session.getAttribute("captcha") != null && captcha != null && session
				.getAttribute("captcha").toString().equalsIgnoreCase(captcha))) {
			try {
				return this.userService.userLogin(username, password, request,
						repsonse);
			} catch (Exception e) {
				e.printStackTrace();
				return CommDto.build(500, ExceptionUtil.getStackTrace(e));
			}
		}
		return CommDto.build(500, "验证码不正确!");
	}
	/**
	 * 根据token获取用户信息
	 * @param token 用户令牌
	 * @param callback 是否jsonp
	 * @return 标准DTO
	 */
	@RequestMapping(value = "/token/{token}", method = { RequestMethod.GET,
			RequestMethod.POST })
	@ResponseBody
	public Object findUserByToken(@PathVariable String token, String callback) {
		CommDto result = this.userService.findUserByToken(token);
		// 判断是否含有jsonp
		if (!StringUtils.isBlank(callback)) {
			MappingJacksonValue mapping = new MappingJacksonValue(result);
			mapping.setJsonpFunction(callback);
			return mapping;
		}
		return result;
	}
	/**
	 * 用户注册时后台数据判重校验接口
	 * @param param 
	 * @param type
	 * @param callback
	 * @return 标准DTO
	 */
	@RequestMapping(value = "/check/{key}/{value}", method = {RequestMethod.GET,
			RequestMethod.POST})
	@ResponseBody
	public Object checkData(@PathVariable String key, @PathVariable String value,
			String callback) {
		CommDto result = null;
		// 数据校验
		if (!("username".equals(key) || "phone".equals(key) || "email".equals(key) )) {
			result = CommDto.build(400, "参数类型有误");
		} else {
			// 调用业务层做数据校验
			result = this.userService.userParamCheck(key, value);
		}
		// 判断是否使用jsonp调用方式
		if (callback != null && callback.length() > 0) {
			MappingJacksonValue mapping = new MappingJacksonValue(result);
			mapping.setJsonpFunction(callback);
			return mapping;
		}
		return result;
	}
	/**
	 * 用户注册接口
	 * @param user 用户的pojo所有属性
	 * @return 标准DTO
	 */
	@RequestMapping(value = "/register", method = { RequestMethod.POST,
			RequestMethod.GET })
	@ResponseBody
	public CommDto userRegister(TbUser user) {
		try {
			return this.userService.userRegister(user);
		} catch (Exception e) {
			e.printStackTrace();
			return CommDto.build(400, "注册失败. 请校验数据后请再提交数据！");
		}
	}
	/**
	 * 修改用户接口
	 * @param user 用户的pojo所有属性
	 * @return 标准DTO
	 */
	@RequestMapping(value = "/update", method = { RequestMethod.POST,
			RequestMethod.GET })
	@ResponseBody
	public CommDto userUpdate(TbUser user) {
		try {
			return this.userService.userUpdate(user);
		} catch (Exception e) {
			e.printStackTrace();
			return CommDto.build(400, "修改失败. 请校验数据后请再提交数据！");
		}
	}
	@RequestMapping(value = "/delete", method = { RequestMethod.POST,
			RequestMethod.GET })
	@ResponseBody
	public CommDto userDeltet(TbUser user) {
		try {
			return this.userService.userDelete(user);
		} catch (Exception e) {
			e.printStackTrace();
			return CommDto.build(400, "删除失败，请稍后重试！");
		}
	}
	/**
	 * 根据ID获取用户
	 * @param user 用户ID
	 * @return 标准DTO
	 */
	@RequestMapping(value = "/getUser", method = { RequestMethod.POST, 
			RequestMethod.GET})
	@ResponseBody
	public CommDto getUser(TbUser user) {
		try {
			return this.userService.getUserById(user);
		} catch (Exception e) {
			e.printStackTrace();
			return CommDto.build(400, "根据ID获取用户失败！");
		}
	}
	/**
	 * 获取所有用户
	 * @param user 限定条件
	 * @return antd数据DTO
	 */
	@RequestMapping(value = "/getList", method = { RequestMethod.POST,
			RequestMethod.GET })
	@ResponseBody
	public AntdDataDto getList(int pageNum, int pageSize, TbUser user) {
		return this.userService.getUserList(pageNum, pageSize, user);
	}
	/**
	 * 导出用户到Excel
	 * @param pageNum 页数
	 * @param pageSize 条目数
	 * @param user 查询条件
	 * @param response 
	 */
	@RequestMapping(value = "/exportExcel", method = { RequestMethod.POST,
			RequestMethod.GET })
	public void exportExcel(int pageNum, int pageSize, TbUser user,
			HttpServletResponse response) {
		try {
			HSSFWorkbook workBook = new HSSFWorkbook();
			HSSFSheet sheet = workBook.createSheet("用户信息");
			sheet.createFreezePane(0,1);
			HSSFCellStyle headRowStyle = workBook.createCellStyle();
			HSSFFont hssfFont = workBook.createFont();
			hssfFont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
			headRowStyle.setFont(hssfFont);
			HSSFRow row = null;
			HSSFCell cell = null;
			row = sheet.createRow(0);
			int columns = 6;
			String headName[] = {"用户名","真实姓名","年龄","身份证号","地址","电话"};
			for(int i = 0; i < columns; i++) {
				sheet.setColumnWidth(i, 6000);
				cell = row.createCell(i);
				cell.setCellStyle(headRowStyle);
				cell.setCellValue(headName[i]);
			}
			AntdDataDto data = userService.getUserList(pageNum, pageSize, user);
			List<TbUser> userList = data.getDataT();
			Iterator<TbUser> iterator = userList.iterator();
			for(int i = 1; iterator.hasNext(); i++) {
				row = sheet.createRow(i);
				TbUser u = iterator.next();
				String cellValue[] = {
					u.getUsername() == null ? "" : u.getUsername().toString(),
					u.getRealname() == null ? "" : u.getRealname().toString(),
					u.getAge() == null ? "" : u.getAge().toString(),
					u.getIdnumber() == null ? "" : u.getIdnumber().toString(),
					u.getAddress() == null ? "" : u.getAddress().toString(),
					u.getPhone() == null ? "" : u.getPhone().toString()
				};
				for(int j = 0; j < columns; j++) {
					cell = row.createCell(j);
					cell.setCellValue(cellValue[j]);
				}
			}
			String fileName = new String(String.format("用户数据%s.xls", DateUtil.dateToStr(new Date(),"yyyy-MM-dd_HHmmss")).getBytes("utf-8"),"ISO8859-1");
			response.reset();
			response.setContentType("application/vnd.ms-excel");
			response.setHeader("Content-Disposition", String.format("attachment;filename=%s",fileName));
			java.io.OutputStream outputStream = response.getOutputStream();
			workBook.write(outputStream);
			outputStream.flush();
		} catch (Exception e) {
			try {
				response.getWriter().print("导出Excel失败!");
			} catch (IOException e1) {
				e1.printStackTrace();
			}
			e.printStackTrace();
		}
	}
}
