var React = require('react');
var ReactDOM = require('react-dom');
import { Container, Button } from 'semantic-ui-react';
import { isNullOrUndefined } from 'util';

const user_focus_items = ['Profile','Profit','Account','Friends','Competition','Status'];
const market_focus_items = [
    'Markets','News Feed', 'Charts', 'Techniqual Indicators', 'Tables',
    'TEMP DEFAULTS BELOW', 'EUR/USD', 'USD/JPY', 'GBP/USD' 
];
const trade_focus_items = [
    'TEMP DEFAULTS BELOW', 'Contracts', 'Epics', 'Subscription'
];
const ai_focus_items = [
    'Home', 'TEMP DEFAULTS IS BELOW', 'Performance', 'Learn', 'Study'
];

const focus_user_id = ("user_focus");
const jquery_focus_user_selector = ("#"+focus_user_id);

const focus_market_id = ("market_focus");
const jquery_focus_market_selector = ("#"+focus_market_id);

const focus_trade_id = ("trade_focus");
const jquery_focus_trade_selector = ("#"+focus_trade_id);

const focus_ai_id = ("ai_focus");
const jquery_focus_ai_selector = ("#"+focus_ai_id);

const data_in_focus = ("in_focus");
const ending_id_identifier_focus = ("_focus");
const element_for_focus = ("a");

let items;
let user_defined_items;
let settings;

let render_object;

const sidebar_contextual_id = ("contextual_sidebar");
const jquery_sidebar_contextual_selector = ("#"+sidebar_contextual_id);

const button_for_sidebar_contextual_id = ("sidebar_menu_button");
const jquery_button_for_sidebar_contextual_selector = ("#"+button_for_sidebar_contextual_id);


$('document').ready( function () {
    //Initial initialization of the context bar
    if ( $(jquery_focus_user_selector).data(data_in_focus) ) {
        items = user_focus_items.map( (user_focus_items) => 
            <a class="item">{user_focus_items}</a>
        );
        jquery_focus_click_handler ( jquery_focus_user_selector )
    }

    else if ( $(jquery_focus_market_selector).data(data_in_focus) ) {
        items = market_focus_items.map( (market_focus_items) =>
            <a class="item">{market_focus_items}</a>
         );
         jquery_focus_click_handler ( jquery_focus_market_selector )
    }

    else if ( $(jquery_focus_trade_selector).data(data_in_focus) ) {
        items = trade_focus_items.map ( (trade_focus_items) =>
            <a class="item">{trade_focus_items}</a>
        );
        jquery_focus_click_handler ( jquery_focus_trade_selector )
    }

    else if ( $(jquery_focus_ai_selector).data(data_in_focus) ) {
        items = ai_focus_items.map ( (ai_focus_items) => 
            <a class="item">{ai_focus_items}</a>
        );
        jquery_focus_click_handler ( jquery_focus_ai_selector )
    }
    else { console.log("ERROR WITHIN | FILE: [react_renderer.js] | No focus is in focus." ); }
});


// Toggles the sidebar when the sidebar menu button is pressed
$(jquery_button_for_sidebar_contextual_selector).click( function() {
    toggle_contextual_sidebar();
});

// Toggles the contextual_sidebar
function toggle_contextual_sidebar(){
    $(jquery_sidebar_contextual_selector).sidebar('toggle');
}

// This single command below will not log the items that are generated in the
// contextual sidebar, presumably because when we log the event handler for the
// 'a' class, the 'a' class items in the contextual sidebar don't exist.
/*$(element_for_focus).click(function(){console.log("Logged");});*/

// Handles the user_focus menu click
$(jquery_focus_user_selector).click( function() {
    // The .map function calls a callback function for each item in the array 
    // the map function was used on. This could be any function. Here we 
    // use a nameless function.
    items = user_focus_items.map( (user_focus_items) => 
            <a class="item">{user_focus_items}</a>
    );
    jquery_focus_click_handler(jquery_focus_user_selector);
});
// Handles the market_focus menu click
$(jquery_focus_market_selector).click( function() {
    items = market_focus_items.map( (market_focus_items) =>
            <a class="item">{market_focus_items}</a>
    );
    jquery_focus_click_handler(jquery_focus_market_selector);
});
// Handles the trade_focus menu click
$(jquery_focus_trade_selector).click( function() {
    items = trade_focus_items.map ( (trade_focus_items) =>
            <a class="item">{trade_focus_items}</a>
    );
    jquery_focus_click_handler(jquery_focus_trade_selector);
});
// Handles the ai_focus menu click
$(jquery_focus_ai_selector).click( function() {
    items = ai_focus_items.map ( (ai_focus_items) => 
            <a class="item">{ai_focus_items}</a>
    );
    jquery_focus_click_handler(jquery_focus_ai_selector);
});

// Handles when a focus is selected
function jquery_focus_click_handler ( jquery_focus_selector ){
    // Makes sure that every other focus item available in the right menu is NOT in focus and NOT active.
    $(element_for_focus+'[id$="'+ending_id_identifier_focus+'"]').data(data_in_focus, false);
    $(element_for_focus+'[id$="'+ending_id_identifier_focus+'"]').removeClass('active');
    // Sets the newly selected focus' in_focus data value to true.
    $(jquery_focus_selector).data(data_in_focus,true);
    // When a focus is selected, it will appear as active.
    $(jquery_focus_selector).addClass('active');
    // Logs which focus item was selected
    console.log(jquery_focus_selector + " Clicked");
    // The render object concatenates three different elements to form the items for
    // the sidebar menu. user_defined_items and the settings elements are not
    // determined in this function.
    render_object = [ items, user_defined_items, settings ];
    // Render the menu items to the contextual_sidebar

    // $$$ I don't know why it fixed the problem but it did.
    if ( $(jquery_sidebar_contextual_selector).has(element_for_focus) ){
        $(jquery_sidebar_contextual_selector).children(element_for_focus).off("click");
    }

    render_to_screen(render_object,sidebar_contextual_id)

    // Everytime I pull up a new focus, the items in the logs' click function 
    // or the Logged logs are stacking on each other.
    $(jquery_sidebar_contextual_selector).children(element_for_focus).click(function(){
        toggle_contextual_sidebar();
    });

}


function render_to_screen ( render_element, id_of_root ) {
    ReactDOM.render (
        render_element,
        document.getElementById(id_of_root)
    );
    return;
}
