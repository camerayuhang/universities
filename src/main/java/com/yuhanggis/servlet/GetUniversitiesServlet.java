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
import java.util.*;

@WebServlet("/GetUniversities")
public class GetUniversitiesServlet extends HttpServlet {
    private final UniversityDAO universityDAO = new UniversityDAO();
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html;charset=UTF-8");
        String name = req.getParameter("name");
        String city = req.getParameter("city");
        String department = req.getParameter("department");
        String type = req.getParameter("type");
        String level = req.getParameter("level");
        String[] publicsch = req.getParameterValues("public");
        String privatesch = req.getParameter("private");
        List<University> universities = universityDAO.findUniversitiesByCon(name,city,department,type,level,publicsch,privatesch);
        JSONArray universitiesJson = JSONArray.fromObject(universities);
        PrintWriter pw = resp.getWriter();
        pw.println(universitiesJson);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPost(req, resp);
    }
}
