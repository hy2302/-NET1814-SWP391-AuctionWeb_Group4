/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utils;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.SQLException;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

/**
 *
 * @author ADMIN
 */
public class DBhelper implements Serializable {
   public static Connection getConnection()
            throws Exception, SQLException {

        Context currentcontext = new InitialContext();
        Context tomcatContext = (Context) currentcontext.lookup("java:comp/env");
        DataSource ds = (DataSource) tomcatContext.lookup("DBCon");
        Connection con = ds.getConnection();
        return con;

    }
}
