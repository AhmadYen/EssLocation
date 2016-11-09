var username = '' ;
var assignby = '' ;
$( document).ready(function() {

});

//<<<---- CheckHN ---->>>
$('#searchHN').click(function (){
    networkInfo();
    $('#loading2').modal('show');
    var url = RootPathPHP + "PatientInformation.php";
    if($('#hn').val() != "" &&statusNet == true ){

        var hn = $('#hn').val() ;
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: {
                Accept: "application/json"
            },
            data: { 'hnParam' : hn },
            //url: "http://ahmad.16mb.com/PatientInformation.php",
            url : url ,
            success: function (result) {
               // console.log(result);

                if(result != ""){
                    $.each(result, function(i, field){
                        $('#name').val(field.pname + " " + field.fname + " " + field.lname);
                        $('#address').val('บ้านเลขที่ ' + field.addrpart +" หมู่ "+ field.moopart +" "+ field.address + "" + field.po_code);
                    });
                    $('#name').attr('next-step','true');
                    $('#loading2').modal('hide');
                }
                else {
                    $('#loading2').modal('hide');
                    $('#name').val('');
                    $('#address').val('');
                    $('#name').removeAttr('next-step','true');
                    $('li[step="2"]').addClass('disabled');
                    $('li[step="3"]').addClass('disabled');
                    $('li[step="4"]').addClass('disabled');
                    window.plugins.toast.showLongBottom('ไม่พบรหัสผู้ป่วยกรุณาตรวจสอบใหม่อีกครั้ง');
                }

            },
            error: function(e){
            //console.log(e);
            window.plugins.toast.showLongBottom('เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง');
            },
            async: false
        });
    }
    else if($('#hn').val() != "" && statusNet == false){
        $('#loading2').modal('hide');
        window.plugins.toast.showLongBottom('กรุณาเปิดใช้งานอินเทอร์เนต');
    }
    else if($('#hn').val() == "" ){
        $('#loading2').modal('hide');
        $('#name').val('');
        $('#address').val('');
        $('#name').removeAttr('next-step','true');
        $('li[step="2"]').addClass('disabled');
        $('li[step="3"]').addClass('disabled');
        $('li[step="4"]').addClass('disabled');
        window.plugins.toast.showLongBottom('กรุณากรอกรหัสผู้ป่วย');
    }
});
//<<<---- CheckHN ---->>>

//<<<---- Query Path ---->>>
var RootPathPHP,ServerPath,UploadImg;
function queryPathPHP(){

    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },

        //----------**ต้องแก้ไขกรณีย้ายไฟล์**-----------//
        //url: "http://ahmad.16mb.com/queryPath.php",
        url: "http://203.158.252.36/PHP/queryPath.php",
        //----------**ต้องแก้ไขกรณีย้ายไฟล์**-----------//


        success: function (result) {
            if(result != ""){
                $.each(result, function(i, field){
                    if(field.name == 'PathPHP'){
                        RootPathPHP = ServerPath + field.value ;
                    }
                    else if(field.name == 'PathServer'){
                        ServerPath = field.value ;
                    }
                    else if(field.name == 'PathImage'){
                        UploadImg = field.value ;
                    }

                });
            }
            else {

               queryPathPHP();
            }
        },
        error: function (e) {
            console.log(e);
            $('#loading2').modal('hide');
            window.plugins.toast.showLongBottom('เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง');
        },
        async: false
    });
}
//<<<---- Query Path ---->>>

//<<<---- UpdateLocation to DataBase ---->>>
function update_location (num){
    var hn = $('#hn').val() ;
    var numImage = num ;
    var url = RootPathPHP + "updateDatalocation.php";
    var user = username ;
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        data: {'hnParam': hn,
            'latParam': latitudeJsIndex,
            'lngParam': longitudeJsIndex,
            'numParam': numImage,
            'user': user,
            'assignby' : assignby
        },
        //url: "http://ahmad.16mb.com/updateDatalocation.php",
        url : url,
        success : function(result){
            console.log(result);
            if(result){
                delete_img();
                upload(imageUrl,loop);
            }
            else {
                $('#loading').modal('hide');
                window.plugins.toast.showLongBottom('อัปโหลดไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
            }
        },
        error: function (request,error) {
            //console.log(request);
            $('#loading').modal('hide');
            window.plugins.toast.showLongBottom('อัปโหลดไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
        },
        async: false
    });
}
//<<<---- UpdateLocation to DataBase ---->>>

//<<<---- Delete on Server ---->>>
function delete_img (){
    var hn = $('#hn').val() ;
    var url = RootPathPHP + "deleteImage.php";
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        data: {'hnParam': hn
        },
        //url: "http://ahmad.16mb.com/deleteImage.php",
        url : url ,
        complete : function(xhr){
            console.log( xhr.status);
        }
    });
}
//<<<---- Delete on Server ---->>>

//<<<---- Check hn Before upload ---->>>

function checkLogin(){
    var url = RootPathPHP+ "checkLogin.php";
        console.log(url);
    $('#loading2').modal('show');
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        data: { 'username' : $('#user').val(),
                'password' : $('#password').val()},
        //url: "http://ahmad.16mb.com/checkLogin.php",

        url : url ,

        success: function (result) {
            //console.log(result);
            if(result != ""){
                $.each(result, function(i, field){
                    if($('#user').val() == field.username && $('#password').val() == field.password && field.assignby != null) {
                        username = '?username='+field.username;
                        assignby = '&assignby='+field.assignby;
                        window.location = '../www/rootPage.html'+username+assignby;
                    }
                    else if($('#user').val() != field.username || $('#password').val() != field.password ){
                        window.plugins.toast.showLongBottom('ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้องกรุณาตรวจสอบอีกครั้ง');
                    }
                    else if($('#user').val() == field.username && $('#password').val() == field.password && field.assignby == '' || field.assignby == null) {
                        window.plugins.toast.showLongBottom('ไม่สามารถเข้าสู่ระบบได้กรุณาติดต่อเจ้าหน้าที่');
                    }
                });
            }
            else {
                window.plugins.toast.showLongBottom('ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้องกรุณาตรวจสอบอีกครั้ง');
            }

        },
        error: function (request,error) {
            //console.log(error);
            window.plugins.toast.showLongBottom('เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง');
        },
        async: false
    });
}