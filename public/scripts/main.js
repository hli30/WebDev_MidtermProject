   $('.loginreg').hide();
   $('.shopping-cart').hide();
   $('#menu').hide();

$(document).ready(function() {
  // Makes sure that the cart and login arent displayed at the same time
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

  //shows or hides the menu/restaurant list as needed
  $(".showRestaurantMenu").on("click", function() {
       $('#restList.container').hide();
       $("#menu").show();
    })

  $("#menuToRest").on("click", function() {
     $("#menu").hide();
     $('#restList.container').show();
    })

    $(".restaurantClick").on("click", function() {
      console.log('it clicks')
      $('#restaurantByID').fadeToggle();
    });

    //loads the menu data
    const loadMenu = function() {
      $.get("/restaurant/food", renderMenu);
    };
    //loads the restaurant data
    const loadRestaurants= function() {
      $.get("/restaurants", renderRestaurants);
    };
    //renders the menu data with handlebars
    const renderMenu= function(data) {
      var source= $("#menuTemplate").html()

      var template = Handlebars.compile(source);
      var html = template(data);
      $("#body").html(html);
    }
    //renders the restaurant data with handlebars
    const renderRestaurants= function(data) {
      var source= $("#restTemplate").html()

      var template = Handlebars.compile(source);
      var html = template(data);
      $("#body").html(html);
    }

















      //calls the load restaurant lists
      loadRestaurants()
})
