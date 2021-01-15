package com.qsj.utils;

import com.jfinal.kit.PathKit;
import com.jfinal.kit.Prop;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.dialect.MysqlDialect;
import com.jfinal.plugin.activerecord.generator.Generator;
import com.jfinal.plugin.c3p0.C3p0Plugin;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

/**
 * Jfinal BaseBean Dao 自动生成
 * @author JamesCho
 *
 */
public class GeneratorBean {
	//base model 所使用的包名
	private static String baseModelPackageName = "com.qsj.model.pojo";
	//base model 文件保存路径
	private static String baseModelOutputDir = "src/main/java/com/qsj/model/pojo";
	//model 所使用的包名 (MappingKit 默认使用的包名)
	private static String modelPackageName = "com.qsj.model";
	//model 文件保存路径 (MappingKit 与 DataDictionary 文件默认保存路径)
	private static String modelOutputDir = "src/main/java/com/qsj/model";

	private static String[] arrayExcludeTables = null;					
	
	//要生成ModeCode的表
	private static String[] arrayIncludeTables = "admin_details".split(",");
	
	public static DataSource getDataSource() {
		Prop p = PropKit.use("config.properties");
		C3p0Plugin c3p0Plugin = new C3p0Plugin(p.get("jdbcUrl"), p.get("user"), p.get("password"));
		c3p0Plugin.start();
		return c3p0Plugin.getDataSource();
	}
	
	public static void main(String[] args) {
		List<String> includeTablesList = new ArrayList<String>();
		for (int i = 0; i < arrayIncludeTables.length; i++) {
			includeTablesList.add(arrayIncludeTables[i]);
		}
		//获取要过滤的表
		List<String> excludeTableList = getExcludeTableList(includeTablesList);
		if(excludeTableList!=null){
			arrayExcludeTables = new String[excludeTableList.size()];
			for(int i=0;i<excludeTableList.size();i++){
				arrayExcludeTables[i] = excludeTableList.get(i);
			}
		}
		//生成未过滤表格的ModeCode
		createTableModelCode(arrayExcludeTables);
	}
	
	
	
	/**
	 * 获取数据库所有表
	 * @return
	 */
	private  static List<String> getExcludeTableList(List<String> includeTablesList){
		List<String> tableList = new ArrayList<String>();
		DataSource dataSource = getDataSource();
		Connection conn;
		String sql ="SELECT table_name FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='crm'";
		try {
			conn = dataSource.getConnection();
			Statement stm = conn.createStatement();
			ResultSet rs = stm.executeQuery(sql);
			if(rs!=null){
				while(rs.next()){
					//记录将includeTables之外的表
					if(!includeTablesList.contains(rs.getString("table_name"))){
						tableList.add(rs.getString("table_name"));
					}
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return tableList;
	}
	
	/**
	 * 生成指定表的ModelCode
	 */
	private static void createTableModelCode(String[] excludeTables){
		
		// 创建生成器
		Generator gernerator = new Generator(getDataSource(), baseModelPackageName, baseModelOutputDir, modelPackageName, modelOutputDir);
		
		// 设置数据库方言
		gernerator.setDialect(new MysqlDialect());
		
		// 添加不需要生成的表名
		gernerator.addExcludedTable(excludeTables);
		
		// 设置是否在 Model 中生成 dao 对象
		gernerator.setGenerateDaoInModel(true);
		
		// 设置是否生成字典文件
		gernerator.setGenerateDataDictionary(false);
		
		// 设置需要被移除的表名前缀用于生成modelName。例如表名 "osc_user"，移除前缀 "osc_"后生成的model名为 "User"而非 OscUser
//		gernerator.setRemovedTableNamePrefixes("t_");
		// 生成
		gernerator.generate();
	}
}




