$(function () {
    let action = $(".nav-action")
    let login = $("#login");
    let logout = $("#logout");
    let model = $("#model");
    let loginform =$("#ol-login-form");
    let username = $('#username');
    let userpass = $('#userpass');
    let userlogin = $("#user-login");
    let usersignup = $("#user-signup");
    let closer = $("#login-closer");
    let tip = loginform.find(".tip");

    initLogin();
    login.on("click",function () {
        $("#model").fadeIn();
        tip.css("visibility","hidden");

    })
    logout.on("click",function () {
        delCookie("username");
        loginStatus('');
    })
    userlogin.on("click",function () {
        if (isLogin()){
            $.ajax({
                url:"../logincheck",
                data:loginform.serialize(),
                type:"POST",
                success: function (message, textStatus) {
                    handleLogin(message);
                },
                error: function () {
                }
            })
        }

        return false
    })
    usersignup.on("click",function () {
        if (isLogin()) {
            $.ajax({
                url:"../register",
                data:loginform.serialize(),
                type:"POST",
                success: function (message, textStatus) {
                    showTip(message);
                    loginform.find("input").val('');
                },
                error: function () {
                }
            })
        }
        return false
    })
    closer.on(("click"),function () {
        model.hide();
        closer.trigger('blur');
    })

    function showTip(message) {
        tip.css("visibility","visible")
        console.log(message)
        console.log(typeof message)
        if (message === "success") {
            tip.css("color","#30e391")
            .text('注册成功');
        }else {
            tip.css("color","#f32605")
            .text(message);
        }

    }

    function handleLogin(message) {
        if (message.indexOf("success") === -1) {
            showTip(message)
        }else {
            loginStatus(getCookie("username"));
            closer.trigger("click");
        }
    }
    function isLogin() {
        if (username.val() === '' || userpass.val() === ''){
            showTip("账号密码不能为空");
            return false
        }else {
            return true;
        }
    }
    function loginStatus(name) {
        if (name === '') {
            action.find("#usernamestr").text(name);
            action.find("span").parent("li").hide();
            logout.parent().hide();
            login.parent().show();
        }
        else {
            action.find("#usernamestr").text('欢迎：'+decodeURIComponent(name));
            action.find("span").parent("li").show();
            logout.parent().show();
            login.parent().hide();

        }

    }
    function initLogin() {
        let username = getCookie("username");
        loginStatus(username);
    }
    function getCookie(name) {
        let strcookie = document.cookie;
        let cookiesArr;
        if ( strcookie && strcookie !== '') {
            cookiesArr = strcookie.split(';');
            for (let i = 0; i < cookiesArr.length; i++) {
                let cookieArr = cookiesArr[i].split('=');
                if (name.trim() === cookieArr[0].trim()){
                    return cookieArr[1].trim();
                }
            }
        }
        return '';
    }

    function delCookie(name) {
        let exp = new Date();
        exp.setTime(exp.getTime() - 1);
        let val = getCookie(name);
        document.cookie = `${name}=${val}; expires=${exp.toUTCString()}; path=/highschoolwebgis_war_exploded`;
    }
})