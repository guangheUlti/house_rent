package org.guangsoft.dto;
/**
 * 定义antd table组件使用的数据模型
 * @author guanghe
 *
 */
import java.util.List;
public class AntdDataDto {
	private List<?> data;// 定义结果集
	private Long total; // 总条数
	public List<?> getData() {
		return data;
	}
	public void setData(List<?> data) {
		this.data = data;
	}
	public Long getTotal() {
		return total;
	}
	public void setTotal(Long total) {
		this.total = total;
	}
}
