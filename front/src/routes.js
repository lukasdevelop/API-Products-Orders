import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './pages/Header'

import Products from './pages/Products'
import RegisterProducts from './pages/Products/Register'
import Orders from './pages/Orders'


export default function Routes(){
    return (
        <BrowserRouter>
                <Header />
            <Switch>
                <Route path='/' exact component={Products} />
                <Route path='/products/register' component={RegisterProducts} />
                <Route path='/orders' component={Orders} />
            </Switch>
        </BrowserRouter>
    )
}
