package org.guangsoft.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import org.guangsoft.pojo.TbArea;
import org.guangsoft.pojo.TbAreaExample;

public interface TbAreaMapper {
    int countByExample(TbAreaExample example);

    int deleteByExample(TbAreaExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(TbArea record);

    int insertSelective(TbArea record);

    List<TbArea> selectByExample(TbAreaExample example);

    TbArea selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") TbArea record, @Param("example") TbAreaExample example);

    int updateByExample(@Param("record") TbArea record, @Param("example") TbAreaExample example);

    int updateByPrimaryKeySelective(TbArea record);

    int updateByPrimaryKey(TbArea record);
}