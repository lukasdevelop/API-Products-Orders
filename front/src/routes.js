import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Products from './pages/Products'
import RegisterProducts from './pages/Products/Register'
import Orders from './pages/Orders'


export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Products} />
                <Route path='/register/products' component={RegisterProducts} />
                <Route path='/orders' component={Orders} />

            </Switch>
        </BrowserRouter>
    )
}
