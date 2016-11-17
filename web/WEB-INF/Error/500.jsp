<%-- 
    Document   : newjsp
    Created on : 17-nov-2016, 11:13:12
    Author     : Quantum
--%>

<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" isErrorPage="true" %>

<% response.setStatus(404);%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>404 error</title>
    </head>
    <button onclick="redire()"></button>
    <body onload="redire()">
        <script>
            function redire() {
                sessionStorage.setItem("errorHtml",404);
                var y = document.URL.split("/");
                window.location = y[0] + "//" + y[2] + "/" + y[3];
            }
        </script>
    </body>
</html>
