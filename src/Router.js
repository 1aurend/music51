import React from 'react'
import Context from './components/Context'
import { BrowserRouter, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import "shards-ui/dist/css/shards.min.css"


//Note: we're not currently doing any routing but may want to later when we have multiple modes/menus
export default function Router() {
    return (
      <BrowserRouter>
        <Route path='/' exact component={Context} />
      </BrowserRouter>
    )
  }
