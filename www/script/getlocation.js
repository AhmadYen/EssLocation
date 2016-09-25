var lattitudeJsIndex,longitudeJsIndex,gpsStatus = false ;


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
        $('#txtLat').val('ละติจูด : ' + lattitudeJsIndex);
        $('#txtLng').val('ลองจิจูด : ' + longitudeJsIndex);
        //<<<----step 4 Active---->>>
        nextUpload();
        //<<<----step 4 Active---->>>
        gpsStatus = true;
    };
    function onError(error) {
        window.plugins.toast.showLongBottom('กรุณาตรวจสอบพิกัดอีกครั้ง', function(a){
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



//<<<---- Upload Active ---->>>
function nextUpload() {
    //$('#next').css('opacity','1');
    //var $active = $('.wizard .nav-tabs li.active');
    //$active.next().removeClass('disabled');
    $('#next').attr('upload','true');
}
//<<<---- Upload Active ---->>>