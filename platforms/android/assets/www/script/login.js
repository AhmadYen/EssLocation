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
        window.plugins.toast.showLongBottom('กรุณากรอกชื่อผู้ใช้งานและรหัสผ่าน');
    }
    else if($('#user').val() != '' && $('#password').val() !='' && statusNet == false){
        window.plugins.toast.showLongBottom('กรุณาเปิดใช้งานอินเทอร์เนต');
    }
    else if($('#user').val() == '' && $('#password').val() =='' && statusNet == false){
        window.plugins.toast.showLongBottom('กรุณาเปิดใช้งานอินเทอร์เนต');
    }

});
$('#logout').click(function(){
    navigator.notification.confirm(
        'คุณต้องการออกจากระบบหรือไม่',  // message
        onConfirm,              // callback to invoke with index of button pressed
        'ออกจากระบบ',            // title
        ['ตกลง','ยกเลิก']          // buttonLabels
    );
});
function onConfirm(buttonIndex){
    if(buttonIndex==1){
        location.href = 'index.html';
    }else{

    }
}
///<<<-- Login & Logout -->>

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
    }
    else {
        statusNet = true ;
        queryPathPHP();
    }
}
 //<<< Network check >>>