package com.yuhanggis.servlet;

import com.yuhanggis.dal.*;
import com.yuhanggis.model.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;


@WebServlet("/logincheck")
public class LoginCheckServlet extends HttpServlet {
    private HttpServletRequest req = null;
    private HttpServletResponse resp = null;
    UserDAO userDAO = new UserDAO();
    //保存cookie，由于中午无法正确显示，所以编码
    public void saveCookie(String name,String value,int seconds) throws UnsupportedEncodingException {
        Cookie cookie = new Cookie(URLEncoder.encode(name, "UTF-8"), URLEncoder.encode(value, "UTF-8"));
        cookie.setMaxAge(seconds);
        resp.addCookie(cookie);
    }
    //保存session，本项目无用
    public void saveSession(String name,String value){
        HttpSession session = req.getSession();
        session.setAttribute(name, value);
    }
    //密码加密
    public boolean isPassRight(String userpass,String correctPassword){
        String userpassMD5 = MD5utils.getMD5(userpass);
        if (userpassMD5.trim().equals(correctPassword.trim())){
            return true;
        }else{
            return false;
        }
    }
    //错误次数是否违法
    public boolean isErrorTimesLegal(User user){
        if (user.getError_times() < 3 ) {
            return true;
        }else{
            return false;
        }
    }

    
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.req = req;
        this.resp = resp;
        
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html;charset=UTF-8");
        String username = req.getParameter("username");
        String userpass = req.getParameter("userpass");
        System.out.println(username);
        System.out.println(userpass);
        User user = null;
        //根据输入的用户名查询密码O
        //记录返回的记录数

        int rowCount = userDAO.checkByUsername(username);
        //防御性编程：对不可能发生的情况做处理。
        if (rowCount <= 0) {
            resp.getWriter().print("用户名不存在");
            return;
        }
        if (rowCount >1) {
            resp.getWriter().print("数据出错，用户名重复");
            return;
        }
        else{
            user = userDAO.findUserByUsername(username);
            if (this.isErrorTimesLegal(user)) {
                if (this.isPassRight(userpass, user.getUserpass())) {
                        this.saveCookie("username", username, 3600*24*7);
                    resp.getWriter().print("success");
                }
                else{
                    user.setError_times(user.getError_times() + 1);
                    userDAO.update(user);
                    resp.getWriter().print("密码错误，还剩"+(3-user.getError_times())+"次");
                }
            }
            else{
                resp.getWriter().print("输错3次，无法登入");
            }
        }

    }
}


