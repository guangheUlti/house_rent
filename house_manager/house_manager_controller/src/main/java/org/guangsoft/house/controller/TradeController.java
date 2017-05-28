package org.guangsoft.house.controller;
import org.guangsoft.dto.AntdDataDto;
import org.guangsoft.dto.CommDto;
import org.guangsoft.house.service.TradeService;
import org.guangsoft.pojo.TbTrade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
/**
 * 交易登录服务controller
 * 
 * @author guanghe
 *
 */
@Controller
@RequestMapping("/trade")
public class TradeController {
	@Autowired
	private TradeService tradeService;
	/**
	 * 增加交易
	 * @param trade 交易的pojo所有属性
	 * @return 标准DTO
	 */
	@RequestMapping(value = "/create", method = { RequestMethod.POST,
			RequestMethod.GET })
	@ResponseBody
	public CommDto tradeRegister(TbTrade trade) {
		try {
			return this.tradeService.tradeCreate(trade);
		} catch (Exception e) {
			e.printStackTrace();
			return CommDto.build(400, "注册失败. 请校验数据后请再提交数据！");
		}
	}
	/**
	 * 修改交易
	 * @param trade 交易的pojo所有属性
	 * @return 标准DTO
	 */
	@RequestMapping(value = "/update", method = { RequestMethod.POST,
			RequestMethod.GET })
	@ResponseBody
	public CommDto tradeUpdate(TbTrade trade) {
		try {
			return this.tradeService.tradeUpdate(trade);
		} catch (Exception e) {
			e.printStackTrace();
			return CommDto.build(400, "修改失败. 请校验数据后请再提交数据！");
		}
	}
	/**
	 * 删除交易
	 * @param trade
	 * @return
	 */
	@RequestMapping(value = "/delete", method = { RequestMethod.POST,
			RequestMethod.GET })
	@ResponseBody
	public CommDto tradeDeltet(TbTrade trade) {
		try {
			return this.tradeService.tradeDelete(trade);
		} catch (Exception e) {
			e.printStackTrace();
			return CommDto.build(400, "删除失败，请稍后重试！");
		}
	}
	/**
	 * 根据ID获取交易
	 * @param trade
	 * @return
	 */
	@RequestMapping(value = "/getTrade", method = { RequestMethod.POST,
			RequestMethod.GET })
	@ResponseBody
	public CommDto getTrade(TbTrade trade) {
		try {
			return this.tradeService.getTradeById(trade);
		} catch (Exception e) {
			e.printStackTrace();
			return CommDto.build(400, "删除失败，请稍后重试！");
		}
	}
	
	/**
	 * 获取交易列表
	 * @param trade 限定条件
	 * @return antd数据DTO
	 */
	@RequestMapping(value = "/getList", method = { RequestMethod.POST,
			RequestMethod.GET })
	@ResponseBody
	public AntdDataDto getList(int pageNum, int pageSize, TbTrade trade) {
		return this.tradeService.getTradeList(pageNum, pageSize, trade);
	}
}
