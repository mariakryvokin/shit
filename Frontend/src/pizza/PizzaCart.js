/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var basil = require('basil.js');
//var Storage = require('../Storage/Storage');
    basil = new basil();
//basil = new window.Basil(options);

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок
    var exists = false;
    Cart.forEach(function(value,index){
        if(value.pizza==pizza && value.size==size){
            Cart[index].quantity+=1;
            exists=true;
          //  break;
        }
     
    });
    //Приклад реалізації, можна робити будь-яким іншим способом
    if(!exists){
      Cart.push({
                 pizza: pizza,
                 size: size,
                 quantity: 1
             });
    }
    //Оновити вміст кошика на сторінці
    
    updateCart();
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    //TODO: треба зробити
   
     var html_code = Templates.PizzaCart_OneItem(cart_item);
    var $node = $(html_code);
     var index = Cart.indexOf(cart_item);
    Cart.splice(index,1);
   // $cart.remove($node);
    
    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...
    var saved_orders = basil.get('cart');
    if(saved_orders){
        Cart = saved_orders;
    }
    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);

        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;
            var curr_price = parseInt($node.find(".price").text());
            console.log(curr_price);
            var item_price =  cart_item.pizza[cart_item.size].price;
            console.log(item_price);
            var res = curr_price + item_price;
            $node.find(".price").text(res);
            //Оновлюємо відображення
            updateCart();
        });
        $node.find(".minus").click(function(){
            //Збільшуємо кількість замовлених піц
             if(cart_item.quantity>1){
                 cart_item.quantity -= 1;
                  var curr_price = parseInt($node.find(".price").text());
                  var item_price =  cart_item.pizza[cart_item.size].price;
                  $node.find(".price").text(curr_price - item_price);
             }
             else removeFromCart(cart_item);

            //Оновлюємо відображення
            updateCart();
        });
        $node.find(".delete").click(function(){
             removeFromCart(cart_item);
             updateCart();
        });
        
        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);
    
    basil.set('cart',Cart);
   // basil.set('cart',orders, {'storage' : 'local'});
}
    function clearCart(){
        $cart.html("");
        Cart=[];
    }
$(".clean").click(function(){
    clearCart();
});
exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;
exports.get = function(key){
    return basil.get(key);
};
exports.set = function(key,value){
    return basil.set(key,value);
} ;
exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;