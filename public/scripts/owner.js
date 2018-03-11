$('#restaurantByID').hide();
$('.loginreg').hide();
$(document).ready(function() {
  // Makes sure that the cart and login arent displayed at the same time
  $("#loginregbtn").click(function() {
    $(".loginreg").fadeToggle();
  });
  // shows the restaurant data for clicked restaurant
  $(".restaurantClick").on("click", function() {
    console.log('it clicks');
    $('#restaurantByID').fadeToggle();
  });

  //loads the menu data
  const loadRestData = function() {
    $.get("/restaurant/data/owner/id", renderMenu);
  };

  //renders the menu data with handlebars
  const renderRestData = function(data) {
    var source = $("#dataTemplate").html();
    var template = Handlebars.compile(source);
    var html = template(data);
    $("#body").html(html);
  };
  //renders the restaurant data with handlebars
  const renderRestaurants = function(data) {
    var source = $("#restTemplate").html();
    var template = Handlebars.compile(source);
    var html = template(data);
    $("#body").html(html);
  };

  //loads the restaurant data
  const loadRestaurants = function() {
    $.get("/restaurants/owner/id", renderRestaurants);
  };


  //calls the load restaurant lists
  loadRestaurants();
});
