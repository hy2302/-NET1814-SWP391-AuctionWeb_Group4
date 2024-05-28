/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import user.userDAO;
import user.userDTO;
import user.userError;

/**
 *
 * @author ADMIN
 */
@WebServlet(name = "CreateUserServlet", urlPatterns = {"/CreateUserServlet"})
public class CreateUserServlet extends HttpServlet {

    private final String CREATE_USER_PAGE = "createuser.jsp";

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        int user_id = Integer.parseInt(request.getParameter("txtCreateUserId"));
        int role_id = Integer.parseInt(request.getParameter("txtCreateoRoleId"));
        String user_name = request.getParameter("txtCreateUsername");
        String password = request.getParameter("txtCreatePassword");
        String user_email = request.getParameter("txtCreateMail");
        String contact_number = request.getParameter("txtCreateContactNumber");
        String user_address = request.getParameter("txtCreateAddress");

        boolean isError = false;
        String msg = null;
        String url = CREATE_USER_PAGE;
        PrintWriter out = response.getWriter();
        try {
            
            userDAO dao = new userDAO();
            userError error = new userError();

            if (user_id < 0) {
                error.setUser_id_error("The User ID invalid");
                isError = true;
            }
            if (dao.getUserByID(user_id) != null) {
                error.setUser_id_error("The User ID invalid");
                isError = true;
            }
            if (role_id < 0) {
                error.setRole_id_error("The Role ID invalid");
                isError = true;
            }
            if (user_name.matches("(.){3,50}") == false) {
                error.setUser_name_error("The Username must be 3 to 50 characters");
                isError = true;
            }
            if (password.matches("(.){3,50}") == false) {
                error.setPassword_error("The Password must be 3 to 50 characters");
                isError = true;
            }
            if (user_email.matches("(.){3,50}") == false) {
                error.setUser_email_error("The Email must be 3 to 50 characters");
                isError = true;
            }
            if (contact_number.matches("(.){3,50}") == false) {
                error.setContact_number_error("The Contact Number must be 3 to 50 characters");
                isError = true;
            }
            if (user_address.matches("(.){3,50}") == false) {
                error.setUser_address_error("The Address must be 3 to 50 characters");
                isError = true;
            }
            


            if (!isError) {

                userDTO user = new userDTO(user_id, role_id, user_name, password, user_email, contact_number, user_address);
                if (dao.addUser(user) == true) {
                    msg = "<b style='color: green'> User has been created successfully</b>";
                } else {
                    msg = "<b style='color: red'> Something went wrong</b>";
                }
            } else {
                request.setAttribute("errordetails", error);
            }
            if (isError) {
                url = "createuser.jsp";
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {

            request.setAttribute("message", msg);
            RequestDispatcher rd = request.getRequestDispatcher(url);
            rd.forward(request, response);
            out.close();
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
