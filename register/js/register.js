//define(function(require, exports, module) {
//    "use strict";
//    var abpdata = require("abpInit");
//    var abp = abpdata.abpstart;
//    require("jquery");
$(function () {
    //点击注册
    $("body").on("tap", "#registerBtn", registerNewUser);

    //点击获取验证码  验证手机号	申请新用户
    $("body").on("tap", "#newUserGetCheck", getMobileCode);

    $('body').on('tap', '.password em', function () {
        if($(this).hasClass('biyan')){
            $(this).siblings('input').attr('type','text');
            $(this).addClass('eyes').removeClass('biyan');
        }else{
            $(this).siblings('input').attr('type','password');
            $(this).addClass('biyan').removeClass('eyes');
        }
    })
    //手机号码验证
    function checkTEL(userMobile) {
        if(!userMobile) {
            $(".newUserMobile_error").html("手机号码不能为空！");
            return false;
        }
        if(!(/^1[345678]\d{9}$/.test(userMobile))) {
            $(".newUserMobile_error").html("您输入手机号码不正确！");
            return false;
        }
        return true;
    }

    var inputArr = ['#clientName', '#newUserMobile', '#newUserMobileCode', '#newUserPsw', '#reNewUserPsw'];

    $.each(inputArr, function (index, item) {
        $(item).on('focus',function () {
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if(isAndroid){
                if(item === '#newUserMobileCode' || item === '#newUserPsw' || item === '#reNewUserPsw'){
                    var target = this;
                    // 使用定时器是为了让输入框上滑时更加自然
                    setTimeout(function(){
                        target.scrollIntoView(true);
                        $('body').css('overflow-y','scroll')
                    },100);
                }
            }


        })
        $(item).bind("input", function () {
            if($(item).val()){
                $(this).siblings('p').html('');
            }
            if((item == '#newUserPsw' || item == '#reNewUserPsw') && $(item).val() && $(".newUserPsw_error").html() == '请输入相同的密码'){
                $(".newUserPsw_error").html('');
            }
        })
    })
    //获取验证码函数
    function getMobileCode(e) {
        var selector = e.target;
        if($(selector).html() !== '验证码') {
            return false;
        }
        // console.log(selector);
        var userMobile = $(selector).siblings(".telNumber").val();
        var telResult = checkTEL(userMobile);
        if(!telResult) {
            return false;
        }
        $("body").off("tap", selector, getMobileCode);
        var dataModel = {
            "userMobile": userMobile
        };
        $.ajax({
            type: 'POST',
            url: '/api/services/app/validateCode/SendSms',
            // data to be added to query string:
            data: dataModel,
            // type of data we are expecting in return:
            success: function(data){
                var duration = 60; //获取验证码时长设置
                var showDuration = setInterval(function() {
                    duration--;
                    $(selector).text(duration + " S");
                    if(duration == 0) {
                        clearInterval(showDuration);
                        $(selector).text("验证码");
                        $("body").on("tap", selector, getMobileCode);
                    }
                }, 1000);
            },
            error: function(xhr, type){
                var duration = 60; //获取验证码时长设置
                var showDuration = setInterval(function() {
                    duration--;
                    $(selector).text(duration + " S");
                    if(duration == 0) {
                        clearInterval(showDuration);
                        $(selector).text("获取验证码");
                        $("body").on("tap", selector, getMobileCode);
                    }
                }, 1000);
            }
        })
    }
    function registerNewUser() {
        if($("#registerBtn").text() !== '注册'){
            return false;
        }
        var clientName = $("#clientName").val(); //(string, optional): ��ҵ���� ,
        var userMobile = $("#newUserMobile").val(); //(string, optional): �ֻ����� ,
        var mobileCode = $("#newUserMobileCode").val(); //(string, optional): �ֻ���֤�� ,
        var newUserPsw = $("#newUserPsw").val(); //(string, optional): ����
        var reNewUserPsw = $("#reNewUserPsw").val(); //(string, optional): ����
        if(!clientName) {
            $(".clientName_error").html("请填写企业名称");
            return false;
        }
        var telResult = checkTEL(userMobile);
        if(!telResult) {
            return false;
        }
        if(!mobileCode) {
            $(".newUserMobileCode_error").html("验证码不能为空");
            return false;
        }
        if(!newUserPsw) {
            $(".newUserPsw_error").html("密码不能为空");
            return false;
        } else {
            if (/[\u4E00-\u9FA5]/g.test(newUserPsw)) {
                $(".newUserPsw_error").html("密码不能输入汉字");
                return false;
            }
            if(newUserPsw.length < 6) {
                $(".newUserPsw_error").html("密码不能低于6位数");
                return false;
            }
        }
        if(!reNewUserPsw) {
            $(".reNewUserPsw_error").html("密码不能为空");
            return false;
        }else{
            if (/[\u4E00-\u9FA5]/g.test(reNewUserPsw)) {
                $(".reNewUserPsw_error").html("密码不能输入汉字");
                return false;
            }
        }
        if(reNewUserPsw != newUserPsw) {
            $(".newUserPsw_error").html("请输入相同的密码");
            return false;
        }
        $("#registerBtn").text("正在申请中...");
        $("body").off("tap", "#registerBtn", registerNewUser);
        var newUserData = {
            "clientName": clientName,
            "userMobile": userMobile,
            "mobileCode": mobileCode,
            "userPwd": newUserPsw
        };
        $.ajax({
            type: 'POST',
            url: '/api/services/app/clientAppservice/Register',
            // data to be added to query string:
            data: newUserData,
            // type of data we are expecting in return:
            success: function(data){
                alert('恭喜你，申请成功');
                $("#clientName").val(""); //(string, optional): ��ҵ���� ,
                $("#newUserMobile").val(""); //(string, optional): �ֻ����� ,
                $("#newUserMobileCode").val(""); //(string, optional): �ֻ���֤�� ,
                $("#newUserPsw").val(""); //(string, optional): ����
                $("#reNewUserPsw").val(""); //(string, optional): ����
                $("#registerBtn").text("注册");
                $("#newUserGetCheck").text('验证码');
                $("body").on("tap", "#registerBtn", registerNewUser);
            },
            error: function(error){
                const data = JSON.parse(error.response).error;
                if(data.message == "公司名称已经存在") {
                    $(".clientName_error").html("公司名称已经存在");
                }
                if(data.message == "验证码不正确") {
                    $(".newUserMobileCode_error").html("验证码不正确");
                }
                $("#registerBtn").text("注册");
                $("body").on("tap", "#registerBtn", registerNewUser);
            }
        })
        /*abp.services.app.clientAppservice.register(newUserData, {})
            .done(function(data) {
                $("#clientName").val(""); //(string, optional): ��ҵ���� ,
                $("#newUserMobile").val(""); //(string, optional): �ֻ����� ,
                $("#newUserMobileCode").val(""); //(string, optional): �ֻ���֤�� ,
                $("#newUserPsw").val(""); //(string, optional): ����
                $("#reNewUserPsw").val(""); //(string, optional): ����
                $("#registerBtn").text("注册");
                $("#newUserGetCheck").text('验证码');
                $("body").on("tap", "#registerBtn", registerNewUser);
            }).fail(function(data) {
                if(data.message == "公司名称已经存在") {
                    $(".clientName_error").html("公司名称已经存在");
                }
                if(data.message == "验证码不正确") {
                    $(".newUserMobileCode_error").html("验证码不正确");
                }
                $("#registerBtn").text("注册");
                $("body").on("tap", "#registerBtn", registerNewUser);
            });*/
    }
});
//})



