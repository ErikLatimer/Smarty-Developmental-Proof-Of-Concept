import { React } from 'react';
//var React = require('react');
import { ReactDOM } from 'react-dom';
//var ReactDOM = require('react-dom');
import { focus_Menu } from './focus_Menu';
import { sidebar_Item } from './contextual_Sidebar_Item';
import { renderer } from '../../react_Render';

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


    /*
     * The reason why I have hard coded strings within the user_focus_items is because 
     * I would have to import every single module within contextual_sidebar in order
     * to NOT have each render pane's tag hard coded as a string here. Would I did
     * instead is put all of the render pane module imports in the render.js
     * becuase that's what that js file is suppose to handle. Then it will compare the
     * hard coded string tags here with the module's string tag ( in the render pane 
     * individual module ). However, these strings will not be hard coded in the renderer.js.
     * Instead they will make a call to each module.
     *  
     * Also, each of the second parameters like "sidebar_Item.render_map.Profile" acts as sort of a callback function
     * that is called each time the specific context item is clicked. The render_map.js file has each of the actual
     * functions associated with the tag hardcoded in them. The siderbar_Item is just a class that holds a copy of
     * this map.
    */

    /*
     * In order to implement the above comment, MAJOR changes still need to be made 
     * to this file.
     * 
    */
    static USER_FOCUS_ITEMS = [
        new sidebar_Item ( 'Profile', sidebar_Item.render_map.Profile ),
        new sidebar_Item ( 'Profit', sidebar_Item.render_map.Profit ),
        new sidebar_Item ( 'Account', sidebar_Item.render_map.Account ),
        new sidebar_Item ( 'Friends', sidebar_Item.render_map.Friends ),
        new sidebar_Item ( 'Competition', sidebar_Item.render_map.Competition ),
        new sidebar_Item ( 'Status', sidebar_Item.render_map.Status )
    ];
    static MARKET_FOCUS_ITEMS = [
        new sidebar_Item ( 'Market', sidebar_Item.render_map.Market ),
        new sidebar_Item ( 'News Feed', sidebar_Item.render_map.News_Feed ),
        new sidebar_Item ( 'Charts', sidebar_Item.render_map.Charts ),
        new sidebar_Item ( 'Techniqual Indicators', sidebar_Item.render_map.Techniqual_Indicators ),
        new sidebar_Item ( 'Tables', sidebar_Item.render_map.Tables ),
        new sidebar_Item ( 'TEMP DEFAULTS BELOW', sidebar_Item.render_map.TEMP_DEFAULTS_BELOW ),
        new sidebar_Item ( 'EUR/USD', sidebar_Item.render_map.EUR_USD ),
        new sidebar_Item ( 'USD/JPY', sidebar_Item.render_map.USD_JPY ),
        new sidebar_Item ( 'GBP/USD', sidebar_Item.render_map.GBP_USD )
    ];
    /*
     *   static MARKET_FOCUS_ITEMS = [
     *      'Markets', 'News Feed', 'Charts', 'Techniqual Indicators', 'Tables',
     *      'TEMP DEFAULTS BELOW', 'EUR/USD', 'USD/JPY', 'GBP/USD'
     *   ];
     * 
    */
    static TRADE_FOCUS_ITEMS = [
        new sidebar_Item ( 'TEMP DEFAULTS BELOW', sidebar_Item.render_map.TEMP_DEFAULTS_BELOW ),
        new sidebar_Item ( 'Contracts', sidebar_Item.render_map.Contracts ),
        new sidebar_Item ( 'Epics', sidebar_Item.render_map.Epics ),
        new sidebar_Item ( 'Subscription', sidebar_Item.render_map.Subscription )
    ];
    
    /*
     *  static TRADE_FOCUS_ITEMS = [
     *     'TEMP DEFAULTS BELOW', 'Contracts', 'Epics', 'Subscription'
     *   ];
     * 
    */

    static AI_FOCUS_ITEMS = [
        new sidebar_Item ( 'Home', sidebar_Item.render_map.Home ),
        new sidebar_Item ( 'TEMP DEFAULTS IS BELOW', sidebar_Item.render_map.TEMP_DEFAULTS_BELOW ),
        new sidebar_Item ( 'Performance', sidebar_Item.render_map.Performance ),
        new sidebar_Item ( 'Learn', sidebar_Item.render_map.Learn ),
        new sidebar_Item ( 'Study', sidebar_Item.render_map.Study )
    ];


    /*
     *  static AI_FOCUS_ITEMS = [
     *     'Home', 'TEMP DEFAULTS IS BELOW', 'Performance', 'Learn', 'Study'
     *  ];
     * 
    */

    // This map maps the array sidebar items based on the values 
    // in the HTML items under the focus menu with the attribute
    // focus_Menu.FOCUS_MENU_ITEMS_SIDEBAR_ITEMS_HTML_ATTRIBUTE.
    // If that attribute matches any of these below, it renders
    // this array.
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

    // The sidebar calculations and stuff are still performed, this moreso just like
    // hides it from sight. In a future update, I would like this sidebar to not perform
    // ANY calculations prior to being enebled, not even taking up any resources.
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
            (sidebar_items) =>
                <a class="item">{sidebar_items.name}</a>
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
    // It also sends and html element back on what sidebar item was clicked.\
    
    // THIS WILL EVENTUALLY HAVE TO INCLUDE THE renderer.js MODULE FOR RENDERING THE
    // CORRECT PANE WHEN THE CONTEXTUAL SIDEBAR ITEM IS CLICKED.

    // I'm thinking we loop through the sidebar_items_to_render_amp,
    // which will effectively loop through all of the arrays of sidebar_items,
    // and match the element's inner html with the name of the array item, then
    // call the render.js module attached to that object.

    // TO DO: 
    // 1. Make this method ACTAULLY render the content asscoiated with the contextual_Sidebar_Item.renderpane by
    // doing what needs to be done, whatever that is XD

    static register_On_Click_Event_For_Contextual_Sidebar_Items() {
        var cS = contextual_Sidebar;
        var sim = cS.SIDEBAR_ITEMS_MAP;
        var sim_keys = Object.keys(sim);
        var sb_items;
        var item;
        $(cS.CONTEXTUAL_SIDEBAR_SELECTOR).children(cS.CONTEXTUAL_SIDEBAR_ITEMS_ELEMENT).click(
            function (caller) {
                cS.toggle_Contextual_Sidebar();
                console.log ( caller.target );
                cS.active_Sidebar_Item_Element_Object = caller.target;
                console.log ( "Caller's innerHTML: " + caller.target.innerHTML );
                for ( let items_array = 0; items_array < sim_keys.length; ++items_array ){
                    sb_items = sim[sim_keys[items_array]];
                    for ( let items = 0; items < sb_items.length; ++items ) {
                        item = sb_items[items];
                        console.log( "Current item: " + item.name );
                        if ( caller.target.innerHTML == item.name ) {
                            // If the inner HTML of the caller matches the name of 
                            // the sidebar item within the specific array, call
                            // the reneder module with the sidebar item's 
                            // specific render module.
                            console.log( "We have a match: " + item.name );
                            // This method is not yet implemented yet in the renderer class.
                            renderer.renderPane( item.name, item.pane );
                            //renderer.render( item.name, item.pane );
                            return;
                        }
                    }

                }

            }
        );

    };


    static deregister_On_Click_Event_For_Contextual_Sidebar_Items() {
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
    // Getter for this class
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
    
    // I actually want to sperate this responsibility to the renderer.js module.
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