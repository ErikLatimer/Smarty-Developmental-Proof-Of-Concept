var React = require('react');
var ReactDOM = require('react-dom');

export class contextual_Sidebar {

    /* 
     * TO DO: 
     * 
     * 1. This class needs to intake settings and user_defined_items, as that is not 
     *    determined by the conextual_Sidebar class.
     * 
     * 2. Make all the constant variables uppercase.
     * 
     * 3. I also want to make the sidebar items appear active when they are selected.
     * 
    */

    /* What this class requires:
     * var React = require('react');
     * var ReactDOM = require('react-dom');
     * import { Container, Button } from 'semantic-ui-react';
     * import { isNullOrUndefined } from 'util';
    */

    /*
     * Currently within ES6 You cannot define variables within a class.
     * Heres is an article on stack overflow I found:
     * 
     * https://stackoverflow.com/questions/22528967/es6-class-variable-alternatives
     * 
     * Apparently if you use a framework or a transpiler like babel your good to go, if
     * you just use the syntax [varname = value;].
     * But proposals of future ES standards plan to add this support. This is 
     * as of 8/13/18.
     * 
    */


    static user_focus_items = ['Profile', 'Profit', 'Account', 'Friends', 'Competition', 'Status'];
    static market_focus_items = [
        'Markets', 'News Feed', 'Charts', 'Techniqual Indicators', 'Tables',
        'TEMP DEFAULTS BELOW', 'EUR/USD', 'USD/JPY', 'GBP/USD'
    ];
    static trade_focus_items = [
        'TEMP DEFAULTS BELOW', 'Contracts', 'Epics', 'Subscription'
    ];
    static ai_focus_items = [
        'Home', 'TEMP DEFAULTS IS BELOW', 'Performance', 'Learn', 'Study'
    ];

    // Make sure if your going to change any of the below items, that you
    // also change the index.html accordingly aswell, because all of these
    // id's and selectors at the end of the day correspond to the HTML.

    static focus_user_id = ("user_focus");
    static jquery_focus_user_selector = ("#" + contextual_Sidebar.focus_user_id);

    static focus_market_id = ("market_focus");
    static jquery_focus_market_selector = ("#" + contextual_Sidebar.focus_market_id);

    static focus_trade_id = ("trade_focus");
    static jquery_focus_trade_selector = ("#" + contextual_Sidebar.focus_trade_id);

    static focus_ai_id = ("ai_focus");
    static jquery_focus_ai_selector = ("#" + contextual_Sidebar.focus_ai_id);

    static data_in_focus = ("in_focus");
    static ending_id_identifier_focus = ("_focus");
    static element_for_focus = ("a");

    static items;
    static user_defined_items;
    static settings;

    static render_object;

    static sidebar_contextual_id = ("contextual_sidebar");
    static jquery_sidebar_contextual_selector = ("#" + contextual_Sidebar.sidebar_contextual_id);

    static button_for_sidebar_contextual_id = ("sidebar_menu_button");
    static jquery_button_for_sidebar_contextual_selector = ("#" + contextual_Sidebar.button_for_sidebar_contextual_id);

    static enable(){
        contextual_Sidebar.register_On_Click_Events_For_Focus_Menu();
        contextual_Sidebar.register_On_Click_Event_For_Menu_Button();
        contextual_Sidebar.click_Default_Focus();
    }




    static register_On_Click_Events_For_Focus_Menu() {
        // Handles when the user_focus menu is clicked
        $(contextual_Sidebar.jquery_focus_user_selector).click(function () {
            // The .map function calls a callback function for each item in the array 
            // the map function was used on. This could be any function. Here we 
            // use a nameless function.
            contextual_Sidebar.items = contextual_Sidebar.user_focus_items.map( (user_focus_items) =>
                <a class="item">{user_focus_items}</a>
            );
            contextual_Sidebar.jquery_Focus_Click_Handler(contextual_Sidebar.jquery_focus_user_selector);
        });
        // Handles when the market_focus menu is clicked
        $(contextual_Sidebar.jquery_focus_market_selector).click(function () {
            contextual_Sidebar.items = contextual_Sidebar.market_focus_items.map((market_focus_items) =>
                <a class="item">{market_focus_items}</a>
            );
            contextual_Sidebar.jquery_Focus_Click_Handler(contextual_Sidebar.jquery_focus_market_selector);
        });
        // Handles the trade_focus menu is clicked
        $(contextual_Sidebar.jquery_focus_trade_selector).click(function () {
            contextual_Sidebar.items = contextual_Sidebar.trade_focus_items.map( (trade_focus_items) =>
                <a class="item">{trade_focus_items}</a>
            );
            contextual_Sidebar.jquery_Focus_Click_Handler(contextual_Sidebar.jquery_focus_trade_selector);
        });
        // Handles the ai_focus menu is clicked
        $(contextual_Sidebar.jquery_focus_ai_selector).click(function () {
            contextual_Sidebar.items = contextual_Sidebar.ai_focus_items.map((ai_focus_items) =>
                <a class="item">{ai_focus_items}</a>
            );
            contextual_Sidebar.jquery_Focus_Click_Handler(contextual_Sidebar.jquery_focus_ai_selector);
        });
    }
    static register_On_Click_Event_For_Menu_Button() {
        $(contextual_Sidebar.jquery_button_for_sidebar_contextual_selector).click(function () {
            contextual_Sidebar.toggle_Contextual_Sidebar();
        });
    }
    static click_Default_Focus() {
        // Make sure to register the click events for the focus' before this method

        // Initial initialization of the context bar

        // Note that this method only simulates and triggers a 'click' event.
        // It handles, nor does nothing more than that.
        if ($(contextual_Sidebar.jquery_focus_user_selector).data(contextual_Sidebar.data_in_focus)) {
            $(contextual_Sidebar.jquery_focus_user_selector).trigger('click');
        }

        else if ($(contextual_Sidebar.jquery_focus_market_selector).data(contextual_Sidebar.data_in_focus)) {
            $(contextual_Sidebar.jquery_focus_market_selector).trigger('click');
        }

        else if ($(contextual_Sidebar.jquery_focus_trade_selector).data(contextual_Sidebar.data_in_focus)) {
            $(contextual_Sidebar.jquery_focus_trade_selector).trigger('click');
        }

        else if ($(contextual_Sidebar.jquery_focus_ai_selector).data(contextual_Sidebar.data_in_focus)) {
            $(contextual_Sidebar.jquery_focus_ai_selector).trigger('click');
        }
        else { console.log("ERROR WITHIN | FILE: [react_renderer.js] | No default focus selected."); }
    }
    
    



    // Handles when a focus is selected/clicked
    static jquery_Focus_Click_Handler(jquery_focus_selector) {
        let render_object;
        // Makes sure that every other focus item available in the right menu is NOT in focus and NOT active.
        $(contextual_Sidebar.element_for_focus + '[id$="' + contextual_Sidebar.ending_id_identifier_focus + '"]').data(contextual_Sidebar.data_in_focus, false);
        $(contextual_Sidebar.element_for_focus + '[id$="' + contextual_Sidebar.ending_id_identifier_focus + '"]').removeClass('active');
        // Sets the newly selected focus' in_focus data value to true.
        $(jquery_focus_selector).data(contextual_Sidebar.data_in_focus, true);
        // When a focus is selected, it will appear as active.
        $(jquery_focus_selector).addClass('active');
        // Logs which focus item was selected
        console.log(jquery_focus_selector + " Clicked");
        // The render object concatenates three different elements to form the items for
        // the sidebar menu. user_defined_items and the settings elements are not
        // determined in this function.
        render_object = [contextual_Sidebar.items, contextual_Sidebar.user_defined_items, contextual_Sidebar.settings];
        // Render the menu items to the contextual_sidebar

        // $$$ I don't know why it fixed the problem but it did.
        if ($(contextual_Sidebar.jquery_sidebar_contextual_selector).has(contextual_Sidebar.element_for_focus)) {
            $(contextual_Sidebar.jquery_sidebar_contextual_selector).children(contextual_Sidebar.element_for_focus).off("click");
        }

        contextual_Sidebar.render_To_Screen(render_object, contextual_Sidebar.sidebar_contextual_id)

        // Everytime I pull up a new focus, the items in the logs' click function 
        // or the Logged logs are stacking on each other.
        $(contextual_Sidebar.jquery_sidebar_contextual_selector).children(contextual_Sidebar.element_for_focus).click(function () {
            contextual_Sidebar.toggle_Contextual_Sidebar();
        });

    }
    // Toggles the contextual_sidebar
    static toggle_Contextual_Sidebar() {
        $(contextual_Sidebar.jquery_sidebar_contextual_selector).sidebar('toggle');
    }
    // Handles the ReactDOM rendering for the methods.
    static render_To_Screen(render_element, id_of_root) {
        ReactDOM.render(
            render_element,
            document.getElementById(id_of_root)
        );
        return;
    }


    // This single command below will not log the items that are generated in the
    // contextual sidebar, presumably because when we log the event handler for the
    // 'a' class, the 'a' class items in the contextual sidebar don't exist.
    /*$(element_for_focus).click(function(){console.log("Logged");});*/




}