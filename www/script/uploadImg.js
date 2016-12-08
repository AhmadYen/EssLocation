var loop = 0;
var numName = 0;
var numSuccess = 0;

//<<<---- Click Upload ---->>>
function uploadImageToServer(){
        $('#loading').modal('show');
        // update_location(imgTake);
        delete_img();
        upload(imageUrl,loop);
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

        //var serverUrl = 'http://ahmad.16mb.com/uploadImg.php';
        var serverUrl = RootPathPHP + "uploadImg.php";
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = name + ".jpg";
        options.mimeType = "image/jpeg";
        options.chunkedMode = false;
        var params = {};
        params.value1 = UploadImg;
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
             update_location(imgTake);
            // $('#loading').modal('hide');
            // window.plugins.toast.showLongBottom('อัปโหลดสำเร็จ', function (a) {
            //     //console.log('toast success: ' + a)
            // }, function (b) {
            //     //alert('toast error: ' + b)
            // });
            // $('#patient').val( $('#name').val());
            // $('#latFinish').val($('#txtLat').val());
            // $('#lngFinish').val($('#txtLng').val());
            // var $active = $('.wizard .nav-tabs li.active');
            // $active.next().removeClass('disabled');
            // nextTab($active);
            // $('#nexts').remove();
            // $('#prevs').remove();
            // $('#prev').hide();
            // $('#next').hide();
            // addClassDisable();
            // $('#stepFooter').append('<div class="col-xs-12" style="top: 4px; text-align: center;">'+
            //     '<p id="finish" onclick="finish()" style="font-size: 25px; color: #999999;">เสร็จสิ้น</p></div>');
            // showImgComplete();
        }
        else {
            $('#loading').modal('hide');
            window.plugins.toast.showLongBottom('อัปโหลดไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
        }
    }

    function win(r) {
        numSuccess++;
        if (loop < 5) {
            upload(imageUrl, loop);
        }
        else {
            if (numSuccess == imgTake) {
                 update_location(imgTake);
                // $('#loading').modal('hide');
                // window.plugins.toast.showLongBottom('อัปโหลดสำเร็จ');
                // $('#patient').val( $('#name').val());
                // $('#latFinish').val($('#txtLat').val());
                // $('#lngFinish').val($('#txtLng').val());
                // var $active = $('.wizard .nav-tabs li.active');
                // $active.next().removeClass('disabled');
                // nextTab($active);
                // $('#prev').hide();
                // $('#next').hide();
                // addClassDisable();
                // $('#nexts').remove();
                // $('#prevs').remove();
                // $('#prev').hide();
                // $('#next').hide();
                // addClassDisable();
                // $('#stepFooter').append('<div class="col-xs-12" style="top: 4px; text-align: center;">'+
                //     '<p id="finish" onclick="finish()" style="font-size: 25px; color: #999999;">เสร็จสิ้น</p></div>');
                // showImgComplete();
            }
            else {
                $('#loading').modal('hide');
                window.plugins.toast.showLongBottom('อัปโหลดไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
            }
        }

    }
    function fail(error) {
        console.log(error);
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
        $('#loading').modal('hide');
                window.plugins.toast.showLongBottom('อัปโหลดไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
    }

}
//<<<---- Func Upload ---->>>


function showImgComplete (){
    var show = '<h5 style="text-align: left; position: relative; margin-top: 15px">รูปภาพที่พักผู้ป่วย</h5><div>' ;
    $.each(imageUrl, function( index, value ) {
        if(value != null){
            show = show.concat('<img class="form-inline"  src="'+value.nativeURL+'" class="img-responsive" style="height: 50px; margin: 2px">');
        }
    });
    $('#fnImage').html(show+'</div>');
}