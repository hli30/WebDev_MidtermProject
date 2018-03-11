$('.loginreg').hide();
$('.shopping-cart').hide();
$('#menu').hide();

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

  //declaring the variables for cart total and length
  var cartLength = 0;
  var cartTotal = 0;

  //renders the cart elements including the totals, quantity badge
  var renderCart = function(itemsInCart) {
    var templateHtml = cartTemplate(itemsInCart);
    $("#cartBody").html(templateHtml);
    console.log(itemsInCart);
    cartTotal = 0;
    cartLength = 0;
    itemsInCart.order.forEach(function(item) {
      cartLength += Number(item.quantity);
      cartTotal += Number(item.price) * Number(item.quantity);
      if(cartLength > 0){
        $('#navCartBadge').addClass('new red');
      }
      $('#navCartBadge').text(cartLength);
      $('#cartCount').text(cartLength);
      $('#cartTotal').text('Total: $' + cartTotal);
    });
  };

  //should render the cart on click of the actual cart item but doesnt yet;
  // $('#cart').on('click', function(){
  //   $.post(`/checkout`, renderCart);
  // });

  //renders the final order confirmation element
  var renderOrderConf = function(itemsInCart) {
    var templateHtml = orderConf(itemsInCart);
    $('#orderConf').html(templateHtml);
    console.log(itemsInCart);
    cartTotal = 0;
    cartLength = 0;
    itemsInCart.order.forEach(function(item) {
      cartLength += Number(item.quantity);
      cartTotal += Number(item.price) * Number(item.quantity);
      $('#orderCount').text('Items: ' + cartLength);
      $('#orderTotal').text('Total: $' + cartTotal);
    });
  };

  //
  $('#checkoutBtn').on("click", function(){
    $('#navCartBadge').removeClass('new red');
    $('#navCartBadge').text('');
    $('#cartCount').text('');
    $('#cartTotal').text('');
    $('#restList.container').hide();
    $("#menu").hide();
    renderCart({order:[]});
    $.get('/checkout/submit', renderOrderConf);
    // clears the cart for the next order if needed.
    $.get(`/checkout/emptycart`, renderCart);
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
    $('#restList.container').hide();
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
    cartLength = 0;
    cartTotal = 0;
    $.get(`/checkout/emptycart`, renderCart);
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
