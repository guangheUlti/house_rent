package org.guangsoft.house.service.impl;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.guangsoft.dto.CommDto;
import org.guangsoft.house.service.PublicService;
import org.guangsoft.mapper.TbParameterMapper;
import org.guangsoft.pojo.TbParameter;
import org.guangsoft.pojo.TbParameterExample;
import org.guangsoft.pojo.TbParameterExample.Criteria;
import org.guangsoft.util.JsonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
/**
 * 数据字典Service
 * 
 * @author guanghe
 */
@Service
public class PublicServiceImpl implements PublicService {
	@Autowired
	private TbParameterMapper parameterMapper;
	/**
	 * 根据key查询数据字典
	 */
	@Override
	public CommDto getDictionary(String key) {
		TbParameterExample example = new TbParameterExample();
		Criteria c = example.createCriteria();
		c.andPkeyEqualTo(key);
		List<TbParameter> param = this.parameterMapper.selectByExample(example);
		TbParameter p = null;
		String value = null;
		Map<String,String> map = new HashMap<>();
		if(param != null && param.size() >0){
			p = param.get(0);
			value = p.getValue();
			map = JsonUtil.jsonToPojo(value, map.getClass());
		}
		return CommDto.ok(map);
	}
}

