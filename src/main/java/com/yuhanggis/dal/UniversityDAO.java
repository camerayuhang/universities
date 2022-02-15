package com.yuhanggis.dal;

import com.yuhanggis.model.University;

import java.math.BigDecimal;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class UniversityDAO {
    Dbutils dbutils = new Dbutils();

    public List<University> findAllUniversities() {
        String sql = "select name,city,department,type,level,topschool,topcourse,postgraduate,satisfaction,lon,lat from universities";
        Object[] params = null;
        List<University> universities = new ArrayList<>();
        ResultSet rs = dbutils.executeQuery(sql, params);
        try {
            if (null != rs) {
                while (rs.next()) {
                    University university = new University();
                    university.setName(rs.getString("name"));
                    university.setCity(rs.getString("city"));
                    university.setDepartment(rs.getString("department"));
                    university.setType(rs.getString("type"));
                    university.setLevel(rs.getString("level"));
                    university.setTopschool(rs.getBoolean("topschool"));
                    university.setTopcourse(rs.getBoolean("topcourse"));
                    university.setPostgraduate(rs.getBoolean("postgraduate"));
                    university.setSatisfaction(rs.getFloat("satisfaction"));
                    university.setLon(rs.getBigDecimal("lon"));
                    university.setLat(rs.getBigDecimal("lat"));
                    universities.add(university);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbutils.closeAll(dbutils.conn, dbutils.pstmt, dbutils.rs);
        }
        return universities;
    }
    public List<University> findUniversitiesByCon(String name,String city,String department,String type,String level,String[] publicsch,String privatesch){
        List<Object> params = new ArrayList<>();
        List<University> universities = new ArrayList<>();
        StringBuffer sql = new StringBuffer();
        sql.append("select id,name,city,department,type,level,topschool,topcourse,postgraduate,satisfaction,lon,lat from universities ");
        sql.append("where ");
        //学校名字
        if ("".equals(name)){
            name = "%";
        }else {
            name = "%"+name+"%";
        }
        sql.append("(name like ?) ");
        sql.append("and ");
        params.add(name);
        //城市
        if ("全部".equals(city)){
            city = "%";
            sql.append("(city like ?) ");
        }else {
            sql.append("(city = ?) ");
        }
        sql.append("and ");
        params.add(city);
        //部门
        if ("全部".equals(department)){
            sql.append("(department like '%') ");
        }else if("教育部".equals(department)){
            sql.append("(department = '教育部') ");
        }else if("其他部委".equals(department)){
            sql.append("(department not like '%教育%' AND department NOT like '%军委训练%') ");
        }else if("地方".equals(department)){
            sql.append("(department like '%教育%' AND department != '教育部') ");
        }else {
            sql.append("(department like '%军委训练%') ");
        }
        sql.append("and ");
        //类型
        if ("全部".equals(type)){
            type = "%";
            sql.append("(type like ?) ");
        }else {
            sql.append("(type = ?) ");
        }
        params.add(type);
        //学历层次
        sql.append("and ");
        sql.append("(level like ?) ");
        if ("全部".equals(level)){
            level = "%";
        }else if ("本科".equals(level)){
            level = level+"%";
        }else{
            level = "%"+level;
        }
        params.add(level);
        //公办
        if (null != publicsch){
            sql.append("and ");
            for (int i = 0; i < publicsch.length; i++) {
                if ("一流大学建设高校".equals(publicsch[i])){
                    sql.append("(topschool = ?) ");
                }else if ("一流学科建设高校".equals(publicsch[i])){
                    sql.append("(topcourse = ?) ");
                }else {
                    sql.append("(postgraduate = ?) ");
                }
                params.add(true);
                if (i < publicsch.length-1){
                    sql.append("and ");
                }
            }
        }
        //民办
        if (null != privatesch){
            sql.append("and ");
            if ("民办高校".equals(privatesch)){
                sql.append("(isprivate = ?) ");
            }else if ("独立学院".equals(privatesch)){
                sql.append("(isindependent = ?) ");
            }else if ("中外合作办学".equals(privatesch)){
                sql.append("(issinoforeign = ?) ");
            }else {
                sql.append("(iscowithhmt = ?) ");
            }
            params.add(true);
        }

        System.out.println(sql);
        ResultSet rs = dbutils.executeQuery(sql.toString(), params.toArray());
        try {
            if (null != rs) {
                while (rs.next()) {
                    University university = new University();
                    university.setId(rs.getInt("id"));
                    university.setName(rs.getString("name"));
                    university.setCity(rs.getString("city"));
                    university.setDepartment(rs.getString("department"));
                    university.setType(rs.getString("type"));
                    university.setLevel(rs.getString("level"));
                    university.setTopschool(rs.getBoolean("topschool"));
                    university.setTopcourse(rs.getBoolean("topcourse"));
                    university.setPostgraduate(rs.getBoolean("postgraduate"));
                    university.setSatisfaction(rs.getFloat("satisfaction"));
                    university.setLon(rs.getBigDecimal("lon"));
                    university.setLat(rs.getBigDecimal("lat"));
                    universities.add(university);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbutils.closeAll(dbutils.conn, dbutils.pstmt, dbutils.rs);
        }
        return universities;
    }

    public boolean update(String id, Map<String, String> map){
        StringBuffer sql = new StringBuffer();
        List<Object> params = new ArrayList<>();
        sql.append("update universities set ");
        Iterator<Map.Entry<String,String>> iterator = map.entrySet().iterator();
        while (iterator.hasNext()){
            Map.Entry<String, String> entry = iterator.next();
            String key = entry.getKey();
            String valuestr = entry.getValue();
            sql.append(key).append("=?");
            if ("topschool".equals(key) || "topcourse".equals(key) || "postgraduate".equals(key)){
                params.add(Boolean.valueOf(valuestr));
            }else if("lon".equals(key) || "lat".equals(key)) {
                params.add(new BigDecimal(valuestr));
            }else if ("satisfaction".equals(key)){
                params.add(Float.parseFloat(valuestr));
            }else {
                params.add(valuestr);
            }
            if (iterator.hasNext()){
                sql.append(",");
            }
        }
        sql.append(" where id=?");
        params.add(Integer.valueOf(id));
        System.out.println(sql);
        Object[] array = params.toArray();
        for (Object o : array) {
            System.out.println(o);
        }
        return dbutils.executeUpdate(sql.toString(), params.toArray()) == 1;
    }

}
