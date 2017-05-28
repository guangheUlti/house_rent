package org.guangsoft.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import org.guangsoft.pojo.TbParameter;
import org.guangsoft.pojo.TbParameterExample;

public interface TbParameterMapper {
    int countByExample(TbParameterExample example);

    int deleteByExample(TbParameterExample example);

    int deleteByPrimaryKey(Long id);

    int insert(TbParameter record);

    int insertSelective(TbParameter record);

    List<TbParameter> selectByExample(TbParameterExample example);

    TbParameter selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") TbParameter record, @Param("example") TbParameterExample example);

    int updateByExample(@Param("record") TbParameter record, @Param("example") TbParameterExample example);

    int updateByPrimaryKeySelective(TbParameter record);

    int updateByPrimaryKey(TbParameter record);
}