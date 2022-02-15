package com.yuhanggis.servlet;

import com.yuhanggis.dal.UniversityDAO;
import com.yuhanggis.model.University;
import net.sf.json.JSONArray;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@WebServlet("/UpdateInfo")
public class UpdateInfoServlet extends HttpServlet {
    private final UniversityDAO universityDAO = new UniversityDAO();
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html;charset=UTF-8");
        PrintWriter pw = resp.getWriter();
        Enumeration<String> names = req.getParameterNames();
        String id = null;
        Map<String,String> map = new HashMap<>();
        while (names.hasMoreElements()){
            System.out.println("收到如下数据:");
            String key = names.nextElement();
            String value = req.getParameter(key);
            if ("id".equals(key)){
                id = value;
            }else {
                map.put(key,value);
            }
            System.out.println(key+":"+value);
        }
        if (universityDAO.update(id, map)){
            pw.println("成功");
        };

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPost(req, resp);
    }
}
