//import com.jfinal.plugin.activerecord.Config;
//import com.jfinal.plugin.activerecord.DbKit;
//import com.jfinal.plugin.activerecord.Page;
//import com.qsj.model.Teacher;
//import com.qsj.service.TeacherService;
//import com.qsj.utils.JfinalTestUtils;
//import com.qsj.vo.TeacherAndSubject;
//import org.junit.Test;
//
//import java.sql.Connection;
//import java.sql.SQLException;
//import java.util.List;
//
///**
// * Create by qsj computer
// *
// * @author qsj
// * @date 2021/1/13 9:10
// */
//public class selectTest extends JfinalTestUtils {
//    @Test
//    public void test(){
//        TeacherService service =new TeacherService();
//        Page<Teacher> all = service.findAll(1, 5, "王");
//        System.out.println(all.getList().toString());
//    }
//    @Test
//    public void test2(){
//        TeacherService service =new TeacherService();
//        List<TeacherAndSubject> list = service.findAll2(1, 5, "王");
//        System.out.println(list);
//    }
//}
