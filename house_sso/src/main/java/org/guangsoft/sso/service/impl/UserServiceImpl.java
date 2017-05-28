package org.guangsoft.sso.service.impl;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.guangsoft.dto.AntdDataDto;
import org.guangsoft.dto.CommDto;
import org.guangsoft.mapper.TbUserMapper;
import org.guangsoft.pojo.TbUser;
import org.guangsoft.pojo.TbUserExample;
import org.guangsoft.pojo.TbUserExample.Criteria;
import org.guangsoft.sso.jedisdao.JedisDao;
import org.guangsoft.sso.service.UserService;
import org.guangsoft.util.CookieUtil;
import org.guangsoft.util.DateUtil;
import org.guangsoft.util.JsonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
/**
 * SSO系统Service
 * 
 * @author guanghe
 */
@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private TbUserMapper userMapper;
	@Autowired
	private JedisDao jedisDao;
	@Value("${REDIS_USER_SESSION_KEY}")
	private String REDIS_USER_SESSION_KEY;
	@Value("${TOKEN_TIME_OUT}")
	private int TOKEN_TIME_OUT;
	/**
	 * 用户登录服务
	 */
	@Override
	public CommDto userLogin(String username, String password,
			HttpServletRequest request, HttpServletResponse response) {
		TbUserExample example = new TbUserExample();
		Criteria c = example.createCriteria();
		c.andUsernameEqualTo(username);
		// 执行查询
		List<TbUser> list = this.userMapper.selectByExample(example);
		// 判断用户名
		if (list == null || list.size() <= 0) {
			return CommDto.build(400, "用户名不存在！");
		}
		// 判断密码
		TbUser user = list.get(0);
		if (!user.getPassword().equals(
				DigestUtils.md5DigestAsHex(password.getBytes()))) {
			return CommDto.build(400, "密码不正确！");
		}
		// 验证成功,生成token 这个token就是我们来源传统登录中的sessionID
		String token = UUID.randomUUID().toString();
		// 将生成的token作为key与user对象转换完的json格式字符串写入到redis中
		// 需要将user的密码置空
		user.setPassword(null);
		String json = JsonUtil.objectToJson(user);
		this.jedisDao.set(this.REDIS_USER_SESSION_KEY + ":" + token, json);
		this.jedisDao.expire(this.REDIS_USER_SESSION_KEY + ":" + token,
				this.TOKEN_TIME_OUT);
		CookieUtil.setCookie(request, response, "EG_TOKEN", token);
		return CommDto.ok(token);
	}
	/**
	 * 根据token查询用户
	 */
	@Override
	public CommDto findUserByToken(String token) {
		String str = this.jedisDao.get(this.REDIS_USER_SESSION_KEY + ":"
				+ token);
		// 判断token是否失效
		if (StringUtils.isBlank(str)) {
			return CommDto.build(400, "用户token已失效,请重新登录!");
		}
		// 如果用户的token没有失效，需要重置失效时间
		this.jedisDao.expire(this.REDIS_USER_SESSION_KEY + ":" + token,
				this.TOKEN_TIME_OUT);
		TbUser user = JsonUtil.jsonToPojo(str, TbUser.class);
		return CommDto.ok(user);
	}
	/**
	 * 用户注册时的数据判重校验
	 */
	@Override
	public CommDto userParamCheck(String key, String value) {
		TbUserExample example = new TbUserExample();
		Criteria c = example.createCriteria();
		// 条件的指定
		if ("username".equals(key)) { // 判断用户名是否已存在
			c.andUsernameEqualTo(value);
		} else if ( "pnone".equals("pnone")) { // 判断手机号是否已存在
			c.andPhoneEqualTo(value);
		} else { // 判断邮箱是否已存在
			c.andEmailEqualTo(value);
		}
		List<TbUser> list = this.userMapper.selectByExample(example);
		if (list == null || list.size() <= 0) { // 返回数据，true：数据可用，false：数据不可用
			return CommDto.ok(true);
		}
		return CommDto.ok(false);
	}
	/**
	 * 用户注册
	 */
	@Override
	public CommDto userRegister(TbUser user) {
		// 1.数据补齐
		user.setCreateTime(new Date());
		user.setUpdateTime(new Date());
		// 2.将密码做加密处理 我们可以使用DigestUtils spring提供的一个工具类 来做md5的加密处理
		user.setPassword(DigestUtils.md5DigestAsHex(user.getPassword()
				.getBytes()));
		this.userMapper.insert(user);
		return CommDto.ok();
	}
	/**
	 * 用户修改
	 */
	@Override
	public CommDto userUpdate(TbUser user) {
		// 1.数据补齐
		user.setUpdateTime(new Date());
		// 2.将密码做加密处理 我们可以使用DigestUtils spring提供的一个工具类 来做md5的加密处理
		user.setPassword(DigestUtils.md5DigestAsHex(user.getPassword()
				.getBytes()));
		this.userMapper.updateByPrimaryKey(user);
		return CommDto.ok();
	}
	/**
	 * 用户删除
	 */
	@Override
	public CommDto userDelete(TbUser user) {
		this.userMapper.deleteByPrimaryKey(user.getId());
		return CommDto.ok();
	}
	/**
	 * 根据ID获取用户
	 */
	@Override
	public CommDto getUserById(TbUser user) {
		return CommDto.ok(this.userMapper.selectByPrimaryKey(user.getId()));
	}
	/**
	 * 获取用户列表
	 */
	@Override
	public AntdDataDto getUserList(int page, int rows, TbUser user) {
		TbUserExample example = new TbUserExample();
		Criteria c = example.createCriteria();
		if(user != null && user.getUsername() != null) {
			c.andUsernameLike('%' + user.getUsername() + '%');
		}
		if(user != null && user.getLevel() != null) {
			c.andLevelEqualTo(user.getLevel());
		}
		if(user != null && user.getCreateTime() != null) {
			Date dayStart = new Date(user.getCreateTime().getTime());
			Date dayEnd = new Date(user.getCreateTime().getTime());
			dayEnd.setHours(23);
			dayEnd.setMinutes(59);
			dayEnd.setSeconds(59);
			c.andCreateTimeBetween(dayStart,dayEnd);
		}
		PageHelper.startPage(page, rows);
		List<TbUser> list = this.userMapper.selectByExample(example);
		PageInfo<TbUser> info = new PageInfo<>(list);
		Long total = info.getTotal();
		AntdDataDto result = new AntdDataDto();
		result.setData(list);
		result.setTotal(total);
		return result;
	}
}
