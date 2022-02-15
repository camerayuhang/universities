/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.yuhanggis.model;

/**
 *
 * @author 我的世界
 */
public class User {
    private String username;
    private String userpass;
    private int error_times;

    public User() {
    }

    public User(String username, String userpass, int error_times) {
        this.username = username;
        this.userpass = userpass;
        this.error_times = error_times;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUserpass() {
        return userpass;
    }

    public void setUserpass(String userpass) {
        this.userpass = userpass;
    }

    public int getError_times() {
        return error_times;
    }

    public void setError_times(int error_times) {
        this.error_times = error_times;
    }
    
    
}
