<%-- 
    Document   : createuser
    Created on : Apr 25, 2024, 4:28:21 AM
    Author     : ADMIN
--%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Create User</title>
    </head>
    <body>
        
         <c:set var="msg" value="${requestScope.message}" />
         <c:if test="${msg != null}">
            ${msg}
        </c:if>
        <h1>Create User</h1>
        <form action="DispatcherServlet" method="POST">
            <c:set var="error" value="${requestScope.errordetails}" />
            User ID <br/>
            <input type="text" name="txtCreateUserId" value="" />
            <c:if test="${not empty error.usernameError}">
                <text style="color: red">${error.user_id_error}</text>
            </c:if> <br/>
            Role ID <br/>
            <input type="text" name="txtCreateoRoleId" value="" />
            <c:if test="${not empty error.usernameError}">
                <text style="color: red">${error.role_id_error}</text>
            </c:if> <br/>
            Username <br/>
            <input type="text" name="txtCreateUsername" value="" />
            <c:if test="${not empty error.passwordError}">
                <text style="color: red">${error.user_name_error}</text>
            </c:if> <br/>
            Password <br/>
            <input type="text" name="txtCreatePassword" value="" />
            <c:if test="${not empty error.passwordError}">
                <text style="color: red">${error.password_error}</text>
            </c:if> <br/>
            Email <br/>
            <input type="text" name="txtCreateMail" value="" />
            <c:if test="${not empty error.passwordError}">
                <text style="color: red">${error.user_email_error}</text>
            </c:if> <br/>
            Contact Number <br/>
            <input type="text" name="txtCreateContactNumbe" value="" />
            <c:if test="${not empty error.passwordError}">
                <text style="color: red">${error.contact_number_error}</text>
            </c:if> <br/>
            Address <br/>
            <input type="text" name="txtCreateAddress" value="" />
            <c:if test="${not empty error.fullnameError}">
                <text style="color: red">${error.user_address_error}</text>
            </c:if> <br/>
            
            
            <input type="submit" value="Create User" name="btnAction" />
            <a href="login.jsp">Back to Login</a>
        </form>
    </body>
</html>
