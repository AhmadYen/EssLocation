var statusNet;
//<<<-- button back -->>>
$(document).ready(function() {
    document.addEventListener("backbutton",onBackKey,false);
});
function onBackKey(){
    if($('body').attr('home')){
        //e.preventDefault();
        navigator.app.exitApp()
    }
}
//<<<-- button back -->>>

///<<<-- Login & Logout -->>
$('#login').click(function(){
    networkInfo();
    if($('#user').val() != '' && $('#password').val() !=''&& statusNet == true) {
        queryPathPHP();
        //$('#loading2').modal('show');
        checkLogin();

    }
    else if($('#user').val() == '' && $('#password').val() =='' && statusNet == true){
        window.plugins.toast.showLongBottom('กรุณากรอกชื่อผู้ใช้งานและรหัสผ่าน', function(a){
                //console.log('toast success: ' + a)
            }
            , function(b){
                //alert('toast error: ' + b)
            });
    }
    else if($('#user').val() != '' && $('#password').val() !='' && statusNet == false){
        window.plugins.toast.showLongBottom('กรุณาเปิดใช้งานอินเทอร์เนต', function(a){
                //console.log('toast success: ' + a)
            }
            , function(b){
                //alert('toast error: ' + b)
            });
    }
    else if($('#user').val() == '' && $('#password').val() =='' && statusNet == false){
        window.plugins.toast.showLongBottom('กรุณาเปิดใช้งานอินเทอร์เนต', function(a){
                //console.log('toast success: ' + a)
            }
            , function(b){
                //alert('toast error: ' + b)
            });
    }

});

$('#logout').click(function(){
    //var r = confirm("คุณต้องการออกจากระบบใช่หรือไม่");
    //if (r == true) {
    //    location.href = 'index.html';
    //    username = ''; assignby = '';
    //} else {
    //
    //}
    showConfirm();
});
///<<<-- Login & Logout -->>

function showConfirm() {
    navigator.notification.confirm(
        'You are the winner!',  // message
        function (){ location.href = 'index.html'; },              // callback to invoke with index of button pressed
        'Game Over',            // title
        'Restart,Exit'          // buttonLabels
    );
}

 //<<< Network check >>>
function networkInfo() {
    var networkState = navigator.connection.type;
    var states = {};

    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
    //console.log(networkState);
    //console.log(states);
    if(networkState == 'none'){
        statusNet = false ;
        //return statusNet ;
    }
    else {
        statusNet = true ;
        queryPathPHP();
        //return statusNet ;
    }
}

 //<<< Network check >>>