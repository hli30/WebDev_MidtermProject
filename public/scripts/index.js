$('.loginreg').hide();
$('.shopping-cart').hide();
$('#menu').hide();
$('#orderConf').hide();

$(function() {
  $('.button-collapse').sideNav({
    menuWidth: 300,
    edge: 'right',
    closeOnClick: true,
    draggable: true
    // onOpen: function(el) { // Do Stuff* / }, // A function to be called when sideNav is opened
    // onClose: function(el) { // Do Stuff* / }, // A function to be called when sideNav is closed
  }
  );
  //hard coded data for
  var itemsInCart = {'order': [{"id": 9, "name": "apple", "type": "app", "price": "12.50", "cook_time_in_minutes": 5, "restaurant_id": 4}, {"id": 10, "name": "food2", "type": "main", "price": "1.50", "cook_time_in_minutes": 3, "restaurant_id": 4}, {"id": 11, "name": "meat", "type": "side", "price": "10.00", "cook_time_in_minutes": 10, "restaurant_id": 4}]};


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
  var countOfCart = 0;

  $("#orderConf").on("click", '[data-return-toRest]', function() {
    countOfCart = 0;
    $('#restList.container').show();
    $('#orderConf').hide();
    $("#menu").hide();

  });

  $('#checkoutBtn').on("click", function(){
    if(countOfCart !== 0){
      $('#orderConf').show();
      $('#restList.container').hide();
      $("#menu").hide();
      countOfCart = 0;
    } else {
      Materialize.toast('Add items to your cart first', 1500);
    }
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
    var templateHtml = cartTemplate(itemsInCart);
    $("#cartBody").html(templateHtml);
  };

  $('#cartCount').text(countOfCart);
  //when click on menu item it gets the food id and restaurant id from the element and posts it to the server
  $("#menu").on("click", '.foodthing', function(event) {
    var foodID = $(event.target).closest('.foodthing').data('foodid');
    var restID = $(event.target).closest('.foodthing').data('restid');
    countOfCart += 1;
    $('#navBadge').text(countOfCart);
    $('#cartCount').text(countOfCart);
    console.log('cart count', countOfCart);
    renderCart(itemsInCart);
    $.post(`/checkout/`, {foodID: foodID, restID: restID}, renderCart);
  });

  //$.post(`/checkout/delete/`, {foodID: foodID});


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
