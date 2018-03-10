$('.loginreg').hide();
$('.shopping-cart').hide();
$('#menu').hide();
$('#orderConf').hide();
$(function() {


  var itemsInCart = {'order': [{"id": 9, "name": "apple", "type": "app", "price": "12.50", "cook_time_in_minutes": 5, "restaurant_id": 4}, {"id": 10, "name": "food2", "type": "main", "price": "1.50", "cook_time_in_minutes": 3, "restaurant_id": 4}, {"id": 11, "name": "meat", "type": "side", "price": "10.00", "cook_time_in_minutes": 10, "restaurant_id": 4}]};

  var countOfCart = itemsInCart.order.length;
  console.log(countOfCart);
  // Makes sure that the cart and login arent displayed at the same time
  $("#loginregbtn").click(function() {
    if($('.shopping-cart').is(':visible')){
      $('.shopping-cart').hide();
    }
    $(".loginreg").fadeToggle();
  });

  const renderCart = function(itemsInCart) {
    console.log('made it to render cart');
    var templateHtml = cartTemplate(itemsInCart);
    console.log(templateHtml);
    $("#cartBody").html(templateHtml);
  };

  $("#menu").on("click", '.foodthing', function(event) {
    var foodID = $(event.target).closest('.foodthing').data('foodid');
    var restID = $(event.target).closest('.foodthing').data('restid');
    renderCart(itemsInCart);
    // $.get(`/restaurant/${restaurantId}`, renderCart[foodID]);
    // $.post(`/checkout`, {foodID: foodID, restID: restID});
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

  $('#checkoutBtn').on("click", function(){
    $('#orderConf').show();
    $("#menu").hide();
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




  const renderMenu = function(menuData) {
    var templateHtml = menuTemplate(menuData);
    $("#menu").html(templateHtml);
  };

  //renders menu based on the restaurant click
  $("#restlist").on("click", '[data-restaurant-id]', function(event) {
    const restaurantId = $(this).data('restaurantId');
    $('#restList.container').hide();
    $("#menu").show();
    console.log(`/restaurant/${restaurantId}`);
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
