// recontext
import React, { useContext } from 'react';
// re
import React from 'react';
// reboot
import { Button, Card } from 'react-bootstrap';
// rehistory
import { useHistory } from 'react-router-dom';
// restate
import React, { useState } from 'react';
// reboot
import { Form, Button } from 'react-bootstrap';
// reuid
import { v4 as uuidv4 } from 'uuid';
// recontext
import React, { useContext } from 'react';
// lodash
import _ from 'lodash';
// recontext
import React, { useContext } from 'react';
// reactparam
import { useParams } from 'react-router-dom';
// renavlink
import { NavLink } from 'react-router-dom';
// reacteffect
import { useEffect } from 'react';
// reactdom
import ReactDOM from 'react-dom';
// i-axios
import axios from 'axios';
// i-component
import React, { Component } from 'react'
// redux-connect
import { connect } from "react-redux";
// relink
import {Link} from 'react-router-dom'
import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
// react
import React from "react";
// redux-provider
import { Provider } from "react-redux";

import React,{Component} from 'react';
import React,{Component} from 'react';
// react-class
class ClassName extends Component {
    constructor(props) {
        super(props);
        this.state = {color: "red", brand: "honda"};
    }

    changeColor = () => {
        this.setState({color: "blue"});
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({favoritecolor: "yellow"})
        }, 1000)
    }
    render() {
        return (
            <div>
                <h2>I am a {this.state.color} {this.props.model} Car!</h2>
                <h1>My {this.state.brand}</h1>
                <p>
                    It is a {this.state.color}
                </p>
                <button
                    type="button"
                    onClick={this.changeColor}
                >Change color</button>
            </div>
        );
    }
}

export default ClassName;