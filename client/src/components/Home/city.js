import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getCinemas } from './../../actions/index'

class City extends Component {

    state = {
        name:"lahore"
    }
    handleClick = (e) =>{
        // console.log(e.target.id)
        this.setState({name: e.target.id})
         console.log(this.state.name)
        this.props.dispatch(getCinemas())
    }
    componentDidMount() {
        this.props.dispatch(getCinemas())
    }
    render() {
        
        // console.log(this.state.name)
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="container">
                            <div className="row mt-5 pl-2">
                            <nav aria-label="breadcrumb" style={{ background: "white"}}>
                                <ol class="breadcrumb heading" style={{ background: "inherit", color: "black"}}>
                                    <li class="breadcrumb-item" ><a href="/" style={{  color: "black"}}>HOME</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">CINEMAS</li>
                                </ol>
                            </nav>                       
                            </div>
                            {/* <div className="row mt-3 mx-5"  style={{ background: "red", backgroundSize: "200px auto"}} > */}
                            <div className="showtime-container ml-xl-1 row my-3">
                                <button id="lahore" onClick={this.handleClick} className="my-1 pl-4 pr-4 heading cities-names">
                                    LAHORE
                                </button>
                                <button id="islamabad" onClick={this.handleClick} className="my-1 pl-4 pr-4 ml-5 cities-names">
                                    ISLAMABAD
                                </button>
                                <button id="karachi" onClick={this.handleClick} className="my-1 pl-4 pr-4 ml-5 cities-names">
                                    KARACHI
                                </button>
                                <button id="multan" onClick={this.handleClick} className="my-1 pl-4 pr-4 ml-5 cities-names">
                                    MULTAN
                                </button>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}


function mapStateToProps(state) {

    return {
        cinemas: state.movie.cinemas
    }
}

export default connect(mapStateToProps)(City)