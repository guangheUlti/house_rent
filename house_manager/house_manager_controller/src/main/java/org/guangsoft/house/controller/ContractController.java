package org.guangsoft.house.controller;
import org.guangsoft.dto.AntdDataDto;
import org.guangsoft.dto.CommDto;
import org.guangsoft.house.service.ContractService;
import org.guangsoft.pojo.TbContract;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
/**
 * 合约登录服务controller
 * 
 * @author guanghe
 *
 */
@Controller
@RequestMapping("/contract")
public class ContractController {
	@Autowired
	private ContractService contractService;
	/**
	 * 增加合约
	 * @param contract 合约的pojo所有属性
	 * @return 标准DTO
	 */
	@RequestMapping(value = "/create", method = { RequestMethod.POST,
			RequestMethod.GET })
	@ResponseBody
	public CommDto contractRegister(TbContract contract) {
		try {
			return this.contractService.contractCreate(contract);
		} catch (Exception e) {
			e.printStackTrace();
			return CommDto.build(400, "注册失败. 请校验数据后请再提交数据！");
		}
	}
	/**
	 * 修改合约
	 * @param contract 合约的pojo所有属性
	 * @return 标准DTO
	 */
	@RequestMapping(value = "/update", method = { RequestMethod.POST,
			RequestMethod.GET })
	@ResponseBody
	public CommDto contractUpdate(TbContract contract) {
		try {
			return this.contractService.contractUpdate(contract);
		} catch (Exception e) {
			e.printStackTrace();
			return CommDto.build(400, "修改失败. 请校验数据后请再提交数据！");
		}
	}
	/**
	 * 删除合约
	 * @param contract
	 * @return
	 */
	@RequestMapping(value = "/delete", method = { RequestMethod.POST,
			RequestMethod.GET })
	@ResponseBody
	public CommDto contractDeltet(TbContract contract) {
		try {
			return this.contractService.contractDelete(contract);
		} catch (Exception e) {
			e.printStackTrace();
			return CommDto.build(400, "删除失败，请稍后重试！");
		}
	}
	/**
	 * 根据ID获取合约
	 * @param contract
	 * @return
	 */
	@RequestMapping(value = "/getContract", method = { RequestMethod.POST,
			RequestMethod.GET })
	@ResponseBody
	public CommDto getContract(TbContract contract) {
		try {
			return this.contractService.getContractById(contract);
		} catch (Exception e) {
			e.printStackTrace();
			return CommDto.build(400, "删除失败，请稍后重试！");
		}
	}
	
	/**
	 * 获取合约列表
	 * @param contract 限定条件
	 * @return antd数据DTO
	 */
	@RequestMapping(value = "/getList", method = { RequestMethod.POST,
			RequestMethod.GET })
	@ResponseBody
	public AntdDataDto getList(int pageNum, int pageSize, TbContract contract) {
		return this.contractService.getContractList(pageNum, pageSize, contract);
	}
}
