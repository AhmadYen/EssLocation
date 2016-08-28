//<< Fix for footer when the keyboard is displayed >>
$(document).on('focus',"#hn", function()
{
    $.mobile.activePage.find("footer").hide();
});

$(document).on('blur',"#hn", function()
{
    $.mobile.activePage.find("footer").show();
});
 //<< Fix for footer when the keyboard is displayed >>

//<<<---- Swipe img---->>>
$(document).on("swipe","#swipe",function(){
    $("#myCarousel").on("swiperight",function(){
        $("#myCarousel").carousel("prev");
    });
});
$(document).on("swipe","#swipe",function(){
    $("#myCarousel").on("swipeleft",function(){
        $("#myCarousel").carousel("next");
    });
});
//<<<----End Swipe img---->>>

//<<<----img loading---->>>
$('#close_modal').click(function(){
    $("#help").removeClass('ui-btn-active');
});
//<<<----End img loading---->>>

//<<< Remove Class Mobile>>>
$(document).click(function(){
    $(this).find('.ui-page').removeAttr('tabindex');
    $(this).find('.ui-page').removeClass('ui-page-theme-a');
    $(this).find('.ui-page').removeClass('ui-page-active');
    $(this).find('.ui-loader').remove();
});
//<<< Remove Class Mobile>>>

//<< Clear text >>
$(function(){
    $("#hn").addClear();
});
//<< Clear text >>

//<< photo none slide auto >>
$(document).ready(function() {
    $('.carousel').each(function(){
        $(this).carousel({
            interval: false
        });
    });
});
//<< photo none slide auto >>

//<<< Key press Number Hn>>>
function CheckNum() {
    if (event.keyCode < 48 || event.keyCode > 57) {
        event.returnValue = false;
    }
};
//<<< Key press Number Hn>>>

//<<<-- button back -->>>
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady(){
    document.addEventListener("backbutton", function(e){
        if(location.href="rootPage.html"){
            //e.preventDefault();
            //navigator.app.exitApp();
            alert('OK');
        }
        else if(location.href="index.html"){
            //navigator.app.backHistory()
            e.preventDefault();
            navigator.app.exitApp();
            //alert('NO');
        }
    }, false);
}
//<<<-- button back -->>>
