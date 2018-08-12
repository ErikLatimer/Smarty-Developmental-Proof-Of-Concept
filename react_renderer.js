var React = require('react');
var ReactDOM = require('react-dom');
import { Container, Button } from 'semantic-ui-react';
import { isNullOrUndefined } from 'util';

var user_focus_items = ['Profile','Profit','Account','Friends','Competition','Status'];
var market_focus_items = [
    'Markets','News Feed', 'Charts', 'Techniqual Indicators', 'Tables',
    'TEMP DEFAULTS BELOW', 'EUR/USD', 'USD/JPY', 'GBP/USD' 
];
var trade_focus_items = [
    'TEMP DEFAULTS BELOW', 'Contracts', 'Epics', 'Subscription'
];
var ai_focus_items = [
    'Home', 'TEMP DEFAULTS IS BELOW', 'Performance', 'Learn', 'Study'
];


let items;
let user_defined_items;
let settings;

let render_object;

let sidebar_contextual_id = "contextual_sidebar";
let jquery_sidebar_contextual = "#"+sidebar_contextual_id;

let button_for_sidebar_contextual_id = "sidebar_menu_button";
let jquery_button_for_sidebar_contextual = "#"+button_for_sidebar_contextual_id;


/*
let items;
items = user_focus_items.map( (user_focus_items) => 
    <a class="item">{user_focus_items}</a>
);
*/


$('document').ready( function () {
    
    //Initial initialization of the context bar
    /*
    if ( $('#user_focus').data('in_focus') ) {
        items = user_focus_items.map( (user_focus_items) => 
            <a class="items">{user_focus_items}</a>
        );
        console.log("user clicked");
    }

    else if ( $('#market_focus').data('in_focus') ) {
        items = market_focus_items.map( (market_focus_items) =>
            <a class="item">{market_focus_items}</a>
         );
         console.log("market clicked");
    }

    else if ( $('#trade_focus').data('in_focus') ) {
        items = trade_focus_items.map ( (trade_focus_items) =>
            <a class="item">{trade_focus_items}</a>
        );
        console.log("trade clicked");
    }

    else if ( $('#ai_focus').data('in_focus') ) {
        items = ai_focus_items.map ( (ai_focus_items) => 
            <a class="item">{ai_focus_items}</a>
        );
        console.log("ai clicked");
    }

    else { console.log("ERROR WITHIN | FILE: [react_renderer.js] | No focus is in focus." ); }

    render_object = [ items, user_defined_items, settings ];

    ReactDOM.render(
        render_object,
        document.getElementById('contextual_sidebar')
    );
    */
});


// Toggles the sidebar when the sidebar menu button is pressed
$(jquery_button_for_sidebar_contextual).click( function() {
    toggle_contextual_sidebar();
});

// Toggles the contextual_sidebar
function toggle_contextual_sidebar(){
    $(jquery_sidebar_contextual).sidebar('toggle');
}

// This single command below will not log the items that are generated in the
// contextual sidebar, presumably because when we log the event handler for the
// 'a' class, the 'a' class items in the contextual sidebar don't exist.
/*$("a").click(function(){console.log("Logged");});*/

// Handles the user_focus menu click
$('#user_focus').click( function() {
    // The .map function calls a callback function for each item in the array 
    // the map function was used on. This could be any function. Here we 
    // use a nameless function.
    items = user_focus_items.map( (user_focus_items) => 
            <a id="s" class="item">{user_focus_items}</a>
    );
    focus_click_handler("user_focus");
});
$('#market_focus').click( function() {
    items = market_focus_items.map( (market_focus_items) =>
            <a class="item">{market_focus_items}</a>
    );
    focus_click_handler("market_focus");
});
$('#trade_focus').click( function() {
    items = trade_focus_items.map ( (trade_focus_items) =>
            <a class="item">{trade_focus_items}</a>
    );
    focus_click_handler("trade_focus");
});
$('#ai_focus').click( function() {
    items = ai_focus_items.map ( (ai_focus_items) => 
            <a class="item">{ai_focus_items}</a>
    );
    focus_click_handler("ai_focus");
});
function focus_click_handler ( focus_clicked ){
    const focus = ("#" + focus_clicked);
    // Makes sure that every other focus item available in the right menu is NOT in focus and NOT active.
    $('a[id$="_focus"]').data('in_focus', false);
    $('a[id$="_focus"]').removeClass('active');
    // Sets the newly selected focus' in_focus data value to true.
    $(focus).data('in_focus',true);
    // When a focus is selected, it will appear as active.
    $(focus).addClass('active');
    // Logs which focus item was selected
    console.log(focus + " Clicked");
    // The render object concatenates three different elements to form the items for
    // the sidebar menu. user_defined_items and the settings elements are not
    // determined in this function.
    render_object = [ items, user_defined_items, settings ];
    // Render the menu items to the contextual_sidebar

    // $$$ I don't know why it fixed the problem but it did.
    if ( $(jquery_sidebar_contextual).has("a") ){
        $(jquery_sidebar_contextual).children("a").off("click");
    }

    render_to_screen(render_object,sidebar_contextual_id)

    // Everytime I pull up a new focus, the items in the logs' click function 
    // or the Logged logs are stacking on each other.
    $(jquery_sidebar_contextual).children("a").click(function(){
        console.log("Logged");
        $(jquery_sidebar_contextual).sidebar("toggle");
    });

}


function render_to_screen ( render_element, id_of_root ) {
    ReactDOM.render (
        render_element,
        document.getElementById(id_of_root)
    );
    return;
}
