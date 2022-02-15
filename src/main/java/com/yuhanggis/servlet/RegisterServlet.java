/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.yuhanggis.servlet;

import com.yuhanggis.dal.UserDAO;
import com.yuhanggis.model.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/register")
public class RegisterServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html;charset=UTF-8");
        String username = req.getParameter("username");
        String userpass = req.getParameter("userpass");
        UserDAO userDAO = new UserDAO();
        int rowCount = userDAO.checkByUsername(username);
        if (rowCount == 0) {
            //进行注册
            User user = new User(username,userpass,0);
            userDAO.insert(user);
            resp.getWriter().print("success");
        } else {
            resp.getWriter().print("用户已存在");
        }
    }
}
