import { pane_map } from './render_Pane_Map';
export class sidebar_Item {
    constructor ( item_name, render_module ) {
        this.name = item_name;
        this.pane = render_module;
    }
    static render_map = pane_map;
}