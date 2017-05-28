package org.guangsoft.sso.controller;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.guangsoft.dto.CommDto;
import org.guangsoft.sso.service.PublicService;
import org.guangsoft.util.CaptchaUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
/**
 * 页面跳转
 * 
 * @author Administrator
 *
 */
@Controller
@RequestMapping("/public")
public class PublicController {
	@Autowired
	private PublicService publicService;
	@RequestMapping(value = "/captcha", method = { RequestMethod.POST,
			RequestMethod.GET })
	@ResponseBody
	public void getCaptcha(HttpServletRequest request,
			HttpServletResponse response) {
		try {
			CaptchaUtil.outputCaptcha(request, response);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	@RequestMapping(value = "/getDictionary/{key}", method = { RequestMethod.GET,
			RequestMethod.POST })
	@ResponseBody
	public CommDto getDictionary(@PathVariable String key) {
		return publicService.getDictionary(key);
	}
}
