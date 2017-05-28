package org.guangsoft.sso.service;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.guangsoft.dto.AntdDataDto;
import org.guangsoft.dto.CommDto;
import org.guangsoft.pojo.TbUser;
public interface UserService {
	public CommDto userLogin(String username, String password,
			HttpServletRequest request, HttpServletResponse repsonse);
	public CommDto findUserByToken(String token);
	public CommDto userParamCheck(String key, String value);
	public CommDto userRegister(TbUser user);
	public CommDto userUpdate(TbUser user);
	public CommDto userDelete(TbUser user);
	public CommDto getUserById(TbUser user);
	public AntdDataDto getUserList(int page, int rows, TbUser user);
}
