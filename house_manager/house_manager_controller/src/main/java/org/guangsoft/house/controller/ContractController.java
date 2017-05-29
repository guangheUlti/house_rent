package org.guangsoft.house.controller;
import java.io.IOException;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import javax.servlet.http.HttpServletResponse;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.guangsoft.dto.AntdDataDto;
import org.guangsoft.dto.CommDto;
import org.guangsoft.house.service.ContractService;
import org.guangsoft.pojo.TbContract;
import org.guangsoft.util.DateUtil;
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
	/**
	 * 导出合约到Excel
	 * @param pageNum 页数
	 * @param pageSize 条目数
	 * @param user 查询条件
	 * @param response 
	 */
	@RequestMapping(value = "/exportExcel", method = { RequestMethod.POST,
			RequestMethod.GET })
	public void exportExcel(int pageNum, int pageSize, TbContract contract,
			HttpServletResponse response) {
		try {
			HSSFWorkbook workBook = new HSSFWorkbook();
			HSSFSheet sheet = workBook.createSheet("合约信息");
			sheet.createFreezePane(0,1);
			HSSFCellStyle headRowStyle = workBook.createCellStyle();
			HSSFFont hssfFont = workBook.createFont();
			hssfFont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
			headRowStyle.setFont(hssfFont);
			HSSFRow row = null;
			HSSFCell cell = null;
			row = sheet.createRow(0);
			int columns = 6;
			String headName[] = {"合约编号","合约方","合约对手方","房屋ID","创建时间"};
			for(int i = 0; i < columns; i++) {
				sheet.setColumnWidth(i, 6000);
				cell = row.createCell(i);
				cell.setCellStyle(headRowStyle);
				cell.setCellValue(headName[i]);
			}
			AntdDataDto data = contractService.getContractList(pageNum, pageSize, contract);
			List<TbContract> contractList = data.getDataT();
			Iterator<TbContract> iterator = contractList.iterator();
			for(int i = 1; iterator.hasNext(); i++) {
				row = sheet.createRow(i);
				TbContract t = iterator.next();
				String cellValue[] = {
					t.getId() == null ? "" : t.getId().toString(),
					t.getMember() == null ? "" : t.getMember().toString(),
					t.getRival() == null ? "" : t.getRival().toString(),
					t.getHouse() == null ? "" : t.getHouse().toString(),
					t.getCreateTime() == null ? "" : DateUtil.getStrFromDate(t.getCreateTime())
				};
				for(int j = 0; j < columns; j++) {
					cell = row.createCell(j);
					cell.setCellValue(cellValue[j]);
				}
			}
			String fileName = new String(String.format("合约数据%s.xls", DateUtil.dateToStr(new Date(),"yyyy-MM-dd_HHmmss")).getBytes("utf-8"),"ISO8859-1");
			response.reset();
			response.setContentType("application/vnd.ms-excel");
			response.setHeader("Content-Disposition", String.format("attachment;filename=%s",fileName));
			java.io.OutputStream outputStream = response.getOutputStream();
			workBook.write(outputStream);
			outputStream.flush();
		} catch (Exception e) {
			try {
				response.getWriter().print("导出Excel失败!");
			} catch (IOException e1) {
				e1.printStackTrace();
			}
			e.printStackTrace();
		}
	}
}
