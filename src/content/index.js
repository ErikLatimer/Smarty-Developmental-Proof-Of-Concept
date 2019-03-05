//import {contextual_Sidebar} from './contextual_Sidebar';
//import {focus_Menu} from './focus_Menu';
//import {truefx_login_page} from './truefx_login_page';
import { lightstreamerClient } from './lightstreamer_Client';

$(document).ready( function () {
    //contextual_Sidebar.enable();
    //focus_Menu.enable();
    //truefx_login_page.enable();
    lightstreamerClient.test();
    //getAllSymbols().then( (text)=>{console.log(text);} ); 
    // CONFIRMED TO BE WORKING ABOVE
    //const NADEXFOREXSYMBOLSARRAY = [ 'USDCAD', 'USDJPY', 'USDCHF', 'EURUSD', 'EURGBP', 'EURJPY', 'AUDUSD', 'AUDJPY', 'GBPUSD', 'GBPJPY'];
    //getQuote( NADEXFOREXSYMBOLSARRAY ).then( (result)=>{ console.log(result); } );
    // CONFIRMED TO BE WORKING ABOVE
    //getQuota().then ( (results) => { console.log( results ); } );
    // CONFIRMED TO BE WORKING ABOVE
    //getMarketStatus().then ( (results) => { console.log ( results ); } );
    // CONFIRMED TO BE WORKING ABOVE
    //startMinimalEURUSD();
});
