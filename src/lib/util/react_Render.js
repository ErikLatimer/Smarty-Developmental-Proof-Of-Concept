import {contextual_Sidebar} from '../../content/contextual_Sidebar';
import {focus_Menu} from '../../content/focus_Menu';
import {eur_usd_Render_Pane} from './render_panes/eur_usd_pane';
import { React } from 'react';
//var React = require('react');
import { ReactDOM } from 'react-dom';
//var ReactDOM = require('react-dom');

export class renderer {
    
    /*
     * This class is meant to serve as the React renderer to the whole program, and render through React. 
     */
    // Ok so I know for a fact that this content will be under the <div>
    // dimmed pusher within the HTML. I don't think that's going to change.

    // I think I want a seperate chart React class Component that takes
    // as input ( whatever that input looks like ) a valid and available
    // currency pair, and it displays that as a chart using a chart library
    // like chart JS. The only reason why I say something like this is 
    // because we need that component to update on its own and
    // independently. The way it was explained to me, a React class
    // component is the only way to have such a thing. So
    // were going to do that.

    
    static PUSHED_CONTENT_PARENT_ELEMENT_CLASS = "dimmed pusher";
    // Method to implement: 
    static renderPane( callerName, pane_to_render ){}
};