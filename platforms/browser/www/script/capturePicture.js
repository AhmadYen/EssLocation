var imageUrl=[null,null,null,null,null];
var numIMG = null ;
var loop = 0;
var numName = 0;
var numSuccess = 0;
var imgTake = 0;
var check_result ;


$('[id^=imageNum]').click(function(){
     numIMG = this.id.split('imageNum')[1];
    cameraTakePicture(this);
});

function cameraTakePicture(element) {
    sessionStorage.removeItem('imagepath');
    var destinationType = navigator.camera.DestinationType;
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        saveToPhotoAlbum: true,
        destinationType: destinationType.FILE_URI
    });


    function onSuccess(imageData) {
        var image = document.getElementById(element.id);
        image.src = imageData;

        if (sessionStorage.isPrototypeOf == 1) {
            getPosition();
        }
        movePic(imageData);
    }

    function onFail(message) {
        //alert('Failed because: ' + message);
        //window.plugins.toast.showLongBottom('', function(a){console.log('toast success: ' + a)}
        //    , function(b){alert('toast error: ' + b)});
    }

    function movePic(file) {
        window.resolveLocalFileSystemURL(file, resolveOnSuccess, resOnError);
    }

    function resolveOnSuccess(entry) {
        var d = new Date();
        var n = d.getTime();
        //new file name
        var newFileName = n + ".jpg";
        var myFolderApp = "MyAppFolder";

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSys) {
                //The folder is created if doesn't exist
                fileSys.root.getDirectory(myFolderApp,
                    {create: true, exclusive: false},
                    function (directory) {
                        entry.moveTo(directory, newFileName, successMove, resOnError);
                    },
                    resOnError);
            },
            resOnError);
    }

//Callback function when the file has been moved successfully - inserting the complete path
    function successMove(entry) {
        //Store imagepath in session for future use
        // like to store it in database
        sessionStorage.setItem('imagepath', entry.fullPath);
        imageUrl[numIMG]=(entry);
        numIMG = null;
        imgTake++;
        console.log(imageUrl);
    }

    function resOnError(error) {
        console.log(error);
        window.plugins.toast.showLongBottom('การบันทึกรูปภาพผิดพลาดกรุณาลองใหม่อีกครั้ง', function(a){console.log('toast success: ' + a)}
            , function(b){alert('toast error: ' + b)});
        //alert("error!!" + error.target.error.code);
    }
}

$('#upload').click(function(){
    //console.log(imgTake);
    getPosition();
    delete_img();
    if(imgTake > 0 && $('#fname').val()!= '' && gpsStatus == true){
        check_hn();
        if(check_result == ""){
            insert_location(imgTake);
        }
        else {
            update_location(imgTake);
        }
        upload(imageUrl,loop);
    }
    else if($('#fname').val()== '') {
        window.plugins.toast.showLongBottom('กดตรวจสอบรหัสผู้ป่วยก่อนทำการอัปโหลด', function(a){console.log('toast success: ' + a)}
            , function(b){alert('toast error: ' + b)});
    }
    //else if(gpsStatus == false) {
    //    window.plugins.toast.showLongBottom('การค้นหาตำแหน่งผิดพลาดกรุณาตรวจสอบการก่อนทำการอัปโหลด', function(a){console.log('toast success: ' + a)}
    //        , function(b){alert('toast error: ' + b)});
    //}
    else if(imgTake == 0 ) {
        window.plugins.toast.showLongBottom('กรุณาถ่ายภาพก่อนทำการอัปโหลด', function(a){console.log('toast success: ' + a)}
            , function(b){alert('toast error: ' + b)});
    }

});


function upload(imageUrl,loop) {

            if(loop < 5 && imageUrl[loop]!= null ){
                var fileEntry = imageUrl[loop];
                var fileURL = fileEntry.toURL();
                //imageUrl[loop] = null;
                var name = $("#hn").val() + "-" + numName;
                numName++;
                loop =loop+1;
                console.log(fileURL);

                var serverUrl = 'http://ahmad.16mb.com/uploadImg0.php';
                var options = new FileUploadOptions();
                options.fileKey = "file";
                options.fileName = name + ".jpg";
                options.mimeType = "image/jpeg";
                options.chunkedMode = false;

                var ft = new FileTransfer();
                ft.upload(fileURL, encodeURI(serverUrl), win, fail, options);
            }
            else  if(loop < 5 ){
                loop++;
                upload(imageUrl,loop);
            }
            else {
                //console.log(numSuccess +","+imgTake +"<<");
                if(numSuccess == imgTake){
                    numName = 0;
                    loop = 0;
                    imgTake = 0;
                    numSuccess = 0;
                    window.plugins.toast.showLongBottom('อัปโหลดสำเร็จ', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
                    imageUrl=[null,null,null,null,null];
                    $('[id^=imageNum]').attr('src','image/camera_icon_1.png');
                    $('#hn').val('');
                    $('#fname').val('');
                }
                else {
                    //numName = 0;
                    //loop = 0;
                    //imgTake = 0;
                    //numSuccess = 0;
                    window.plugins.toast.showLongBottom('อัปโหลดไม่สำเร็จ กรุณาดำเนินการใหม่อีกครั้ง', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
                }
            }

               function win(r) {
                   console.log("Code = " + r.responseCode);
                   console.log("Response = " + r.response);
                   console.log("Sent = " + r.bytesSent);
                   numSuccess++;
                   if(loop < 5 ){
                       //if(imageUrl[loop] != null){
                       //loop ++ ;
                           upload(imageUrl,loop);
                       //}

                   }
                   else {
                       //console.log(numSuccess +","+imgTake +">>");
                       if(numSuccess == imgTake){
                           numName = 0;
                           loop = 0;
                           imgTake = 0;
                           numSuccess = 0;
                           window.plugins.toast.showLongBottom('อัปโหลดสำเร็จ', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
                           imageUrl=[null,null,null,null,null];
                           $('[id^=imageNum]').attr('src','image/camera_icon_1.png');
                           $('#hn').val('');
                           $('#fname').val('');
                       }
                       else {
                           //numName = 0;
                           //loop = 0;
                           //imgTake = 0;
                           //numSuccess = 0;
                           window.plugins.toast.showLongBottom('อัปโหลดไม่สำเร็จ กรุณาดำเนินการใหม่อีกครั้ง', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
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


$(document).on("pagecreate","#touch_page",function(){
    $('[id^=imageNum]').on("taphold",function(){
        $('#img_delete').html("คุณต้องการลบรูปนี้"+ " "+this.id);
        var numArr = this.id.substring(8);
        //alert(numArr);
        if(imageUrl[numArr] != null){
            $('#popupDialog').popup('open');
            $('#popupDialog').attr("id_img",this.id);
        }

    });
});


$('#confirm_delete').click(function(){
    var id =  $('#popupDialog').attr("id_img");
    var numArr = id.substring(8);
    imageUrl[numArr]=null ;
    $('[id='+id+']').attr('src','image/camera_icon_1.png');

});

function check_hn (){
    var hn = $('#hn').val() ;
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        data: { 'hnParam' : hn },
        url: "http://ahmad.16mb.com/check_hnOnlocation.php",

        success: function (result) {
            console.log(result);
            check_result= result ;

        },
        error: function (request,error) {
            //console.log(request);
            window.plugins.toast.showLongBottom('กรุณาตรวจสอบอินเทอร์เนต', function(a){console.log('toast success: ' + a)}
                , function(b){alert('toast error: ' + b)});

        },
        async: false
    });
}

function insert_location (num){
    var hn = $('#hn').val() ;
    var numImage = num ;
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
        url: "http://ahmad.16mb.com/insertDatalocation.php",

        complete : function(xhr){
           console.log( xhr.status);
        }
    });
}

function update_location (num){
    var hn = $('#hn').val() ;
    var numImage = num ;

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
        url: "http://ahmad.16mb.com/updateDatalocation.php",

        complete : function(xhr){
            console.log( xhr.status);
        }
    });
}

function delete_img (){
    var hn = $('#hn').val() ;

    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        data: {'hnParam': hn
        },
        url: "http://ahmad.16mb.com/deleteImage.php",

        complete : function(xhr){
            console.log( xhr.status);
        }
    });
}