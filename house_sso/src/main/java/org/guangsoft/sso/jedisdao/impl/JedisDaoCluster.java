package org.guangsoft.sso.jedisdao.impl;

import org.guangsoft.sso.jedisdao.JedisDao;

import redis.clients.jedis.JedisCluster;

public class JedisDaoCluster implements JedisDao
{

	private JedisCluster jedisCluster;

	public JedisCluster getJedisCluster()
	{
		return jedisCluster;
	}

	public void setJedisCluster(JedisCluster jedisCluster)
	{
		this.jedisCluster = jedisCluster;
	}

	@Override
	public String set(String key, String value)
	{

		return this.jedisCluster.set(key, value);
	}

	@Override
	public String get(String key)
	{
		// TODO Auto-generated method stub
		return this.jedisCluster.get(key);
	}

	@Override
	public Long expire(String key, int seconds)
	{
		// TODO Auto-generated method stub
		return this.jedisCluster.expire(key, seconds);
	}

	@Override
	public Long ttl(String key)
	{
		// TODO Auto-generated method stub
		return this.jedisCluster.ttl(key);
	}

	@Override
	public Long hset(String key, String hkey, String value)
	{
		// TODO Auto-generated method stub
		return this.jedisCluster.hset(key, hkey, value);
	}

	@Override
	public String hgetI(String key, String hkey)
	{
		// TODO Auto-generated method stub
		return this.jedisCluster.hget(key, hkey);
	}

	@Override
	public Long del(String key)
	{
		// TODO Auto-generated method stub
		return this.jedisCluster.del(key);
	}

	@Override
	public Long hdel(String key, String hkey)
	{
		// TODO Auto-generated method stub
		return this.jedisCluster.hdel(key, hkey);
	}

}
