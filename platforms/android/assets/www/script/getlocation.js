var latitudeJsIndex,longitudeJsIndex ;
var gpsStatus = false ;


//<<<<------GetPosition------>>>>
function getPosition() {
    cordova.plugins.diagnostic.getLocationMode(function(locationMode){
        switch(locationMode){
            case cordova.plugins.diagnostic.locationMode.HIGH_ACCURACY:
                console.log("High accuracy");
                navigator.geolocation.getCurrentPosition(onSuccess, onError,options);
                break;
            case cordova.plugins.diagnostic.locationMode.BATTERY_SAVING:
                console.log("Battery saving");
                navigator.geolocation.getCurrentPosition(onSuccess, onError,options);
                break;
            case cordova.plugins.diagnostic.locationMode.DEVICE_ONLY:
                console.log("Device only");
                navigator.geolocation.getCurrentPosition(onSuccess, onError,options);
                break;
            case cordova.plugins.diagnostic.locationMode.LOCATION_OFF:
                $('#loading2').modal('hide');
                $('#next').removeAttr('upload');
                $('#txtLat').val('');
                $('#txtLng').val('');
                //window.plugins.toast.showLongBottom('กรุณาเปิดใช้งาน GPS');
                function onConfirm(buttonIndex){
                if(buttonIndex==1){
                    cordova.plugins.diagnostic.switchToLocationSettings();
                }else{

                }
                }
                navigator.notification.confirm(
                    'คุณต้องการเปิดใช้งาน GPS หรือไม่',  // message
                    onConfirm,              // callback to invoke with index of button pressed
                    'GPS ยังไม่เปิดใช้งาน',            // title
                    ['ตกลง','ยกเลิก']          // buttonLabels
                );
                break;
        }
    },function(error){
        console.error("The following error occurred: "+error);
        window.plugins.toast.showLongBottom('เกิดข้อผิดพลาดในการใช้งาน GPS');
    });

    var options = {
        maximumAge: 10000,
        //timeout: 10000,  //code: 3
        enableHighAccuracy: true,
    };

    function onSuccess(position) {
        latitudeJsIndex = position.coords.latitude ;
        longitudeJsIndex = position.coords.longitude ;
        $('#txtLat').val('ละติจูด : ' + latitudeJsIndex);
        $('#txtLng').val('ลองจิจูด : ' + longitudeJsIndex);

        //<<<----step 4 Active---->>>
        nextUpload();
        //<<<----step 4 Active---->>>

        gpsStatus = true;
        $('#loading2').modal('hide');
    }
    function onError(error) {
        console.log(error);
        if(error.code == 3){
            $('#loading2').modal('hide');
            $('#next').removeAttr('upload');
            $('#txtLat').val('');
            $('#txtLng').val('');
            window.plugins.toast.showLongBottom('กรุณาตรวจสอบพิกัดอีกครั้ง');
        }
        else{
            $('#loading2').modal('hide');
            $('#next').removeAttr('upload');
            $('#txtLat').val('');
            $('#txtLng').val('');
            window.plugins.toast.showLongBottom('กรุณาตรวจสอบพิกัดอีกครั้ง');
        }
    }
};
//<<<<------GetPosition------>>>>

//<<< Get location >>>
$('#getPosition').click(function(){
    //checkGps();
    $('#loading2').modal('show');
    getPosition();
});
//<<< Get location >>>

//<<<---- Upload Active ---->>>
function nextUpload() {
    $('#next').attr('upload','true');
}
//<<<---- Upload Active ---->>>


