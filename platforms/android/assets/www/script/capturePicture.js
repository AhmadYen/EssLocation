var imageUrl=[null,null,null,null,null];
var numIMG = null ;
var loop = 0;
var numName = 0;
var numSuccess = 0;
var imgTake = 0;
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
    if(imgTake > 0){
        upload(imageUrl,loop);
    }

});


function upload(imageUrl,loop) {

            if(loop < 5 && imageUrl[loop]!= null ){
                var fileEntry = imageUrl[loop];
                var fileURL = fileEntry.toURL();
                imageUrl[loop] = null;
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
            else{
                if(numSuccess == imgTake){
                    numName = 0;
                    loop = 0;
                    imgTake = 0;
                    window.plugins.toast.showLongBottom('อัปโหลดสำเร็จ', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
                }
                else {
                    numName = 0;
                    loop = 0;
                    imgTake = 0;
                    window.plugins.toast.showLongBottom('อัปโหลดไม่สำเร็จ กรุณาดำเนินการใหม่อีกครั้ง', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
                }

            }

               function win(r) {
                   console.log("Code = " + r.responseCode);
                   console.log("Response = " + r.response);
                   console.log("Sent = " + r.bytesSent);
                   if(loop < 5 ){
                       //if(imageUrl[loop] != null){
                           upload(imageUrl,loop);
                       //}
                       loop ++ ;
                       numSuccess++;
                   }
                   else{
                       if(numSuccess == imgTake){
                           numName = 0;
                           loop = 0;
                           imgTake = 0;
                           window.plugins.toast.showLongBottom('อัปโหลดสำเร็จ', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
                       }
                       else {
                           numName = 0;
                           loop = 0;
                           imgTake = 0;
                           window.plugins.toast.showLongBottom('อัปโหลดไม่สำเร็จ กรุณาดำเนินการใหม่อีกครั้ง', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
                       }
                   }

               }


               function fail(error) {
                   alert("An error has occurred: Code = " + error.code);
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

    $('[id='+id+']').attr('src','image/gps.png');
});