<%--
  Created by IntelliJ IDEA.
  User: 我的世界
  Date: 2021-12-02
  Time: 15:53
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <script src="js/lib/jQuery/jquery.min.js"></script>
</head>
<body>
<input type="button" id="send" value="AJAX获取"/>
<div id="resText"></div>

<script type="text/javascript">
    $(function(){
        $("#send").click(function(){
            // var str = "test";
            // $.get("AjaxServlet", {name : str},  function(responseText, textStatus){
            //     if(textStatus == "success")
            //         $("#resText").text(responseText);
            //     if(textStatus == "error")
            //         alert("Error");
            //
            // });
            var ajaxdata = {
                name : "xiaoli",
                psd : "123"
            };
            $.ajax({
                url : "AjaxServlet",
                type : "GET",
                data : ajaxdata,
                success : function(responseText, textStatus){
                    $("#resText").text(responseText);
                },
                error : function(){
                    alert("error");
                }
            });
        });
    });
</script>
</body>
</html>
