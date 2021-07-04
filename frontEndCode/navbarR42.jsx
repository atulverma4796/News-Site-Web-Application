import React from "react";
import {Link} from "react-router-dom";
export default class Navbar extends React.Component{
    render(){
        return (
        <nav className="navbar navbar-expand-md navbar-danger bg-danger">
        <Link to="/" className="navbar-brand text-dark">
       <b>NewsSite</b>
        </Link>
        <div className="">
            <ul className="navbar-nav mr-auto">
               {this.props.type.map(v=><li className="nav-items " key={v}>
               <Link className="nav-link text-white" to={`/home?q=${v}`}>
               {v}</Link>
               </li>)}   
            </ul>
        </div>
    </nav>)
    }
}