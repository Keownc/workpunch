$(function(){

    //Accordion code
    $('#tabs article').hide().eq(0).show();

    $('#tabsNav li').on('click', function(e){
        e.preventDefault();
        $('#tabs article').hide();

        $('#tabsNav .current').removeClass('current');
        $(this).addClass('current');

        var action =$(this).find('a:first').attr('href');
        $('#tabs '+ action).fadeIn('fast');
    }).eq(0).addClass('current');

    //Modal code
    //open modal window
    $('.modalClick').on('click', function(e){
        e.preventDefault();
        $('#overlay').fadeIn().find('#modal').fadeIn();
    });
    //Close modal windiw
    $('.close').on('click', function(e){
        e.preventDefault();
        $('#overlay').fadeOut().find('#modal').fadeOut();

    });

});
