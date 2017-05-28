package org.guangsoft.house.service;
import org.guangsoft.dto.AntdDataDto;
import org.guangsoft.dto.CommDto;
import org.guangsoft.pojo.TbTrade;
public interface TradeService {
	public CommDto tradeCreate(TbTrade trade);
	public CommDto tradeUpdate(TbTrade trade);
	public CommDto tradeDelete(TbTrade trade);
	public CommDto getTradeById(TbTrade trade);
	public AntdDataDto getTradeList(int page, int rows, TbTrade trade);
}
