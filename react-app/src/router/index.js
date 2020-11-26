import React, {Component} from 'react'
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom'
const home = asyncComponent(() => import("@/pages/home/home"))

export default class RouteConfig extends Component {
    render () {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/home" exact component= {home}/>
                </Switch>
            </HashRouter>
        )
    }
}