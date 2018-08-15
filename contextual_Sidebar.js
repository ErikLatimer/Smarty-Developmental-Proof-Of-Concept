var React = require('react');
var ReactDOM = require('react-dom');
import { focus_Menu } from "./focus_Menu";

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
     * 4. I want to dynamically load in the focus menu here through the docuemnt class,
     *    and seperate the responsiblility of the focus menu to another js file.
     * 
     * 5. Seperate the responsibilities of the focus menu and contextual sidebar into 
     *    two differnet files.
     * 
     * 6. Dynamically generate and load in the menu button for, and the contextual sidebar.
     *    
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

    // If you want to add sidebar items, all you have to do is specify a new array 
    // variable here, then add a key and that new array in the map below the
    // arrays. Make sure that the key map corresponds to the HTML property 
    // in that focus item. That's it. Everything else will take care of itself.

    static USER_FOCUS_ITEMS = ['Profile', 'Profit', 'Account', 'Friends', 'Competition', 'Status'];
    static MARKET_FOCUS_ITEMS = [
        'Markets', 'News Feed', 'Charts', 'Techniqual Indicators', 'Tables',
        'TEMP DEFAULTS BELOW', 'EUR/USD', 'USD/JPY', 'GBP/USD'
    ];
    static TRADE_FOCUS_ITEMS = [
        'TEMP DEFAULTS BELOW', 'Contracts', 'Epics', 'Subscription'
    ];
    static AI_FOCUS_ITEMS = [
        'Home', 'TEMP DEFAULTS IS BELOW', 'Performance', 'Learn', 'Study'
    ];
    static SIDEBAR_ITEMS_MAP = {
        "user_focus_items": contextual_Sidebar.USER_FOCUS_ITEMS,
        "market_focus_items": contextual_Sidebar.MARKET_FOCUS_ITEMS,
        "trade_focus_items": contextual_Sidebar.TRADE_FOCUS_ITEMS,
        "ai_focus_items": contextual_Sidebar.AI_FOCUS_ITEMS
    };
    
    static active_Sidebar_Item_Element_Object;

    // I changed these
    static CONTEXTUAL_SIDEBAR_ITEMS_ELEMENT = "a";
    static CONTEXTUAL_SIDEBAR_ID = ("contextual_sidebar");
    static CONTEXTUAL_SIDEBAR_SELECTOR = ("#" + contextual_Sidebar.CONTEXTUAL_SIDEBAR_ID);
    static CONTEXTUAL_SIDEBAR_BUTTON_ID = ("sidebar_menu_button");
    static CONTEXTUAL_SIDEBAR_BUTTON_SELECTOR = ("#" + contextual_Sidebar.CONTEXTUAL_SIDEBAR_BUTTON_ID);


    static enable() {
        var cS = contextual_Sidebar;
        cS.register_On_Click_Event_For_Contextual_Sidebar_Button();
    }

    // CHECKED FOR NEW SEPERATION
    static focus_Menu_Item_Clicked(jquery_Selector_For_Focus_Menu_Item) {
        // Populates the sidebar based on the clicked focus menu item's HTML attribute.
        // Their HTML attribute is compared against the map variable's keys.
        // We could probably customize the class and Element now of the sidebar items
        // Since this is the class to oversee these things.

        // Right now, this is looking like the place to handle user defined sidebar items
        // and user settings. Make sure to incorperate that sooner or later.

        var cS = contextual_Sidebar;
        var sidebar_items_to_render_map = cS.SIDEBAR_ITEMS_MAP;

        var elements_to_render;
        var selector = jquery_Selector_For_Focus_Menu_Item;
        var sidebar_items_attribute = focus_Menu.FOCUS_MENU_ITEMS_SIDEBAR_ITEMS_HTML_ATTRIBUTE;

        elements_to_render = sidebar_items_to_render_map[($(selector).attr(sidebar_items_attribute))].map(
            (stuff) =>
                <a class="item">{stuff}</a>
        );

        // $$$ I don't know why it fixed the problem but it did.
        // Basically, I turned off the click function for all of contextual side_bar's 
        // children.
        cS.deregister_On_Click_Event_For_Contextual_Sidebar_Items();

        cS.render_To_Screen(elements_to_render, cS.CONTEXTUAL_SIDEBAR_ID)

        cS.register_On_Click_Event_For_Contextual_Sidebar_Items();

    };

    // This registers a click function for all CURRENT items under contextual_sidebar to 
    // toggle the sidebar when clicked.
    // It also sends and html element back on what sidebar item was clicked.
    static register_On_Click_Event_For_Contextual_Sidebar_Items(){
        var cS = contextual_Sidebar;
        $(cS.CONTEXTUAL_SIDEBAR_SELECTOR).children(cS.CONTEXTUAL_SIDEBAR_ITEMS_ELEMENT).click(
            function (caller) {
                cS.toggle_Contextual_Sidebar();
                cS.active_Sidebar_Item_Element_Object = caller.target;
                console.log(caller.target);
            }
        );

    };


    static deregister_On_Click_Event_For_Contextual_Sidebar_Items(){
        var cS = contextual_Sidebar;
        if ($(cS.CONTEXTUAL_SIDEBAR_SELECTOR).has(cS.CONTEXTUAL_SIDEBAR_ITEMS_ELEMENT)) {
            $(cS.CONTEXTUAL_SIDEBAR_SELECTOR).children(cS.CONTEXTUAL_SIDEBAR_ITEMS_ELEMENT).off("click");
        };

    }

    static register_On_Click_Event_For_Contextual_Sidebar_Button() {
        var cS = contextual_Sidebar;
        $(cS.CONTEXTUAL_SIDEBAR_BUTTON_SELECTOR).click(function () {
            cS.toggle_Contextual_Sidebar();
        });
    }

    static active_item() {
        var cS = contextual_Sidebar;
        return (cS.active_Sidebar_Item_Element_Object);
    }

    // Toggles the contextual_sidebar
    static toggle_Contextual_Sidebar() {
        var cS = contextual_Sidebar;
        $(cS.CONTEXTUAL_SIDEBAR_SELECTOR).sidebar('toggle');
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