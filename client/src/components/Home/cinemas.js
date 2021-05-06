import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getCinemas } from '../../actions/index'
import Header from '../Header/header'
import { Link } from 'react-router-dom'

class City extends Component {

    state = {
        city:"Lahore",
        cinemasList: []
    }
    handleClick = (e) =>{
        this.setState({city: e.target.id})
        this.props.dispatch(getCinemas())
    }
    componentDidMount() {
        this.props.dispatch(getCinemas())
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("Next Props", nextProps)
        if (nextProps.cinemas) {
            if (nextProps.cinemas.cinemasList) {
                console.log("Next Props inside", nextProps.cinemas)
                return {
                    
                    cinemasList: nextProps.cinemas.cinemasList
                }
            }
        }
        return null;
    }
    showItems = () => {
        console.log("Next Props",this.state.cinemasList)
        return this.state.cinemasList.map((cinema, key) => {
             if (this.state.city === cinema.city) return (<div className="col-12 col-md-4 mt-2">
                        <div class="card shadow" styles={{ width: "9rem" }}>
                            <div class="card-body">
                                <h5 class="card-title">{cinema.name}</h5>
                                <p class="card-text">{cinema.address}</p>
                            <Link to='/showMovies' class="btn btn-dark">View Info</Link>
                            </div>
                        </div>
                    </div> 
            )
        
        })
    }
    checkCity = (value) =>{
        if(this.state.city == value){
            return "cities-names-active"
        }
    }
    render() {
        // console.log("in render",this.state)
        return (
            <div>
                <Header user={this.props.user}/>
                <div className="container">
                    <div className="row mt-5 pl-2">
                    <nav aria-label="breadcrumb" style={{ background: "white"}}>
                        <ol class="breadcrumb heading" style={{ background: "inherit", color: "black"}}>
                            <li class="breadcrumb-item" ><a href="/" style={{  color: "black"}}>HOME</a></li>
                            <li class="breadcrumb-item active" aria-current="page">CINEMAS</li>
                        </ol>
                    </nav>                       
                    </div>
                    <div className="showtime-container ml-xl-1 row my-3">
                        <div id="Lahore" onClick={this.handleClick} className={` my-1 pl-4 pr-4 cities-names ${this.checkCity("Lahore")} `}>
                            LAHORE
                        </div>
                        <div id="Islamabad" onClick={this.handleClick} className={` my-1 pl-4 pr-4 cities-names ${this.checkCity("Islamabad")} `}>
                            ISLAMABAD
                        </div>
                        <div id="Karachi" onClick={this.handleClick} className={` my-1 pl-4 pr-4 cities-names ${this.checkCity("Karachi")} `}>
                            KARACHI
                        </div>
                        <div id="Multan" onClick={this.handleClick} className={` my-1 pl-4 pr-4 cities-names ${this.checkCity("Multan")} `}>
                            MULTAN
                        </div>
                    </div> 
                    <div className="row">
                        {this.showItems()}
                    </div>
                </div>
            </div>
        )
    }

}


function mapStateToProps(state) {
    return {
        cinemas: state.cinema.cinemasName
    }
}

export default connect(mapStateToProps)(City)