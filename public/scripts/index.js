$('.loginreg').hide();
$('.shopping-cart').hide();
$('#menu').hide();
$('#orderConf').hide();

$(function() {
  // Makes sure that the cart and login arent displayed at the same time
  $("#loginregbtn").click(function() {
    if($('.shopping-cart').is(':visible')){
      $('.shopping-cart').hide();
    }
    $(".loginreg").fadeToggle();
  });

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
  });

  $("#menu").on("click", '[data-return-toRest]', function() {
    $('#restList.container').show();
    $("#menu").hide();
  });


  $("#orderConf").on("click", '[data-return-toRest]', function() {
    $('#restList.container').show();
    $('#orderConf').hide();
    $("#menu").hide();

  });

  $('#checkoutBtn').on("click", function(){

    $('#orderConf').show();
    $('#restList.container').hide();
    $("#menu").hide();
    Materialize.toast('Add items to your cart first', 1500);
  });

  //renders the menu data with handlebars
  function makeTemplateFnFromId(id){
    var source = $(id).html();
    var templateFn = Handlebars.compile(source);
    return templateFn;
  }

  function makePartialWithId(name){
    const source = $('#' + name).html();
    Handlebars.registerPartial(name, source);
  }

  makePartialWithId('menuTemp');
  const menuTemplate = makeTemplateFnFromId('#menuTemplate');
  const cartTemplate = makeTemplateFnFromId('#cartTemp');

  const renderCart = function(itemsInCart) {
    var countOfCart = itemsInCart.length;
    console.log(countOfCart);
    $('#navBadge').text(countOfCart);
    $('#cartCount').text(countOfCart);

    var templateHtml = cartTemplate(itemsInCart);
    console.log('cart template?', templateHtml);
    $("#cartBody").html(templateHtml);
  };

  //when click on menu item it gets the food id and restaurant id from the element and posts it to the server
  $("#menu").on("click", '.foodthing', function(event) {
    var foodID = $(event.target).closest('.foodthing').data('foodid');
    var restID = $(event.target).closest('.foodthing').data('restid');
    $.post(`/checkout`, {foodID: foodID, restID: restID}, renderCart);
  });

  //renders menu items
  const renderMenu = function(menuData) {
    var templateHtml = menuTemplate(menuData);
    $("#menu").html(templateHtml);
  };

  //renders menu based on the restaurant click
  $("#restlist").on("click", '[data-restaurant-id]', function(event) {
    const restaurantId = $(this).data('restaurantId');
    $('#restList.container').hide();
    $("#menu").show();
    $.get(`/restaurant/${restaurantId}`, renderMenu);
  });

  //renders the restaurant data with handlebars
  const renderRestaurants = function(restaurants) {
    var source = $("#restaurantTemplate").html();
    var template = Handlebars.compile(source);
    var templateHtml = template(restaurants);
    $("#restlist").html(templateHtml);
  };

  //loads the restaurant data
  const loadRestaurants = function() {
    $.get("/restaurant", renderRestaurants);
  };

  //calls the load restaurant lists
  loadRestaurants();
});
