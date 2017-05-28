package org.guangsoft.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import org.guangsoft.pojo.TbHouse;
import org.guangsoft.pojo.TbHouseExample;

public interface TbHouseMapper {
    int countByExample(TbHouseExample example);

    int deleteByExample(TbHouseExample example);

    int deleteByPrimaryKey(Long id);

    int insert(TbHouse record);

    int insertSelective(TbHouse record);

    List<TbHouse> selectByExample(TbHouseExample example);

    TbHouse selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") TbHouse record, @Param("example") TbHouseExample example);

    int updateByExample(@Param("record") TbHouse record, @Param("example") TbHouseExample example);

    int updateByPrimaryKeySelective(TbHouse record);

    int updateByPrimaryKey(TbHouse record);
}