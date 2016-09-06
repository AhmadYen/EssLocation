
$( document).ready(function() {
    //<<<---- QueryPath ---->>>
    queryPathPHP();
    //<<<---- QueryPath ---->>>
});
//<<<---- CheckHN ---->>>
$('#searchHN').click(function (){

    var url = RootPathPHP + CheckHn ;
    if($('#hn').val() != ""){
        var hn = $('#hn').val() ;
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: {
                Accept: "application/json"
            },
            data: { 'hnParam' : hn },
            //url: "http://ahmad.16mb.com/queryData.php",
            url : url,
            success: function (result) {
                console.log(result);

                if(result != ""){
                    $.each(result, function(i, field){
                        $('#name').val(field.pname + " " + field.fname + " " + field.lname);
                    });
                    $('#name').attr('next-step','true');
                    $('#next').css('opacity','1');
                }
                else {
                    $('#popupCloseRight').popup('open');
                    window.plugins.toast.showLongBottom('ไม่พบรหัสผู้ป่วยกรุณาตรวจสอบใหม่อีกครั้ง', function(a){
                        //console.log('toast success: ' + a)
                    }
                        , function(b){
                            //alert('toast error: ' + b)
                        });
                }

            },
            error: function (request,error) {
                //console.log(request);
                window.plugins.toast.showLongBottom('กรุณาตรวจสอบอินเทอร์เนต', function(a){
                    //console.log('toast success: ' + a)
                }
                    , function(b){
                        //alert('toast error: ' + b)
                    });

            },
            async: false
        });
    }
    else {
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
var RootPathPHP,CheckHn,HnInLocation,InsertLocation,UpdateLocation,DeleteImage,UploadImg;
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
            console.log(result);
            console.log("555555555555555555555555");
            if(result != ""){
                $.each(result, function(i, field){
                    if(field.name == 'RootPathPHP'){
                        RootPathPHP = field.val ;
                    }
                    else if(field.name == 'CheckHn'){
                        CheckHn = field.val ;
                    }
                    else if(field.name == 'HnInLocation'){
                        HnInLocation = field.val ;
                    }
                    else if(field.name == 'InsertLocation'){
                        InsertLocation = field.val ;
                    }
                    else if(field.name == 'UpdateLocation'){
                        UpdateLocation = field.val ;
                    }
                    else if(field.name == 'DeleteImage'){
                        DeleteImage = field.val ;
                    }
                    else if(field.name == 'UploadImg'){
                        UploadImg = field.val ;
                    }

                });
            }
            else {

               queryPathPHP();
            }

        },
        error: function (request,error) {
            //console.log(request);
            window.plugins.toast.showLongBottom('กรุณาตรวจสอบอินเทอร์เนต', function(a){
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

//<<<---- InsertLocation to DataBase ---->>>
function insert_location (num){
    var hn = $('#hn').val() ;
    var numImage = num ;
    var url = RootPathPHP + InsertLocation ;
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
            'numParam': numImage
        },
        //url: "http://ahmad.16mb.com/insertDatalocation.php",
        url : url,
        complete : function(xhr){
            console.log( xhr.status);
        }
    });
}
//<<<---- InsertLocation to DataBase ---->>>

//<<<---- UpdateLocation to DataBase ---->>>
function update_location (num){
    var hn = $('#hn').val() ;
    var numImage = num ;
    var url = RootPathPHP + UpdateLocation ;
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
            'numParam': numImage
        },
        //url: "http://ahmad.16mb.com/updateDatalocation.php",
        url : url,
        complete : function(xhr){
            console.log( xhr.status);
        }
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
var check_result ;
function check_hnBefore_upload (){
    var hn = $('#hn').val() ;
    var url = RootPathPHP + HnInLocation ;
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        data: { 'hnParam' : hn },
        //url: "http://ahmad.16mb.com/check_hnOnlocation.php",
        url : url,
        success: function (result) {
            //console.log(result);
            check_result= result ;

        },
        error: function (request,error) {
            //console.log(request);
            window.plugins.toast.showLongBottom('กรุณาตรวจสอบอินเทอร์เนต', function(a){
                //console.log('toast success: ' + a)
            }
                , function(b){
                    //alert('toast error: ' + b)
                });

        },
        async: false
    });
}
//<<<---- Check hn Before upload ---->>>