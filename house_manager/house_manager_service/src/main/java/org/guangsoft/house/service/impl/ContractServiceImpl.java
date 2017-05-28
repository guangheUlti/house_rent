package org.guangsoft.house.service.impl;
import java.util.Date;
import java.util.List;
import org.guangsoft.dto.AntdDataDto;
import org.guangsoft.dto.CommDto;
import org.guangsoft.house.service.ContractService;
import org.guangsoft.mapper.TbContractMapper;
import org.guangsoft.pojo.TbContract;
import org.guangsoft.pojo.TbContractExample;
import org.guangsoft.pojo.TbContractExample.Criteria;
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
public class ContractServiceImpl implements ContractService {
	@Autowired
	private TbContractMapper contractMapper;
	/**
	 * 增加合约
	 */
	@Override
	public CommDto contractCreate(TbContract contract) {
		// 1.数据补齐
		contract.setCreateTime(new Date());
		contract.setUpdateTime(new Date());
		this.contractMapper.insert(contract);
		return CommDto.ok();
	}
	/**
	 * 修改合约
	 */
	@Override
	public CommDto contractUpdate(TbContract contract) {
		contract.setUpdateTime(new Date());
		this.contractMapper.updateByPrimaryKey(contract);
		return CommDto.ok();
	}
	/**
	 * 删除合约
	 */
	@Override
	public CommDto contractDelete(TbContract contract) {
		this.contractMapper.deleteByPrimaryKey(contract.getId());
		return CommDto.ok();
	}
	/**
	 * 根据ID查询合约
	 */
	@Override
	public CommDto getContractById(TbContract contract) {
		return CommDto.ok(this.contractMapper.selectByPrimaryKey(contract.getId()));
	}
	/**
	 * 查询合约列表
	 */
	@Override
	public AntdDataDto getContractList(int page, int rows, TbContract contract) {
		TbContractExample example = new TbContractExample();
		Criteria c = example.createCriteria();
		if(contract != null && contract.getId() != null) {
			c.andIdEqualTo(contract.getId());
		}
		if(contract != null && contract.getMember() != null) {
			c.andMemberEqualTo(contract.getMember());
		}
		if(contract != null && contract.getRival() != null) {
			c.andRivalEqualTo(contract.getRival());
		}
		if(contract != null && contract.getHouse() != null) {
			c.andHouseEqualTo(contract.getHouse());
		}
		if(contract != null && contract.getCreateTime() != null) {
			Date dayStart = new Date(contract.getCreateTime().getTime());
			Date dayEnd = new Date(contract.getCreateTime().getTime());
			dayEnd.setHours(23);
			dayEnd.setMinutes(59);
			dayEnd.setSeconds(59);
			c.andCreateTimeBetween(dayStart,dayEnd);
		}
		PageHelper.startPage(page, rows);
		List<TbContract> list = this.contractMapper.selectByExample(example);
		PageInfo<TbContract> info = new PageInfo<>(list);
		Long total = info.getTotal();
		AntdDataDto result = new AntdDataDto();
		result.setData(list);
		result.setTotal(total);
		return result;
	}
}
