var lattitudeJsIndex,longitudeJsIndex,gpsStatus = false ;

$('#login').click(function(){
    //var status = networkInfo();
    //if(networkInfo()){
    location.href="rootPage.html" ;
    //}
    //else {
    //    window.plugins.toast.showLongBottom('กรุณาเปิดใช้งานอินเทอร์เนต', function(a){console.log('toast success: ' + a)}
    //        , function(b){alert('toast error: ' + b)});
    //}

});

//<<<<------GetPosition------>>>>
function getPosition() {
    var options = {
        enableHighAccuracy: true,
        //maximumAge: 3600000
    };
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    function onSuccess(position) {
        lattitudeJsIndex = position.coords.latitude ;
        longitudeJsIndex = position.coords.longitude ;
        $('#txtLat').val(lattitudeJsIndex);
        $('#txtLng').val(longitudeJsIndex);
        //<<<----step 4 Active---->>>
        nextUpload();
        //<<<----step 4 Active---->>>
        gpsStatus = true;
    };
    function onError(error) {
        window.plugins.toast.showLongBottom('กรุณาตรวจสอบตำแหน่งอีกครั้ง', function(a){
            //console.log('toast success: ' + a)
        }
            , function(b){
                //alert('toast error: ' + b)
            });
    };
};
//<<<<------GetPosition------>>>>

//<<< Get location >>>
$('#getPosition').click(function(){
    //console.log('OK');
    getPosition() ;
});
//<<< Get location >>>

//<<< Network check >>>
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

    if(networkState == Connection.NONE){
        return false ;
    }
    else {
        return true ;
    }

    //window.plugins.toast.showLongBottom(states[networkState], function(a){console.log('toast success: ' + a)}
    //    , function(b){alert('toast error: ' + b)});
}
var statusNet ;
function onOffline() {
    //statusNet = 'กรุณาเปิดใช้งานอินเทอร์เนต'
    //status = 'off';
}
function onOnline() {
    //status = 'on';
}
//<<< Network check >>>

//<<<---- Upload Active ---->>>
function nextUpload() {
    $('#next').css('opacity','1');
    var $active = $('.wizard .nav-tabs li.active');
    $active.next().removeClass('disabled');
    $('#next').attr('upload','true');
}
//<<<---- Upload Active ---->>>