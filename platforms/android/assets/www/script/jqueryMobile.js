$(document).ready(function() {
    //<< photo none slide auto >>

    $('.carousel').each(function(){
        $(this).carousel({
            interval: false
        });
    });
    //<< photo none slide auto >>
    getUrlVars();

    assignment(username) ;

});

// Read a page's GET URL variables and return them as an associative array.
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    username = vars.username ;
    assignby = vars.assignby ;
    date = vars.date ;
    $('#lbUser').html(username+'<span class="glyphicon glyphicon-user pull-right"></span>');
    // $('#dateUser').html(date+'<span class="glyphicon glyphicon-user pull-right"></span>');
}
// Read a page's GET URL variables and return them as an associative array.

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
// $(function(){
//     $("#hn").addClear();
// });

//$('#clearHn').click(function(){
//
//        $('#name').removeAttr('next-step','true');
//        $('li[step="2"]').addClass('disabled');
//        $('li[step="3"]').addClass('disabled');
//        $('li[step="4"]').addClass('disabled');
//
//});
//<< Clear text >>

//<<< Key press Number Hn>>>
function CheckNum() {
    if (event.keyCode < 48 || event.keyCode > 57) {
        event.returnValue = false;
    }
};
//<<< Key press Number Hn>>>

$('#hn').click(function(){
    $("#name").val('');
    $("#address").val('');
});

