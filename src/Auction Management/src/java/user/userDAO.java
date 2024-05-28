/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package user;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import utils.DBhelper;

/**
 *
 * @author ADMIN
 */
public class userDAO {

    String ADD_USER = "";
    String GET_USER_BY_ID = "";

    public boolean addUser(userDTO user) throws Exception {
        PreparedStatement ps = null;
        Connection con = null;
        try {
            con = DBhelper.getConnection();
            String sql = ADD_USER;
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

    public userDTO getUserByID(int user_id)
            throws Exception {
        userDTO user = null;
        PreparedStatement ps = null;
        Connection con = null;
        ResultSet rs = null;

        boolean role;

        try {
            con = DBhelper.getConnection();
            String sql = GET_USER_BY_ID;
            ps = con.prepareStatement(sql);
            ps.setInt(1, user_id);
            rs = ps.executeQuery();
            while (rs.next()) {
                int role_id = rs.getInt(0);
                String user_name = rs.getString(1);
                String password = rs.getString(2);
                String user_email = rs.getString(3);
                String contact_number = rs.getString(4);
                String user_address = rs.getString(5);
                user = new userDTO(user_id, role_id, user_name, password, user_email, contact_number, user_address);
            }
        } catch (Exception ex) {
            throw ex;
        } finally {
            if (ps != null) {
                ps.close();
            }
            if (rs != null) {
                rs.close();
            }
            if (con != null) {
                con.close();
            }
        }
        return user;
    }
}
