import {contextual_Sidebar} from './contextual_Sidebar';
import {focus_Menu} from './focus_Menu';
import {truefx_login_page} from './truefx_login_page';
import {getAllSymbols, getQuote, getQuota, getMarketStatus, devTest} from './1Forge_Postgresql_Database_Data_Provider_Script';

$(document).ready( function () {
    contextual_Sidebar.enable();
    focus_Menu.enable();
    truefx_login_page.enable();
    //getAllSymbols().then( (text)=>{console.log(text);} ); 
    // CONFIRMED TO BE WORKING ABOVE
    //const NADEXFOREXSYMBOLSARRAY = [ 'USDCAD', 'USDJPY', 'USDCHF', 'EURUSD', 'EURGBP', 'EURJPY', 'AUDUSD', 'AUDJPY', 'GBPUSD', 'GBPJPY'];
    //getQuote( NADEXFOREXSYMBOLSARRAY ).then( (result)=>{ console.log(result); } );
    // CONFIRMED TO BE WORKING ABOVE
    //getQuota().then ( (results) => { console.log( results ); } );
    // CONFIRMED TO BE WORKING ABOVE
    //getMarketStatus().then ( (results) => { console.log ( results ); } );
    // CONFIRMED TO BE WORKING ABOVE
    devTest();
});
