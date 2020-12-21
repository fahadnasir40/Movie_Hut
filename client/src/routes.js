import React from 'react';
import { Switch, Route } from 'react-router-dom';

const routes = () => {

    return (
        <Switch>
            <Route path="/" exact component={() => (<h1>Movie Hut - Getting Started</h1>)} />
        </Switch>
    )
}

export default routes;
