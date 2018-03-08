   $('.loginreg').hide();
   $('.shopping-cart').hide();
   $('#menu').hide();
$(document).ready(function() {
  $(".button-collapse").sideNav();
  
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

  $(".showRestaurantMenu").on("click", function() {
       $('#restList.container').hide();
       $("#menu").show();
    })

    $("#menuToRest").on("click", function() {
       $("#menu").hide();
       $('#restList.container').show();
      })

      const loadMenu = function() {
        $.get("/restaurant/food", renderMenu);
      };

      const loadRestaurants= function() {
        $.get("/restaurants", renderRestaurants);
      };

      const renderMenu= function(data) {
        var source= $("#menuTemplate").html()

        var template = Handlebars.compile(source);
        var html = template(data);
        $("#body").html(html);
      }

      const renderRestaurants= function(data) {
        var source= $("#restTemplate").html()

        var template = Handlebars.compile(source);
        var html = template(data);
        $("#body").html(html);
      }


      loadRestaurants()











})
