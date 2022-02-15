/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.yuhanggis.dal;

import com.yuhanggis.model.User;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserDAO {

    Dbutils dbutils = new Dbutils();


    //根据学号查找学生信息
    public int checkByUsername(String username) {
        int rowCount = 0;
        String sql = "select count(*) from user_info where username=?";
        Object[] params = {username};
        ResultSet resultSet = dbutils.executeQuery(sql, params);
        try {
            resultSet.next();
            rowCount = resultSet.getInt(1);
        } catch (SQLException ex) {
            ex.printStackTrace();
            System.out.println("dal.UserDAO.checkByUsername()出错了");
        } finally {
            dbutils.closeAll(dbutils.conn, dbutils.pstmt, dbutils.rs);
        }
        return rowCount;
    }

    public User findUserByUsername(String username) {
        User user = new User();
        String sql = "select username,userpass,error_times from user_info where username=?";
        Object[] params = {username};
        ResultSet rs = dbutils.executeQuery(sql, params);
        try {
            if (null != rs) {
                if (rs.next()) {
                     user.setUsername(rs.getString("username"));
                     user.setUserpass(rs.getString("userpass"));
                     user.setError_times(rs.getInt("error_times"));
                }
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        } finally {
            dbutils.closeAll(dbutils.conn, dbutils.pstmt, dbutils.rs);
        }
        return user;
    }
        
    //插入一个用户
    public void insert(User user) {
        String sql = "insert into user_info(username,userpass,error_times) values(?,md5(?),?)";
        Object[] params = {user.getUsername(), user.getUserpass(), user.getError_times()};
        dbutils.executeUpdate(sql, params);
    }
    
        //根据学号，更新该生的其他属性
    public void update(User user) {
        String sql = "update user_info set error_times=? WHERE username=?";
        Object[] params = {user.getError_times(),user.getUsername()};
        dbutils.executeUpdate(sql, params);
    }
}

