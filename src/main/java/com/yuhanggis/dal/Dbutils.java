package com.yuhanggis.dal;

import java.sql.*;

public class Dbutils {
    protected Connection conn = null;
    protected PreparedStatement pstmt = null;
    protected ResultSet rs = null;

    public Connection getConnection(){
        try{
            String url = "jdbc:postgresql://localhost:5432/yuhanggis_db";
            // 数据库用户名
            String user = "postgres";
            // 数据库密码
            String password = "postgres";
            // 1. 加载Driver类，Driver类对象将自动被注册到DriverManager类中
            Class.forName("org.postgresql.Driver");
            conn = DriverManager.getConnection(url,user,password);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return conn;
    }
    public void closeAll(Connection connection,PreparedStatement pstmt,ResultSet rs){
        try {
            if (rs != null) {
                rs.close();
            }
            if (pstmt != null) {
                pstmt.close();
            }
            if (conn != null) {
                conn.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    /**
     * 增删改操作
     *
     * @param sql
     * @param params
     * @return
     */
    public int executeUpdate(String sql,Object[] params){
        this.getConnection();
        int result = 0;
        try{
            pstmt = conn.prepareStatement(sql);
            if (null != params) {
                for ( int i = 0;i < params.length;i++ ){
                    pstmt.setObject(i+1, params[i]);//占位符是从1开始的
                }
            }
            result = pstmt.executeUpdate();//放回更新语句受影响的函数
        }catch(SQLException e){
            e.printStackTrace();;
        }finally{
            this.closeAll(conn, pstmt, null);
        }
        return result;
    }

    public ResultSet executeQuery(String sql, Object[] params) {
        this.getConnection();
        try {
            //3、创建prepareStatement对象
            pstmt = conn.prepareStatement(sql);//查询还是更新都是使用preparestatement，但是进一步的query和update不同
            //4、为占位符赋值
            if (null != params) {
                for (int i = 0; i < params.length; i++) {
                    pstmt.setObject(i + 1, params[i]);
                }
            }
            //5、调用方法：执行sql语句
            rs = pstmt.executeQuery();//该方法的返回值是ResultSet，用于保存查询的结果集。
        } catch (SQLException e) {
            e.printStackTrace();
        }
        //后面具体的查询方法还需要用到rs ,所以此处最后不能关闭数据流
        return rs;
    }

    public Connection getConn() {
        return conn;
    }

    public void setConn(Connection conn) {
        this.conn = conn;
    }

    public PreparedStatement getPstmt() {
        return pstmt;
    }

    public void setPstmt(PreparedStatement pstmt) {
        this.pstmt = pstmt;
    }

    public ResultSet getRs() {
        return rs;
    }

    public void setRs(ResultSet rs) {
        this.rs = rs;
    }
}

