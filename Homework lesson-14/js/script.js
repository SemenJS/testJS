$(document).ready(function(){
    $('.main_btna, .main_btn, .a[href="#sheldure"]').on('click', function(){
        $('.overlay').fadeIn(1000);
        $('.modal').slideDown(1000);
    });

    $('.close').on('click', function(){
        $('.modal').slideUp(1000);
        $('.overlay').fadeOut(1000);
    });
});