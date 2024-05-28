/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package user;

import java.sql.Connection;
import java.sql.PreparedStatement;
import util.DBhelper;

/**
 *
 * @author ADMIN
 */
public class userDAO {
     public boolean addUser(userDTO user) throws Exception {
        PreparedStatement ps = null;
        Connection con = null;
        try {
            con = DBhelper.getConnection();
            String sql = "Insert Users "
                    + " values(?,?,?,?,?,?,?)";
            ps = con.prepareStatement(sql);
            ps.setInt(1, user.getUser_id());
            ps.setInt(1, user.getRole_id());
            ps.setString(2, user.getUser_name());
            ps.setString(3, user.getPassword());
            ps.setString(3, user.getUser_email());
            ps.setString(3, user.getContact_number());
            ps.setString(3, user.getUser_address());
            return ps.executeUpdate() > 0;
        } catch (Exception ex) {
            throw ex;
        } finally {
            if (ps != null) {
                ps.close();
            }
            if (con != null) {
                con.close();
            }
        }
    }
}
