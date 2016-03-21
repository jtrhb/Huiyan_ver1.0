/**
 * Created by jtrhb on 2016/3/21.
 */
window.onload = function(){
    h1 = document.getElementById('specialTopicTop').offsetHeight;
    h2 = document.getElementById('horizontalMenuOuterContainer').offsetHeight + h1;
}

$(function(){
    var ss = $(document).scrollTop();
    $(window).scroll(function(){
        var s = $(document).scrollTop();

        if(s< h1){
            $('.side-menu-outer-container').removeClass('yya');
        }if(s > h1){
            $('.side-menu-outer-container').addClass('yya');
        }if(s > h2){
            $('.side-menu-outer-container').addClass('gizle');
            if(s > ss){
                $('.side-menu-outer-container').removeClass('sabit');
            }else{
                $('.side-menu-outer-container').addClass('sabit');
            }
            ss = s;
        }

    });

});