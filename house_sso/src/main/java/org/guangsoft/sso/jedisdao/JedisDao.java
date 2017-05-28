package org.guangsoft.sso.jedisdao;

public interface JedisDao
{
	/*
	 * STring jedis.set(key, value) String jeids.get()
	 */
	// Long jedis.expire(key, seconds)
	// Long l = jedis.ttl(key)
	// Long jedis.incr(key)
	// Long jedis.hset(key, field, value)
	// Stirng jedis.hget(key, field)
	// Long jedis.del(key)
	// Long jedis.hdel(key, fields)
	public String set(String key, String value);

	public String get(String key);

	public Long expire(String key, int seconds);

	public Long ttl(String key);

	public Long hset(String key, String hkey, String value);

	public String hgetI(String key, String hkey);

	public Long del(String key);

	public Long hdel(String key, String hkey);
}
