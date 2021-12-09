import React from 'react';

import Rotas from './rotas'
import Navbar from '../components/navbar'

import 'bootswatch/dist/flatly/bootstrap.css';
import '../custom.css';

class App extends React.Component {

    render() {
      return (
        <div>
          <Navbar/>
          <div className="container">
            <Rotas/>
          </div>
        </div>
        )
    }
  }

export default App;
