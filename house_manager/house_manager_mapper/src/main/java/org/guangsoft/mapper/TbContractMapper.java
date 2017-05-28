package org.guangsoft.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import org.guangsoft.pojo.TbContract;
import org.guangsoft.pojo.TbContractExample;

public interface TbContractMapper {
    int countByExample(TbContractExample example);

    int deleteByExample(TbContractExample example);

    int deleteByPrimaryKey(Long id);

    int insert(TbContract record);

    int insertSelective(TbContract record);

    List<TbContract> selectByExample(TbContractExample example);

    TbContract selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") TbContract record, @Param("example") TbContractExample example);

    int updateByExample(@Param("record") TbContract record, @Param("example") TbContractExample example);

    int updateByPrimaryKeySelective(TbContract record);

    int updateByPrimaryKey(TbContract record);
}