package org.guangsoft.sso.jedisdao.impl;
import org.guangsoft.sso.jedisdao.JedisDao;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
public class JedisDaoImplPool implements JedisDao {
	private JedisPool pool;
	public JedisPool getPool() {
		return pool;
	}
	public void setPool(JedisPool pool) {
		this.pool = pool;
	}
	@Override
	public String set(String key, String value) {
		Jedis jedis = pool.getResource();
		String val = jedis.set(key, value);
		jedis.close();
		return val;
	}
	@Override
	public String get(String key) {
		Jedis jedis = pool.getResource();
		String val = jedis.get(key);
		jedis.close();
		return val;
	}
	@Override
	public Long expire(String key, int seconds) {
		Jedis jedis = pool.getResource();
		Long val = jedis.expire(key, seconds);
		jedis.close();
		return val;
	}
	@Override
	public Long ttl(String key) {
		Jedis jedis = pool.getResource();
		Long val = jedis.ttl(key);
		jedis.close();
		return val;
	}
	@Override
	public Long hset(String key, String hkey, String value) {
		Jedis jedis = pool.getResource();
		Long val = jedis.hset(key, hkey, value);
		jedis.close();
		return val;
	}
	@Override
	public String hgetI(String key, String hkey) {
		Jedis jedis = pool.getResource();
		String val = jedis.hget(key, hkey);
		jedis.close();
		return val;
	}
	@Override
	public Long del(String key) {
		Jedis jedis = pool.getResource();
		Long val = jedis.del(key);
		jedis.close();
		return val;
	}
	@Override
	public Long hdel(String key, String hkey) {
		Jedis jedis = pool.getResource();
		Long val = jedis.hdel(key, hkey);
		jedis.close();
		return val;
	}
}
