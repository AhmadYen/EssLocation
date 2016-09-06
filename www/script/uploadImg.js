var loop = 0;
var numName = 0;
var numSuccess = 0;

//<<<---- Click Upload ---->>>
function uploadImageToServer(){

    //if(imgTake >= 3 && $('#fname').val()!= '' && gpsStatus == true){
        $('#loading').modal('show');
        //check_hnBefore_upload();
        //if(check_result == ""){
        //    insert_location(imgTake);
        //}
        //else {
            update_location(imgTake);
        //}
        delete_img();
        upload(imageUrl,loop);
    //}
    //else if(imgTake < 3 && $('#fname').val()!= '' && gpsStatus == true){
    //    $('#popupCloseRight').popup('open');
    //    window.plugins.toast.showLongBottom('ไม่พบรหัสผู้ป่วยกรุณาตรวจสอบใหม่อีกครั้ง', function(a){console.log('toast success: ' + a)}
    //        , function(b){alert('toast error: ' + b)});
    //}

};
//<<<---- Click Upload ---->>>

//<<<---- Func Upload ---->>>
function upload(imageUrl,loop) {
    if (loop < 5 && imageUrl[loop] != null) {
        var fileEntry = imageUrl[loop];
        var fileURL = fileEntry.toURL();
        var name = $("#hn").val() + "-" + numName;
        numName++;
        loop = loop + 1;

        //var serverUrl = 'http://ahmad.16mb.com/uploadImg0.php';
        var serverUrl = RootPathPHP + UploadImg;
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = name + ".jpg";
        options.mimeType = "image/jpeg";
        options.chunkedMode = false;
        var params = {};
        params.value1 = "/Imgupload/";
        options.params = params;

        var ft = new FileTransfer();
        ft.upload(fileURL, encodeURI(serverUrl), win, fail, options);
    }
    else if (loop < 5) {
        loop++;
        upload(imageUrl, loop);
    }
    else {
        if (numSuccess == imgTake) {
            numName = 0;
            loop = 0;
            imgTake = 0;
            numSuccess = 0;
            imageUrl = [null, null, null, null, null];
            $('[id^=imageNum]').attr('src', 'image/camera_icon_1.png');
            $('#hn').val('');
            $('#name').val('');
            $('#loading').modal('hide');
            window.plugins.toast.showLongBottom('อัปโหลดสำเร็จ', function (a) {
                //console.log('toast success: ' + a)
            }, function (b) {
                //alert('toast error: ' + b)
            });
            var $active = $('.wizard .nav-tabs li.active');
            $active.next().removeClass('disabled');
            nextTab($active);
            $('#prev').hide();
            $('#next').hide();
            addClassDisable();
        }
        else {
            window.plugins.toast.showLongBottom('อัปโหลดไม่สำเร็จ กรุณาดำเนินการใหม่อีกครั้ง', function (a) {
                //console.log('toast success: ' + a)
            }, function (b) {
                //alert('toast error: ' + b)
            });
        }
    }

    function win(r) {
        //console.log("Code = " + r.responseCode);
        //console.log("Response = " + r.response);
        //console.log("Sent = " + r.bytesSent);
        numSuccess++;
        if (loop < 5) {
            upload(imageUrl, loop);
        }
        else {
            if (numSuccess == imgTake) {
                numName = 0;
                loop = 0;
                imgTake = 0;
                numSuccess = 0;
                imageUrl = [null, null, null, null, null];
                $('[id^=imageNum]').attr('src', 'image/camera_icon_1.png');
                $('#hn').val('');
                $('#name').val('');
                $('#loading').modal('hide');
                window.plugins.toast.showLongBottom('อัปโหลดสำเร็จ', function (a) {
                    //console.log('toast success: ' + a)
                }, function (b) {
                    //alert('toast error: ' + b)
                });
                var $active = $('.wizard .nav-tabs li.active');
                $active.next().removeClass('disabled');
                nextTab($active);
                $('#prev').hide();
                $('#next').hide();
                addClassDisable();
            }
            else {

                window.plugins.toast.showLongBottom('อัปโหลดไม่สำเร็จ กรุณาดำเนินการใหม่อีกครั้ง', function (a) {
                    //console.log('toast success: ' + a)
                }, function (b) {
                    //alert('toast error: ' + b)
                });
            }
        }

    }
    function fail(error) {
        //alert("An error has occurred: Code = " + error.code);
        console.log(error);
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);

    }

}
//<<<---- Func Upload ---->>>
