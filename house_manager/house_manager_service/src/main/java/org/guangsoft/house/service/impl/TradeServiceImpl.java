package org.guangsoft.house.service.impl;
import java.util.Date;
import java.util.List;
import org.guangsoft.dto.AntdDataDto;
import org.guangsoft.dto.CommDto;
import org.guangsoft.house.service.TradeService;
import org.guangsoft.mapper.TbTradeMapper;
import org.guangsoft.pojo.TbTrade;
import org.guangsoft.pojo.TbTradeExample;
import org.guangsoft.pojo.TbTradeExample.Criteria;
import org.guangsoft.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
/**
 * House系统Service
 * 
 * @author guanghe
 */
@Service
public class TradeServiceImpl implements TradeService {
	@Autowired
	private TbTradeMapper tradeMapper;
	/**
	 * 增加交易
	 */
	@Override
	public CommDto tradeCreate(TbTrade trade) {
		// 1.数据补齐
		trade.setCreateTime(new Date());
		trade.setCloseTime(DateUtil.addDate(new Date(), 7));
		this.tradeMapper.insert(trade);
		return CommDto.ok();
	}
	/**
	 * 修改交易
	 */
	@Override
	public CommDto tradeUpdate(TbTrade trade) {
		this.tradeMapper.updateByPrimaryKey(trade);
		return CommDto.ok();
	}
	/**
	 * 删除交易
	 */
	@Override
	public CommDto tradeDelete(TbTrade trade) {
		this.tradeMapper.deleteByPrimaryKey(trade.getId());
		return CommDto.ok();
	}
	/**
	 * 根据ID查询交易
	 */
	@Override
	public CommDto getTradeById(TbTrade trade) {
		return CommDto.ok(this.tradeMapper.selectByPrimaryKey(trade.getId()));
	}
	/**
	 * 查询交易列表
	 */
	@Override
	public AntdDataDto getTradeList(int page, int rows, TbTrade trade) {
		TbTradeExample example = new TbTradeExample();
		Criteria c = example.createCriteria();
		if(trade != null && trade.getId() != null) {
			c.andIdEqualTo(trade.getId());
		}
		if(trade != null && trade.getCreateTime() != null) {
			Date dayStart = new Date(trade.getCreateTime().getTime());
			Date dayEnd = new Date(trade.getCreateTime().getTime());
			dayEnd.setHours(23);
			dayEnd.setMinutes(59);
			dayEnd.setSeconds(59);
			c.andCreateTimeBetween(dayStart,dayEnd);
		}
		PageHelper.startPage(page, rows);
		List<TbTrade> list = this.tradeMapper.selectByExample(example);
		PageInfo<TbTrade> info = new PageInfo<>(list);
		Long total = info.getTotal();
		AntdDataDto result = new AntdDataDto();
		result.setData(list);
		result.setTotal(total);
		return result;
	}
}
