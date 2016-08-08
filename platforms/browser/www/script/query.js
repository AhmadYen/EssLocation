//var RootPathPHP,CheckHn,HnInLocation,InsertLocation,UpdateLocation,DeleteImage,UploadImg;
var objPath =[];

$( document).ready(function() {
    //document.addEventListener("offline", onOffline, false);
    //document.addEventListener("online", onOnline, false);
    console.log("666666666666666666");
    queryPathPHP() ;
});

function networkInfo() {
        var networkState = navigator.connection.type;
        var states = {};

        //states[Connection.UNKNOWN]  = 'การเชื่อมต่อสำเร็จ';
        //states[Connection.ETHERNET] = 'การเชื่อมต่อสำเร็จ';
        states[Connection.WIFI]     = 'การเชื่อมต่อสำเร็จ';
        states[Connection.CELL_2G]  = 'การเชื่อมต่อสำเร็จ';
        states[Connection.CELL_3G]  = 'การเชื่อมต่อสำเร็จ';
        states[Connection.CELL_4G]  = 'การเชื่อมต่อสำเร็จ';
        states[Connection.CELL]     = 'การเชื่อมต่อสำเร็จ';
        states[Connection.NONE]     = 'ไม่มีการเชื่อมต่ออินเทอร์เนต';

    window.plugins.toast.showLongBottom(states[networkState], function(a){console.log('toast success: ' + a)}
        , function(b){alert('toast error: ' + b)});
}
var statusNet ;
var status ;
function onOffline() {
    statusNet = 'กรุณาเปิดใช้งานอินเทอร์เนต'
    status = 'off';
}

function onOnline() {
    status = 'on';
}

$('#query').click(function (){

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
            url: "http://ahmad.16mb.com/queryData.php",

            success: function (result) {
                console.log(result);

                if(result != ""){
                    $.each(result, function(i, field){
                        $('#fname').val(field.pname + " " + field.fname + " " + field.lname);
                    });
                }
                else {
                    //$('#popupCloseRight').popup('open');
                    window.plugins.toast.showLongBottom('ไม่พบรหัสผู้ป่วยกรุณาตรวจสอบใหม่อีกครั้ง', function(a){console.log('toast success: ' + a)}
                        , function(b){alert('toast error: ' + b)});
                }

            },
            error: function (request,error) {
                //console.log(request);
                window.plugins.toast.showLongBottom('กรุณาตรวจสอบอินเทอร์เนต', function(a){console.log('toast success: ' + a)}
                    , function(b){alert('toast error: ' + b)});

            },
            async: false
        });
    }
    else {
        window.plugins.toast.showLongBottom('กรุณากรอกรหัสผู้ป่วย', function(a){console.log('toast success: ' + a)}
            , function(b){alert('toast error: ' + b)});
    }


});



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

        success: function (result) {
            console.log(result);
            console.log("555555555555555555555555");
            //if(result != ""){
            //    objPath = result ;
            //}
            //else {
            //    //$('#popupCloseRight').popup('open');
            //   queryPathPHP();
            //}

        },
        error: function (request,error) {
            //console.log(request);
            window.plugins.toast.showLongBottom('กรุณาตรวจสอบอินเทอร์เนต', function(a){console.log('toast success: ' + a)}
                , function(b){alert('toast error: ' + b)});

        },
        async: false
    });
}



