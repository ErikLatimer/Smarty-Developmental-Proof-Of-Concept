var React = require ('react');
var ReactDOM = require ('react-dom');
import { contextual_Sidebar  } from "./contextual_Sidebar";

export class focus_Menu {

    static IN_FOCUS_JQUERY_META_DATA_STRING_IDENTIFIFER_FOR_FOCUS_MENU_ITEMS = "in_focus";
    static FOCUS_MENU_ID = "focus_menu";
    static FOCUS_MENU_SELECTOR = ("#"+focus_Menu.FOCUS_MENU_ID);
    static FOCUS_MENU_ITEMS_ELEMENT = "a";
    static FOCUS_MENU_ITEM_CLASS = "item";
    static FOCUS_MENU_ITEMS_SIDEBAR_ITEMS_HTML_ATTRIBUTE = "sidebar-items";


    static enable() {
        var fM = focus_Menu;
        fM.register_On_Click_Events_For_Focus_Menu_Items();
        fM.click_Focus_Menu_Item_Based_On_Meta_Data();
    }

     // The way I assign this variable here seems to be known as an
    // immediately invoked function or IIFE for short. Not that
    // if this statement is without the extra parenthesis at the end
    // it won't execute. I've tried. I don't immediately know
    // the resoning for that though.
    // .prop() gets the specificified DOM property, while .attr() gets
    // the specified HTML property. There is a difference.
    // Retrieves the id's of all focus items under the focus menu.
    static focus_Menu_Items_Id_Array = (function () {
        var fM = focus_Menu;
        var selector = fM.FOCUS_MENU_SELECTOR;
        var results = [];
        $(selector).children(fM.FOCUS_MENU_ITEMS_ELEMENT).each(function () {
            // This [this] refers to an element object, and the current element object
            // in the each loop.
            results.push(this.id);
        });
        return results;
    })();

    // This varaiable retireves the jquery selector string of each 
    // focus menu item.
    // This varaible does not operate independently. It operates and
    // is dependant on the focus_Menu_Items_Id_Array variable in order
    // to be set properly.
    static focus_Menu_Items_Jquery_Selector_Array = (function () {
        var fM = focus_Menu;
        var array = fM.focus_Menu_Items_Id_Array;
        var results = [];
        for (var index = 0; index < array.length; ++index) {
            results.push("#" + array[index]);
        };
        return results;
    })();

    // Registers all of the focus menu items for a click event to populate
    // the sidebar based on their HTML attribute.
    static register_On_Click_Events_For_Focus_Menu_Items() {
        var fM = focus_Menu;
        var selectors_array = fM.focus_Menu_Items_Jquery_Selector_Array;
        //var items_map = cS.SIDEBAR_ITEMS_MAP;
        var selector;
        // Make sure to use the keyterm let in these types of situations when you run an
        // asynchronus process inside of a for-loop, becuase the for-loop will not
        // wait for 
        for (var index = 0; index < selectors_array.length; ++index) {
            let selector = selectors_array[index];
            $(selector).click(function () {
                // Calls the contextual_Sidebar to populate the sidebar based
                // on the focus menu item just clicked.
                console.log(selector+" Clicked");
                contextual_Sidebar.focus_Menu_Item_Clicked(selector);
                fM.focus_Menu_Item_Clicked(selector);
            });

        };

    }

    // Handles when a focus is selected/clicked
    static focus_Menu_Item_Clicked(selector) {
        var fM = focus_Menu;
        var render_object;
        // Makes sure that every other focus item available in the right menu is NOT in focus and NOT active.
        $(fM.FOCUS_MENU_SELECTOR).children(fM.FOCUS_MENU_ITEMS_ELEMENT).data(fM.IN_FOCUS_JQUERY_META_DATA_STRING_IDENTIFIFER_FOR_FOCUS_MENU_ITEMS, false);
        $(fM.FOCUS_MENU_SELECTOR).children(fM.FOCUS_MENU_ITEMS_ELEMENT).removeClass('active');
        // Sets the newly selected focus' in_focus meta data value to true.
        $(selector).data(fM.IN_FOCUS_JQUERY_META_DATA_STRING_IDENTIFIFER_FOR_FOCUS_MENU_ITEMS, true);
        // When a focus is selected, it will appear as active.
        $(selector).addClass('active');
        // Logs which focus item was selected
        console.log(selector + " Clicked");

    }

    // Determines what focus menu item is currently in focus
    static get_Item_In_Focus() {
        var fM = focus_Menu;
        var in_focus = fm.IN_FOCUS_JQUERY_META_DATA_STRING_IDENTIFIFER_FOR_FOCUS_MENU_ITEMS;     
        var selectors_array = fM.focus_Menu_Items_Jquery_Selector_Array;
        var selector;
        for (var index = 0; index < selectors_array.length; ++index) {
            selector = selectors_array[index];
            if ($(selector).data(in_focus)) {
                return $(selector);
            }
        }
    }


    static click_Focus_Menu_Item_Based_On_Meta_Data() {
        // Make sure to register the click events for the focus' before this method
        // Initial initialization of a default focus on startup
        // Note that this method only simulates and triggers a 'click' event.
        // It handles, nor does nothing more than that.
        var fM = focus_Menu;
        var selectors_array = fM.focus_Menu_Items_Jquery_Selector_Array;
        var selector;
        for (var index = 0; index < selectors_array.length; ++index) {
            let selector = selectors_array[index];
            if ($(selector).data(fM.IN_FOCUS_JQUERY_META_DATA_STRING_IDENTIFIFER_FOR_FOCUS_MENU_ITEMS)) {
                $(selector).trigger('click');
            };
        };

    }



}