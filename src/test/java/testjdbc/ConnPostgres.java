package testjdbc;

import com.yuhanggis.dal.UniversityDAO;
import com.yuhanggis.model.University;

import java.util.List;

public class ConnPostgres {
    public static void main(String[] args) {
        UniversityDAO capitalDAO = new UniversityDAO();
        List<University> universities = capitalDAO.findAllUniversities();
        for (int i = 0; i < universities.size(); i++) {
            System.out.println("地名："+ universities.get(i).getName() + " 经度："+ universities.get(i).getLon() +" 纬度："+ universities.get(i).getLat());
        }
    }
}
