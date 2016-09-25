var username = '' ;
var assignby = '' ;
$( document).ready(function() {
    //<<<---- QueryPath ---->>>
    //networkInfo();
    //<<<---- QueryPath ---->>>
});
//<<<---- CheckHN ---->>>
$('#searchHN').click(function (){
    networkInfo();
    queryPathPHP();
    var url = RootPathPHP + CheckHn ;
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
            url : url,
            success: function (result) {
               // console.log(result);

                if(result != ""){
                    $.each(result, function(i, field){
                        $('#name').val(field.pname + " " + field.fname + " " + field.lname);
                        $('#address').val(field.addrpart +" "+ field.moopart +" "+ field.address + "" + field.po_code);
                    });
                    $('#name').attr('next-step','true');
                }
                else {
                    $('#name').val('');
                    $('#address').val('');
                    $('#name').removeAttr('next-step','true');
                    $('li[step="2"]').addClass('disabled');
                    $('li[step="3"]').addClass('disabled');
                    $('li[step="4"]').addClass('disabled');
                    window.plugins.toast.showLongBottom('ไม่พบรหัสผู้ป่วยกรุณาตรวจสอบใหม่อีกครั้ง', function(a){
                        //console.log('toast success: ' + a)
                    }
                        , function(b){
                            //alert('toast error: ' + b)
                        });
                }

            },
            error: function(e){
            //console.log(e);
            window.plugins.toast.showLongBottom('เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง', function(a){
                    //console.log('toast success: ' + a)
                }
                    , function(b){
                        //alert('toast error: ' + b)
                    });

            },
            async: false
        });
    }
    else if($('#hn').val() != "" && statusNet == false){
        window.plugins.toast.showLongBottom('กรุณาเปิดใช้งานอินเทอร์เนต', function(a){
                //console.log('toast success: ' + a)
            }
            , function(b){
                //alert('toast error: ' + b)
            });
    }
    else if($('#hn').val() == "" ){
        $('#name').val('');
        $('#address').val('');
        $('#name').removeAttr('next-step','true');
        $('li[step="2"]').addClass('disabled');
        $('li[step="3"]').addClass('disabled');
        $('li[step="4"]').addClass('disabled');
        window.plugins.toast.showLongBottom('กรุณากรอกรหัสผู้ป่วย', function(a){
            //console.log('toast success: ' + a)
        }
            , function(b){
                //alert('toast error: ' + b)
            });
    }
});
//<<<---- CheckHN ---->>>

//<<<---- Query Path ---->>>
var RootPathPHP,CheckHn,HnInLocation,InsertLocation,UpdateLocation,DeleteImage,UploadImg,CheckLogin;
function queryPathPHP(){
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },

        //----------**ต้องแก้ไขกรณีย้ายไฟล์**-----------//
        url: "http://ahmad.16mb.com/queryPath.php",
        //----------**ต้องแก้ไขกรณีย้ายไฟล์**-----------//


        success: function (result) {
            if(result != ""){
                $.each(result, function(i, field){
                    if(field.name == 'RootPathPHP'){
                        RootPathPHP = field.value ;
                    }
                    else if(field.name == 'CheckHn'){
                        CheckHn = field.value ;
                    }
                    else if(field.name == 'HnInLocation'){
                        HnInLocation = field.value ;
                    }
                    else if(field.name == 'InsertLocation'){
                        InsertLocation = field.value ;
                    }
                    else if(field.name == 'UpdateLocation'){
                        UpdateLocation = field.value ;
                    }
                    else if(field.name == 'DeleteImage'){
                        DeleteImage = field.value ;
                    }
                    else if(field.name == 'UploadImg'){
                        UploadImg = field.value ;
                    }
                    else if(field.name == 'CheckLogin'){
                        CheckLogin = field.value ;
                    }

                });
            }
            else {

               queryPathPHP();
            }

        },
        error: function (e) {
            //alert(e.statusText);
            window.plugins.toast.showLongBottom('เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง', function(a){
                //console.log('toast success: ' + a)
            }
                , function(b){
                    //alert('toast error: ' + b)
                });

        },
        async: false
    });
}
//<<<---- Query Path ---->>>

//<<<---- UpdateLocation to DataBase ---->>>
function update_location (num){
    var hn = $('#hn').val() ;
    var numImage = num ;
    var url = RootPathPHP + UpdateLocation ;
    var user = username ;
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        data: {'hnParam': hn,
            'latParam': lattitudeJsIndex,
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
                window.plugins.toast.showLongBottom('อัปโหลดไม่สำเร็จ กรุณาลองใหม่อีกครั้ง', function(a){
                        //console.log('toast success: ' + a)
                    }
                    , function(b){
                        //alert('toast error: ' + b)
                    });
            }
        },
        error: function (request,error) {
            //console.log(request);
            $('#loading').modal('hide');
            window.plugins.toast.showLongBottom('อัปโหลดไม่สำเร็จ กรุณาลองใหม่อีกครั้ง', function(a){
                    //console.log('toast success: ' + a)
                }
                , function(b){
                    //alert('toast error: ' + b)
                });

        },
        async: false

    });
}
//<<<---- UpdateLocation to DataBase ---->>>

//<<<---- Delete on Server ---->>>
function delete_img (){
    var hn = $('#hn').val() ;
    var url = RootPathPHP + DeleteImage ;
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
        url : url,
        complete : function(xhr){
            console.log( xhr.status);
        }
    });
}
//<<<---- Delete on Server ---->>>

//<<<---- Check hn Before upload ---->>>

function checkLogin(){
    var url = RootPathPHP + CheckLogin ;
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
        url : url,
        success: function (result) {
            console.log(result);

            if(result != ""){
                $.each(result, function(i, field){
                    if($('#user').val() == field.username && $('#password').val() == field.password && field.assignby != null) {
                        username = '?username='+field.username;
                        assignby = '&assignby='+field.assignby;
                        window.location = '../www/rootPage.html'+username+assignby;
                    }
                    else if($('#user').val() != field.username || $('#password').val() != field.password ){
                        window.plugins.toast.showLongBottom('ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้องกรุณาตรวจสอบอีกครั้ง', function(a){
                                //console.log('toast success: ' + a)
                            }
                            , function(b){
                                //alert('toast error: ' + b)
                            });
                    }
                    else if($('#user').val() == field.username && $('#password').val() == field.password && field.assignby == '' || field.assignby == null) {
                        window.plugins.toast.showLongBottom('ไม่สามารถเข้าสู่ระบบได้กรุณาติดต่อเจ้าหน้าที่', function(a){
                                //console.log('toast success: ' + a)
                            }
                            , function(b){
                                //alert('toast error: ' + b)
                            });
                    }
                });

            }
            else {
                window.plugins.toast.showLongBottom('ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้องกรุณาตรวจสอบอีกครั้ง', function(a){
                        //console.log('toast success: ' + a)
                    }
                    , function(b){
                        //alert('toast error: ' + b)
                    });
            }

        },
        error: function (request,error) {
            //console.log(error);
            window.plugins.toast.showLongBottom('เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง', function(a){
                    //console.log('toast success: ' + a)
                }
                , function(b){
                    //alert('toast error: ' + b)
                });

        },
        async: false
    });
}