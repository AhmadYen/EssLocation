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

    $(".next-step").click(function (e) {
        var $active = $('.wizard .nav-tabs li.active');

        if(! $('#step3').hasClass("active")){
            $active.next().removeClass('disabled');
        }

        nextTab($active);

    });
    $(".prev-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        prevTab($active);

    });
});

function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
    //$('#swipe').removeClass("ui-page-active");
    //$('#swipe').removeClass("ui-page-theme-a");
    //$('#swipe').removeClass("ui-page");
    if( $('#step3').hasClass("active")){
        $('#next').css('opacity','0.5');
        $('#lbNext').html("อัปโหลด");
    }
    else {
        $('#next').css('opacity','1');
        $('#lbNext').html("ถัดไป");
    }

    if($('li[hide="true"]').hasClass("active")) {
        $('#prev').hide();
    }
    else {$('#prev').show();}

}
function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
    if( $('#step3').hasClass("active")){
        $('#next').css('opacity','0.5');
        $('#lbNext').html("อัปโหลด");
    }
    else {
        $('#next').css('opacity','1');
        $('#lbNext').html("ถัดไป");
    }

    if($('li[hide="true"]').hasClass("active")) {
        $('#prev').hide();
    }
    else {$('#prev').show();}
}

$(document).ready(function(){
    if( $('#step1').hasClass("active")){
        $('#prev').hide();
    }
    else {
        $('#prev').show();
    }

});

$('li[hide="true"]').click(function(e){
    //if($('li[hide="true"]').hasClass("active")) {
    console.log(e.target);
    $('#prev').hide();
    //}

});

$('li[hide="false"]').click(function(e){
    if(($('li[hide="false"]').hasClass("active")))
    {
        console.log(e.target);
        $('#prev').show();}

});

$('li[step="true"]').click(function(e){
    if($('li[step="true"]').hasClass("active")) {
        $('#next').css('opacity', '0.5');
        $('#lbNext').html("อัปโหลด");
    }
});

$('li[step="false"]').click(function(e){
    $('#next').css('opacity','1');
    $('#lbNext').html("ถัดไป");
});

function nextUpload() {

    $('#next').css('opacity','1');
    var $active = $('.wizard .nav-tabs li.active');
    $active.next().removeClass('disabled');

    //$('#next').removeClass('disabled');
}