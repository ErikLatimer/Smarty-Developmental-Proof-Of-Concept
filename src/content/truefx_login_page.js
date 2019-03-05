

export class truefx_login_page {

    // The following section is taken straight from the index.html
    static _TRUEFX_LOGIN_BUTTON_ID = "truefx_login_button";
    static _TRUEFX_LOGIN_BUTTON_SELECTOR = ( "#" + truefx_login_page._TRUEFX_LOGIN_BUTTON_ID );
    static _TRUEFX_LOGIN_MODAL_ID = "truefx_login_modal";
    static _TRUEFX_LOGIN_MODAL_SELECTOR = "#" + truefx_login_page._TRUEFX_LOGIN_MODAL_ID;

    static _register_On_Click_Event_For_TrueFX_Login_Button() {
        var tfx_lp = truefx_login_page;
        $(tfx_lp._TRUEFX_LOGIN_BUTTON_SELECTOR).click( ()=> {
            $(tfx_lp._TRUEFX_LOGIN_BUTTON_SELECTOR).addClass('loading');
            $(tfx_lp._TRUEFX_LOGIN_MODAL_SELECTOR).modal('show');
        });
    };

    static _set_TrueFX_Login_Page_Behavior() {
        var tfx_lp = truefx_login_page;
        $(tfx_lp._TRUEFX_LOGIN_MODAL_SELECTOR).modal('setting', {
            onDeny: ()=> { console.log("Hello"); }
        });
    }

    static enable(){
        var tfx_lp = truefx_login_page;
        tfx_lp._register_On_Click_Event_For_TrueFX_Login_Button();
        tfx_lp._set_TrueFX_Login_Page_Behavior();
    }

    // The onApprove and onDeny as well as other settings are set via the 
    // 'settings' behavior of modal, accompanied with an object

}