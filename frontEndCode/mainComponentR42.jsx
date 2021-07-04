import React from "react";
import {Route,Redirect,Switch} from "react-router-dom";
import Navbar from "./navbarR42";
import ShowData from "./showDataR4";
export default class MainComponent extends React.Component{
    state={
        type:["Sports","Cricket","Movies","Education"],
    };
    render(){
        const {type}=this.state;
        return <div className="container-fluid">
            <Navbar type={type}/>
            <Switch>
                <Route path="/home?q=:value" component={ShowData}/>
                <Route path="/home" component={ShowData}/>
                <Redirect from="/" to="/home"/>
            </Switch>
        </div>
    }
}