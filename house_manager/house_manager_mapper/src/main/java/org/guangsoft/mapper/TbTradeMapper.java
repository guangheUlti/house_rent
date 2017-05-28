package org.guangsoft.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import org.guangsoft.pojo.TbTrade;
import org.guangsoft.pojo.TbTradeExample;

public interface TbTradeMapper {
    int countByExample(TbTradeExample example);

    int deleteByExample(TbTradeExample example);

    int deleteByPrimaryKey(Long id);

    int insert(TbTrade record);

    int insertSelective(TbTrade record);

    List<TbTrade> selectByExample(TbTradeExample example);

    TbTrade selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") TbTrade record, @Param("example") TbTradeExample example);

    int updateByExample(@Param("record") TbTrade record, @Param("example") TbTradeExample example);

    int updateByPrimaryKeySelective(TbTrade record);

    int updateByPrimaryKey(TbTrade record);
}