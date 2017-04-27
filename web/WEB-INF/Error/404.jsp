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
        <title>404 error</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body onload="redire()">
        <script>
            function redire() {
                debugger
                sessionStorage.setItem("errorHtml",404);
                var y = document.URL.split("/");
//                if(window.parent.location.ancestorOrigins.length!==0){
//                    for(var i=0;i<window.parent.parent.location.ancestorOrigins.length;i++){
//                         window.parent.location.href = y[0] + "//" + y[2] + "/" + y[3]
//                    }
//                    
//                }else{
                   window.parent.location.href = y[0] + "//" + y[2] + "/" + y[3]; 
//                }
                
            }
        </script>
    </body>
</html>
