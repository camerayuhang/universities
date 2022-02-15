package com.yuhanggis.model;

import java.math.BigDecimal;

public class University {
    private int id;
    private String name;
    private String city;
    private String department;
    private String type;
    private String level;
    private boolean topschool;
    private boolean topcourse;
    private boolean postgraduate;
    private float satisfaction;
    private BigDecimal lon;
    private BigDecimal lat;

    public University(int id,String name, String city, String department, String type, String level, boolean topschool, boolean topcourse, boolean postgraduate, float satisfaction, BigDecimal lon, BigDecimal lat) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.department = department;
        this.type = type;
        this.level = level;
        this.topschool = topschool;
        this.topcourse = topcourse;
        this.postgraduate = postgraduate;
        this.satisfaction = satisfaction;
        this.lon = lon;
        this.lat = lat;
    }

    public University() {

    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public boolean isTopschool() {
        return topschool;
    }

    public void setTopschool(boolean topschool) {
        this.topschool = topschool;
    }

    public boolean isTopcourse() {
        return topcourse;
    }

    public void setTopcourse(boolean topcourse) {
        this.topcourse = topcourse;
    }

    public boolean isPostgraduate() {
        return postgraduate;
    }

    public void setPostgraduate(boolean postgraduate) {
        this.postgraduate = postgraduate;
    }

    public float getSatisfaction() {
        return satisfaction;
    }

    public void setSatisfaction(float satisfaction) {
        this.satisfaction = satisfaction;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getLon() {
        return lon;
    }

    public void setLon(BigDecimal lon) {
        this.lon = lon;
    }

    public BigDecimal getLat() {
        return lat;
    }

    public void setLat(BigDecimal lat) {
        this.lat = lat;
    }
}
