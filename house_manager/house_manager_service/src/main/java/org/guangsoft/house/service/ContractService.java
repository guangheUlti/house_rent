package org.guangsoft.house.service;
import org.guangsoft.dto.AntdDataDto;
import org.guangsoft.dto.CommDto;
import org.guangsoft.pojo.TbContract;
public interface ContractService {
	public CommDto contractCreate(TbContract contract);
	public CommDto contractUpdate(TbContract contract);
	public CommDto contractDelete(TbContract contract);
	public CommDto getContractById(TbContract contract);
	public AntdDataDto getContractList(int page, int rows, TbContract contract);
}
