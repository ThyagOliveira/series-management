import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import api from './Api'

const status = {
    'watched': 'Assistido',
    'watching': 'Assistindo',
    'toWatch': 'Assistir'
}

class NewSeries extends Component {
    constructor(props) {
        super(props)

        this.state = {
            genres: [],
            isLoading: false

        }
        this.saveSeries = this.saveSeries.bind(this)

    }
    componentDidMount() {
        this.setState({ isLoading: true })
        api.loadGenres()
            .then(res => {
            this.setState({
                isLoading: false,
                genres: res.data,
                redirect: false
            })
        })
    }
    saveSeries() {
        const newSeries = {
            name: this.refs.name.value,
            status: this.refs.status.value,
            genre: this.refs.genre.value,
            comments: this.refs.comments.value
        }
        api.saveSeries(newSeries)
            .then(res => {
                this.setState({
                    redirect: '/series/'+this.refs.genre.value
                })
            })
    }
    render() {
        return (
            
            <section className="intro-section">
                {
                    this.state.redirect &&
                    <Redirect to ={this.state.redirect} />
                }
                <form>
                    Nome: <input type= "text" ref='name' className="form-control" /><br />
                    Status: 
                    <select ref='status'>
                        { Object
                            .keys(status)
                            .map(key => <option key={key} value = {key}>{status[key]}</option>)}
                    </select><br />
                    Gênero: 
                    <select ref='genre'>
                        { this.state.genres
                            .map(key => <option key={key} value = {key}>{key}</option>)}
                    </select><br />
                    Comentarios: <textarea ref='comments' type= "text" className="form-control" /><br />
                    <button onClick={this.saveSeries}>Salvar</button>
                    
                </form>
            </section>
        )
    }
}

export default NewSeries