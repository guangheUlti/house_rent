package org.guangsoft.house.controller;
import org.guangsoft.dto.CommDto;
import org.guangsoft.house.service.PublicService;
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
	@RequestMapping(value = "/getDictionary/{key}", method = { RequestMethod.GET,
			RequestMethod.POST })
	@ResponseBody
	public CommDto getDictionary(@PathVariable String key) {
		return publicService.getDictionary(key);
	}
}
