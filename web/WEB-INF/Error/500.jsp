<%-- 
    Document   : newjsp
    Created on : 17-nov-2016, 11:13:12
    Author     : Quantum
--%>

<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" isErrorPage="true" %>

<% response.setStatus(500);%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <title>500 error</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <button onclick="redire()"></button>
    <body onload="redire()">
        <script>
            function redire() {
                debugger
                sessionStorage.setItem("errorHtml",500);
                var y = document.URL.split("/");
                window.parent.location.href = y[0] + "//" + y[2] + "/" + y[3];
            }
        </script>
    </body>
</html>
