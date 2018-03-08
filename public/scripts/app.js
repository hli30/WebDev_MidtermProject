   $('.loginreg').hide();
   $('.shopping-cart').hide();

$(document).ready(function() {

  $("#loginregbtn").click(function() {
    if($('.shopping-cart').is(':visible')){
       $('.shopping-cart').hide();
    }
    $(".loginreg").fadeToggle();
  })

  $("#cart").on("click", function() {
    if($('.loginreg').is(':visible')){
       $('.loginreg').hide();
    }
    $(".shopping-cart").fadeToggle();
  });


})
