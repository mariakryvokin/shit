/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-big").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}

function filterPizza(filter) {
    return function() {
        //Масив куди потраплять піци які треба показати
        var pizza_shown = [];
        if(filter=="all") return showPizzaList(Pizza_List);
            Pizza_List.forEach(function(pizza){
            //Якщо піка відповідає фільтру
            if(pizza.content[filter]){
                if(filter=="additional"){
                    if(!pizza.content.meat && !pizza.content.ocean )
                         pizza_shown.push(pizza);
                }
                else { pizza_shown.push(pizza); }
            }
            //TODO: зробити фільтри
        });

        //Показати відфільтровані піци
        showPizzaList(pizza_shown);
           
    };
    
}
 $(".filter-meat").click(filterPizza("meat"));
$(".filter-pineapple").click(filterPizza("pineapple"));
$(".filter-mushrooms").click(filterPizza("mushroom"));
$(".filter-oceans").click(filterPizza("ocean"));
$(".filter-vegan").click(filterPizza("additional"));
$(".filter-all").click(filterPizza("all"));

function initialiseMenu() {
    //Показуємо усі піци
    showPizzaList(Pizza_List)
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;