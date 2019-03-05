import {render_panes} from './src/content/contextual_Sidebar_Item_Pane_Map';
/**
 * The contextual sidebar item is in charge of what to render on screen below the top menu
 * and should function accordingly.
 * 
 * 
 */
export class sidebar_Item {
    constructor ( item_name, render_module, parent_container_to_render_module ) {
        this.name = item_name;
        this.pane = render_module;
        this.content_container = parent_container_to_render_module;
    }

    function content

    // The whole reason why we third degree remove the render_map and the actual item is because the 
    // sidebar items is actually what make this program. Sooo, there are going to be a lot, and all of them
    // are going to be customizable. So that calls for degrees of seperation so that way it is easier to change 
    // and manage later.
    static render_map = render_panes;
}