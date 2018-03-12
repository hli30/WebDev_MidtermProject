$('#loginform').hide();
$('.shopping-cart').hide();
$('#menu').hide();

$(function() {

  //declaring the variables for cart total and length
  var cartLength = 0;
  var cartTotal = 0;
  // Makes sure that the cart and login arent displayed at the same time
  //pretends to log a user in
  $("#loginregbtn").click(function() {
    var logincheck = $('#loginregbtn').text();
    if( logincheck === 'Login'){
      $("#loginform").fadeToggle();
    }
    if( logincheck === 'Logout'){
      $('#loginregbtn').text('Login');
      Materialize.toast('Logged out', 2000);
    }
    if($('.shopping-cart').is(':visible')){
      $('.shopping-cart').hide();
    }
  });

  $('#registerUser').on('click', function(){
    $('#registerForm').trigger("reset");
    $('#loginregbtn').text('Logout');
    $('#loginform').hide();
  });

  $('#loginButton').on('click', function(){
    $('#loginform').trigger("reset");
    $('#loginregbtn').text('Logout');
    $('#loginform').hide();
  });
  //shows and hides the shopping cart but makes sure that the login isnt visible
  $("#cart").on("click", function() {
    if($('#loginform').is(':visible')){
      $('#loginform').hide();
    }
    $(".shopping-cart").fadeToggle();
  });

  //shows or hides the menu/restaurant list as needed
  $(".showRestaurantMenu").on("click", function() {
    $('#renderedRestaurants').hide();
    $("#menu").show();
  });

  //the button that hides the menu and shows the rest list
  $("#menu").on("click", '[data-return-toRest]', function() {
    if(cartLength > 0){
      Materialize.toast('You cant order from multiple places, clear your cart first', 2000);
    } else {
      $('#renderedRestaurants').show();
      $("#menu").empty();
    }
  });

  //when done looking at the order confirmation form it empties the div it and then shows the restaurant list
  $("#orderConf").on("click", '[data-return-toRest]', function() {
    $('#orderConf').empty();
    $('#renderedRestaurants').show();
    $("#menu").hide();
  });

  //renders the menu data with handlebars
  function makeTemplateFnFromId(id){
    var source = $(id).html();
    var templateFn = Handlebars.compile(source);
    return templateFn;
  }

  //functions that make the handlebars compiled templates
  var menuTemplate = makeTemplateFnFromId('#menuTemplate');
  var cartTemplate = makeTemplateFnFromId('#cartTemp');
  var orderConf = makeTemplateFnFromId('#orderTemp');

  //function that makes a partial if needed
  function makePartialWithId(name){
    var source = $('#' + name).html();
    Handlebars.registerPartial(name, source);
  }
  //calls the partials render function
  makePartialWithId('menuTemp');

  //renders the cart elements including the totals, quantity badge
  var renderCart = function(itemsInCart) {
    cartTotal = 0;
    cartLength = 0;
    var templateHtml = cartTemplate(itemsInCart);
    $("#cartBody").html(templateHtml);
    itemsInCart.order.forEach(function(item) {
      cartLength += Number(item.quantity);
      cartTotal += Number(item.price) * Number(item.quantity);
      if(cartLength > 0){
        $('#navCartBadge').addClass('new light-green darken-4');
      }
      $('#navCartBadge').text(cartLength);
      $('#cartCount').text(cartLength);
      $('#cartTotal').text('Total: $' + cartTotal);
    });
  };

  //renders the cart elements including the totals, quantity badge
  var renderEmptyCart = function(itemsInCart) {
    cartTotal = 0;
    cartLength = 0;
    var templateHtml = cartTemplate(itemsInCart);
    $("#cartBody").html(templateHtml);
    $('#navCartBadge').text('');
    $('#cartCount').text('');
    $('#cartTotal').text('');
  };


  //formats phone nuber into (###) ### ####
  function normalize(phone) {
    //normalize string and remove all unnecessary characters
    phone = phone.replace(/[^\d]/g, "");
    //check if number length equals to 10
    if (phone.length == 10) {
      //reformat and return phone number
      return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    }
    return null;
  }

  //renders the final order confirmation element
  var renderOrderConf = function(itemsInCart) {
    var templateHtml = orderConf(itemsInCart);
    $('#orderConf').html(templateHtml);
    var restName = itemsInCart.restaurant[0].name;
    var restPhoneNum = normalize(itemsInCart.restaurant[0].phone_number);
    var restAddress = itemsInCart.restaurant[0].address;
    var orderID = itemsInCart.orderID;
    cartTotal = 0;
    cartLength = 0;
    $('#restName').text(restName);
    $('#restPhoneNum').text(restPhoneNum);
    $('#restAddress').text(restAddress);
    $('#orderID').text('Order #:' + orderID);
    itemsInCart.order.forEach(function(item) {
      cartLength += Number(item.quantity);
      cartTotal += Number(item.price) * Number(item.quantity);
      $('#orderCount').text('Items: ' + cartLength);
      $('#orderTotal').text('Total: $' + cartTotal);
    });
  };

  //resets on screen information regarding the cart information
  $('#checkoutBtn').on("click", function(){
    var loggedInCheck = $('#loginregbtn').text();
    if(loggedInCheck === "Login"){
      Materialize.toast('Login or register first', 1500);
      return;
    }
    if(cartLength > 0){
      $('orderConf').show();
      $('#navCartBadge').removeClass('new light-green darken-1');
      $('#navCartBadge').text('');
      $('#cartCount').text('');
      $('#cartTotal').text('');
      $('#restList.container').hide();
      $("#menu").hide();
      $('.shopping-cart').hide();
      $.get('/checkout/submit', renderOrderConf);
    } else {
      Materialize.toast('Add items to your cart first', 1500);
    }
  });

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
    $('#renderedRestaurants').hide();
    $("#menu").show();
    $.get(`/restaurant/${restaurantId}`, renderMenu);
  });

  $("#shoppingcart").on("click", '#removeFromCart', function(event) {
    var foodID =  $(event.target).closest('.foodItem').data('cartfoodid');
    console.log(foodID);
    $.post(`/checkout/delete/`, {foodID: foodID}, renderCart);
  });

  //clears the current cart of all items
  $('#clearCart').on('click', function(event){
    $('#orderCount').text('');
    $('#orderTotal').text('');
    $.get(`/checkout/emptycart`, renderEmptyCart);
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
