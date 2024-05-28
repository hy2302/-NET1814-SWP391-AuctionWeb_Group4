/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package user;

/**
 *
 * @author ADMIN
 */
public class userError {
    
    private String user_id_error;
    private String role_id_error;
    private String user_name_error;
    private String password_error;
    private String user_email_error;
    private String contact_number_error;
    private String user_address_error;
    
    public userError(){}

    public userError(String user_id_error, String role_id_error, String user_name_error, String password_error, String user_email_error, String contact_number_error, String user_address_error) {
        this.user_id_error = user_id_error;
        this.role_id_error = role_id_error;
        this.user_name_error = user_name_error;
        this.password_error = password_error;
        this.user_email_error = user_email_error;
        this.contact_number_error = contact_number_error;
        this.user_address_error = user_address_error;
    }

    public String getUser_id_error() {
        return user_id_error;
    }

    public void setUser_id_error(String user_id_error) {
        this.user_id_error = user_id_error;
    }

    public String getRole_id_error() {
        return role_id_error;
    }

    public void setRole_id_error(String role_id_error) {
        this.role_id_error = role_id_error;
    }

    public String getUser_name_error() {
        return user_name_error;
    }

    public void setUser_name_error(String user_name_error) {
        this.user_name_error = user_name_error;
    }

    public String getPassword_error() {
        return password_error;
    }

    public void setPassword_error(String password_error) {
        this.password_error = password_error;
    }

    public String getUser_email_error() {
        return user_email_error;
    }

    public void setUser_email_error(String user_email_error) {
        this.user_email_error = user_email_error;
    }

    public String getContact_number_error() {
        return contact_number_error;
    }

    public void setContact_number_error(String contact_number_error) {
        this.contact_number_error = contact_number_error;
    }

    public String getUser_address_error() {
        return user_address_error;
    }

    public void setUser_address_error(String user_address_error) {
        this.user_address_error = user_address_error;
    }

   
}
