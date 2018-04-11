import React, { Component } from 'react'
import axios from 'axios'

import api from "./Api";



class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      generos: [],
      isLoading: false

    }

  }

  componentDidMount() {
    this.setState({ isLoading: true })
    api.loadGenres()
      .then(res => {
        this.setState({
          isLoading: false,
          generos: res.data
        })
      })
  }

  renderLink(generos) {
    return (
      <a href= ''> {generos} </a>
    )

  }
  render() {
    return (
      <div>
          <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
            <div className="container">
              <div className="navbar-header page-scroll">
                <a className="navbar-brand page-scroll" href="#page-top">
                    <img src="images/logo.png" height="30" />
                </a>
              </div>
        
              <div className="collapse navbar-collapse navbar-ex1-collapse">
                <ul className="nav navbar-nav">
                  <li>
                    <a href="">Menu item</a>
                  </li>
                </ul>
              </div>
        
            </div>
          </nav>
        
        
          <section id="intro" className="intro-section">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <h1><img src="images/logo.png" /></h1>
                  <p>Nunca mais esqueça uma série que você assistiu ou que alguém lhe indicou.</p>
                </div>
              </div>
            </div>
        </section>

        <section>
          {
            this.state.isLoading &&
            <span> Carregando Dados... </span>
          }
          {
            !this.state.isLoading &&
            <div>
              {this.state.generos.map(this.renderLink)} 
            </div>
          }
        </section>
      </div>
    );
  }
}

export default App;
