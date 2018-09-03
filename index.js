import {contextual_Sidebar} from './contextual_Sidebar';
import {focus_Menu} from './focus_Menu';
import {truefx_login_page} from './truefx_login_page';

$(document).ready( function () {
    contextual_Sidebar.enable();
    focus_Menu.enable();
    truefx_login_page.enable();
});
