var imageUrl=[null,null,null,null,null];
var numIMG = null;
var imgTake = 0;
var imgShow ;
var imgElement ;

//<<<----Click Img take photo- ---->>>
$('[id^=imageNum]').click(function(){
     numIMG = this.id.split('imageNum')[1];
    if(imageUrl[numIMG] == null){
        //console.log(imageUrl[numIMG]);
        cameraTakePhoto(this);
    }
    else {
        imgElement = this ;
        $('#test').modal('show');
        imgShow = imageUrl[numIMG];
    }
});
//<<<----Click Img take photo- ---->>>

//<<<----Click Img show- ---->>>
$('#showPhoto').click(function(){
        $('#test').modal('hide');
        $('#smallImage').attr('src',imgShow.nativeURL);
        $('#showIMG').modal('show');
});
//<<<----Click Img show ---->>>

//<<<----Click Take photo----->>>
$('#takePhoto').click(function(){
    $('#test').modal('hide');
   cameraTakePhoto(imgElement);
});
//<<<----Click Take photo----->>>

//<<<----Click Delete photo----->>>
$('#deletePhoto').click(function(){
    $('#test').modal('hide');
    imgTake--;
    if(imgTake < 3){
        $('li[step="3"]').addClass('disabled');
    }
    imageUrl[imgElement.id.split('imageNum')[1]] = null ;
    $(imgElement).attr('src','image/takePhoto.png');
});
//<<<----Click Delete photo----->>>

//<<<---- Function Take Picture ---->>>
function cameraTakePhoto(element) {
    sessionStorage.removeItem('imagepath');
    var destinationType = navigator.camera.DestinationType;

    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        saveToPhotoAlbum: true,
        destinationType: destinationType.FILE_URI
    });

    function onSuccess(imageData) {
        //<<<---- Set img show to html ---->>>
        var image = document.getElementById(element.id);
        image.src = imageData;
        //console.log(imageData);
        //<<<---- Set img show to html ---->>>

        if (sessionStorage.isPrototypeOf == 1) {
            getPosition();
        }
        //<<<---- Save img to memory ---->>>
        movePic(imageData);
        //<<<---- Save img to memory ---->>>
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
    }

    function resOnError(error) {
        //console.log(error);
        window.plugins.toast.showLongBottom('การบันทึกรูปภาพผิดพลาดกรุณาลองใหม่อีกครั้ง');
        //alert("error!!" + error.target.error.code);
    }
}
//<<<---- Function Take Picture ---->>>





