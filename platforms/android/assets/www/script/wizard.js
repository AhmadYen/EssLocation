$(document).ready(function () {
    //Initialize tooltips
    //$('.nav-tabs > li a[title]').tooltip();

    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

        var $target = $(e.target);

        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    //<<<---- Click Next Step ---->>>
    $(".next-step").click(function (e) {
        var $active = $('.wizard .nav-tabs li.active');

       if(! $('#next').attr('upload')){
           //if(! $('#step3').hasClass("active")){
           //    $active.next().removeClass('disabled');
           //}
           if($('#step1').hasClass("active")){
               if($('#name').attr('next-step') == "true" && $('#hn').val() != '' && $('#name').val() !=''){
                   $active.next().removeClass('disabled');
                   nextTab($active);
               }
               else{
                   //$('#next').css('opacity','0.5');
                   $('#name').val('');
                   $('#address').val('');
                   $('#name').removeAttr('next-step','true');
                   $('li[step="2"]').addClass('disabled');
                   $('li[step="3"]').addClass('disabled');
                   $('li[step="4"]').addClass('disabled');
                   window.plugins.toast.showLongBottom('กรุณาตรวจสอบรหัสผู้ป่วยก่อนไปยังขั้นตอนถัดไป', function(a)
                   {
                       //console.log('toast success: ' + a)
                        }
                       , function(b){
                           //alert('toast error: ' + b)
                       });
               }
           }
           else if($('#step2').hasClass("active")){
               if(imgTake >= 3){
                   $active.next().removeClass('disabled');
                   nextTab($active);
               }
               else{

                   window.plugins.toast.showLongBottom('กรุณาถ่ายภาพอย่างน้อย 3 ถาพก่อนไปยังขั้นตอนถัดไป', function(a){
                       //console.log('toast success: ' + a)
                   }
                       , function(b){
                           //alert('toast error: ' + b)
                       });
               }

           }
           else if($('#step3').hasClass("active")){

                   window.plugins.toast.showLongBottom('กรุณาค้นหาตำแหน่งก่อนทำการอัปโหลด', function(a){
                       //console.log('toast success: ' + a)
                   }
                       , function(b){
                           //alert('toast error: ' + b)
                       });
           }
       }
        else if($('#next').attr('upload')){
           if($('#txtLat').val() != "" && $('#txtLng').val() != "")
           {
               uploadImageToServer();
           }
           else {
               window.plugins.toast.showLongBottom('กรุณาค้นหาพิกัดก่อนทำการอัปโหลด', function(a){
                   //console.log('toast success: ' + a)
               }
                   , function(b){
                       //alert('toast error: ' + b)
                   });
           }

       }
    });
    //<<<---- Click Next Step ---->>>

    //<<<---- Click Prev Step ---->>>
    $(".prev-step").click(function (e) {
        var $active = $('.wizard .nav-tabs li.active');
        prevTab($active);
    });
    //<<<---- Click Prev Step ---->>>

});

//<<<---- Next Step ---->>>
function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
    $(elem).next().find('a[data-toggle="tab"]').removeAttr('hide');

    if( $('#step3').hasClass("active") && gpsStatus == false){
        //$('#next').css('opacity','0.5');
        $('#lbNext').html("อัปโหลด");
    }
    else if( $('#step3').hasClass("active") && gpsStatus == true){
        $('#lbNext').html("อัปโหลด");
        $('#next').attr('upload','true');
    }
    else  if($('#step2').hasClass("active") && imgTake  < 3 ) {
        //$('#next').css('opacity','0.5');
        $('#lbNext').html("ถัดไป");
    }
    else {
        //$('#next').css('opacity','1');
        $('#lbNext').html("ถัดไป");
    }

    if($('#step1').hasClass("active")) {
        $('#prev').hide();
    }
    else {$('#prev').show();}
}
//<<<---- Next Step ---->>>

//<<<---- Prev Step ---->>>
function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();

    if($('#step1').hasClass("active")) {
        $('#prev').hide();
    }
    else {$('#prev').show();}

    if($('#next').attr('upload')){
        $('#next').removeAttr('upload');
    }

    if(! $('#step3').hasClass("active")) {
        $('#next').css('opacity','1');
        $('#lbNext').html("ถัดไป");
    }
}
//<<<---- Prev Step ---->>>

//<<<---- Hide prev Step 1 ---->>>
$(document).ready(function(){
    if( $('#step1').hasClass("active")){
        $('#prev').hide();
        //$('#next').css('opacity','0.5');
    }
    else {
        $('#prev').show();
    }

});
//<<<---- Hide prev Step 1 ---->>>

//<<<--- Click Wizard navbar ---->>>
$('a[data-toggle="tab"]').click(function(e){
    if($(this).attr('href')== "#step1" ){
        //$('#next').css('opacity','1');
        $('#lbNext').html("ถัดไป");
        $('#prev').hide();
        $('#next').removeAttr('upload');
    }
    else if($(this).attr('href') == "#step2"){
        //if($(this).attr('hide')){
        //    //$('#prev').hide();
        //}
        //else {
        //    //$('#next').css('opacity','1');
        //    $('#lbNext').html("ถัดไป");
        //    $('#prev').show();
        //}
        if(! $('li[step="2"]').hasClass('disabled')){
            $('#lbNext').html("ถัดไป");
            $('#prev').show();
            $('#next').removeAttr('upload');
        }

    }
    else if($(this).attr('href') == "#step3"){
        //if($(this).attr('hide')){
        //    //$('#prev').hide();
        //}
        //else {
        //    //$('#next').css('opacity','0.5');
        //    $('#lbNext').html("อัปโหลด");
        //    $('#prev').show();
        //}
        if(! $('li[step="3"]').hasClass('disabled') && imgTake >= 3){
            $('#next').attr('upload','true');
            $('#lbNext').html("อัปโหลด");
            $('#prev').show();
        }
    }
});
//<<<--- Click Wizard navbar ---->>>
function finish(){
    numName = 0;
    loop = 0;
    imgTake = 0;
    numSuccess = 0;
    imageUrl = [null, null, null, null, null];
    $('[id^=imageNum]').attr('src', 'image/camera_icon_1.png');
    $('#hn').val('');
    $('#name').val('');
    window.location = window.location.href;
};

function addClassDisable (){
    $('a[href="#step1"]').attr('hide','true');
    $('a[href="#step2"]').attr('hide','true');
    $('li[role="presentation"]').addClass('disabled');
}