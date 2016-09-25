var loop = 0;
var numName = 0;
var numSuccess = 0;

//<<<---- Click Upload ---->>>
function uploadImageToServer(){
        $('#loading').modal('show');
        update_location(imgTake);
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
            $('#loading').modal('hide');
            window.plugins.toast.showLongBottom('อัปโหลดสำเร็จ', function (a) {
                //console.log('toast success: ' + a)
            }, function (b) {
                //alert('toast error: ' + b)
            });
            $('#patient').val( $('#name').val());
            $('#latFinish').val($('#txtLat').val());
            $('#lngFinish').val($('#txtLng').val());
            var $active = $('.wizard .nav-tabs li.active');
            $active.next().removeClass('disabled');
            nextTab($active);
            $('#nexts').remove();
            $('#prevs').remove();
            $('#prev').hide();
            $('#next').hide();
            addClassDisable();
            $('#stepFooter').append('<div class="col-xs-12" style="top: 4px; text-align: center;">'+
                '<p id="finish" onclick="finish()" style="font-size: 25px; color: #999999;">เสร็จสิ้น</p></div>');
            showImgComplete();
        }
        else {
            $('#loading').modal('hide');
            window.plugins.toast.showLongBottom('อัปโหลดไม่สำเร็จ กรุณาลองใหม่อีกครั้ง', function (a) {
                //console.log('toast success: ' + a)
            }, function (b) {
                //alert('toast error: ' + b)
            });
        }
    }

    function win(r) {
        numSuccess++;
        if (loop < 5) {
            upload(imageUrl, loop);
        }
        else {
            if (numSuccess == imgTake) {
                $('#loading').modal('hide');
                window.plugins.toast.showLongBottom('อัปโหลดสำเร็จ', function (a) {
                    //console.log('toast success: ' + a)
                }, function (b) {
                    //alert('toast error: ' + b)
                });
                $('#patient').val( $('#name').val());
                $('#latFinish').val('ละติจูต : ' + $('#txtLat').val());
                $('#lngFinish').val('ลองจิจูด : ' + $('#txtLng').val());
                var $active = $('.wizard .nav-tabs li.active');
                $active.next().removeClass('disabled');
                nextTab($active);
                $('#prev').hide();
                $('#next').hide();
                addClassDisable();
                $('#nexts').remove();
                $('#prevs').remove();
                $('#prev').hide();
                $('#next').hide();
                addClassDisable();
                $('#stepFooter').append('<div class="col-xs-12" style="top: 4px; text-align: center;">'+
                    '<p id="finish" onclick="finish()" style="font-size: 25px; color: #999999;">เสร็จสิ้น</p></div>');
                showImgComplete();
            }
            else {
                $('#loading').modal('hide');
                window.plugins.toast.showLongBottom('อัปโหลดไม่สำเร็จ กรุณาลองใหม่อีกครั้ง', function (a) {
                    //console.log('toast success: ' + a)
                }, function (b) {
                    //alert('toast error: ' + b)
                });
            }
        }

    }
    function fail(error) {
        console.log(error);
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);

    }

}
//<<<---- Func Upload ---->>>


function showImgComplete (){
    var show = '<h5 style="text-align: left; position: relative">พิกัดผู้ป่วย</h5><div>' ;
    $.each(imageUrl, function( index, value ) {
        //alert( index + ": " + value.nativeURL );
        if(value != null){
            show = show.concat('<img class="form-inline" id="imageNum1" src="'+value.nativeURL+'" class="img-responsive" style="width: 20%; margin: 4px">');
        }

    });
    $('#fnImage').append(show+'</div>');
}