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
public class userDTO {
    private int user_id;
    private int role_id;
    private String user_name;
    private String password;
    private String user_email;
    private String contact_number;
    private String user_address;

    public userDTO(int user_id, int role_id, String user_name, String password, String user_email, String contact_number, String user_address) {
        this.user_id = user_id;
        this.role_id = role_id;
        this.user_name = user_name;
        this.password = password;
        this.user_email = user_email;
        this.contact_number = contact_number;
        this.user_address = user_address;
    }
    
    public userDTO(){}

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public int getRole_id() {
        return role_id;
    }

    public void setRole_id(int role_id) {
        this.role_id = role_id;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUser_email() {
        return user_email;
    }

    public void setUser_email(String user_email) {
        this.user_email = user_email;
    }

    public String getContact_number() {
        return contact_number;
    }

    public void setContact_number(String contact_number) {
        this.contact_number = contact_number;
    }

    public String getUser_address() {
        return user_address;
    }

    public void setUser_address(String user_address) {
        this.user_address = user_address;
    }
    
    
}
