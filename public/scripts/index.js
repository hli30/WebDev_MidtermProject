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

  //shows and hides the shopping cart but makes sure that the login isnt visible
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

  //the button that hides the menu and shows the rest list
  $("#menu").on("click", '[data-return-toRest]', function() {
    $('#restList.container').show();
    $("#menu").hide();
  });

  //when done looking at the order confirmation form it hides it and then shows the restaurant list
  $("#orderConf").on("click", '[data-return-toRest]', function() {
    $('#restList.container').show();
    $('#orderConf').hide();
    $("#menu").hide();

  });

  //renders the menu data with handlebars
  function makeTemplateFnFromId(id){
    var source = $(id).html();
    var templateFn = Handlebars.compile(source);
    return templateFn;
  }

  function makePartialWithId(name){
    var source = $('#' + name).html();
    Handlebars.registerPartial(name, source);
  }

  //function that makes a partial if needed
  makePartialWithId('menuTemp');
  var menuTemplate = makeTemplateFnFromId('#menuTemplate');
  var cartTemplate = makeTemplateFnFromId('#cartTemp');

  var cartLength;
  var cartTotal;

  var renderCart = function(itemsInCart) {
    console.log(itemsInCart);
    cartTotal = 0;
    cartLength = 0;
    itemsInCart.order.forEach(function(item) {
      cartLength += Number(item.quantity);
      cartTotal += Number(item.price) * Number(item.quantity);
    });

    $('#checkoutBtn').on("click", function(){
      $('#orderConf').show();
      $('#restList.container').hide();
      $("#menu").hide();
      renderCart({order: []});
      $.get('/checkout/submit');
    });
    
    $('#navBadge').text(cartLength);
    $('#cartCount').text(cartLength);
    var templateHtml = cartTemplate(itemsInCart);
    $("#cartBody").html(templateHtml);
  };

  //when click on menu item it gets the food id and restaurant id from the element and posts it to the server
  $("#menu").on("click", '.foodthing', function(event) {
    var foodID = $(event.target).closest('.foodthing').data('foodid');
    var restID = $(event.target).closest('.foodthing').data('restid');
    $.post(`/checkout`, {foodID: foodID, restID: restID}, renderCart);
  });

  //renders menu items
  var renderMenu = function(menuData) {
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

  $("#shoppingcart").on("click", '#removeFromCart', function(event) {
    console.log('made it into the button');
    var foodID =  $(event.target).closest('.foodItem').data('cartfoodid');
    console.log(foodID);
    $.post(`/checkout/delete/`, {foodID: foodID}, renderCart);
  });


  //renders the restaurant data with handlebars
  var renderRestaurants = function(restaurants) {
    var source = $("#restaurantTemplate").html();
    var template = Handlebars.compile(source);
    var templateHtml = template(restaurants);
    $("#restlist").html(templateHtml);
  };

  //loads the restaurant data
  var loadRestaurants = function() {
    $.get("/restaurant", renderRestaurants);
  };

  //calls the load restaurant lists
  loadRestaurants();
});
