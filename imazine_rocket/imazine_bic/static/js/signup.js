
/* 중복체크! */
$(function(){
    /* 아이디 수정했을 때 */
    $('#email').change(function () {
        $('#signup_reemail').show();
    });

    // 중복확인 버튼을 눌렀을 때
    $('#signup_reemail').click(function(){
        console.log("버튼 눌림");
        var email = $('#email').val();
        // 이메일 란이 공백일 경우
        if(email == ''){
            alert('이메일을 입력해주세요.');
            return false;
        }
        // debugger;
        $.ajax({
            url:'check_email',
            data: {
                email: email
            },
            type:'get',
            dataType:'json',
            success:function(response){
                console.log("ajax 들어감");
                if(response.result != 'success'){
                    console.error(response.data)
                    return;
                }
                if(response.data == 'exist'){
                    alert("존재하는 이메일 입니다!");
                    $('#email').val('').focus();
                    return;
                } else {
                    alert("사용 가능한 이메일입니다!");
                    $("#join_bt").attr("id_check_result", "success");
                    return;
                }
                // console.log(response)
            },
            error : function(xhr, error){
                alert("서버와의 통신에서 문제가 발생했습니다.");
                console.error("error : " + error);
            }
        });

        return false;
    });

    // 가입 버튼 눌렀을 때
    $('#joinForm').submit(function() {
        if($("#join_bt").attr("id_check_result") == "fail") {
            alert("이메일 중복 확인를 해주시기 바랍니다.");
            $("#email").focus();
            return false;
        }
    });

    $("#email").on("propertychange change keyup paste input", function(){
        $('#signup_reemail').show();
        $("#join_bt").attr("id_check_result", "fail");
    });
});

// 비밀번호 확인
$(function(){ 
    $("#alert-success").hide(); 
    $("#alert-danger").hide(); 
    $("input").keyup(function(){ 
        var pwd = $("#pwd").val(); 
        var pwdCk = $("#repwd").val(); 
        if(pwd != "" || pwdCk != ""){ 
            if(pwd == pwdCk){ 
                $("#alert-success").show(); 
                $("#alert-danger").hide(); 
                $("#join_bt").removeAttr("disabled"); 
            } else{ 
                $("#alert-success").hide(); 
                $("#alert-danger").show(); 
                $("#join_bt").attr("disabled", "disabled"); 
            } 
        } 
    }); 
});
function gofun(){
    location.href="choose_use.html";
}

function chfun(){
    location.href="signin.html";
}

function sm(){
    joinForm.submit();
}
