import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCinemas } from '../../actions/index'
import Header from '../Header/header'
import { Link } from 'react-router-dom'
import Footer from '../Footer/footer'
class City extends Component {

    state = {
        city: "Lahore",
        cinemasList: [],
        cachedProps: '',
        searchTerm: ''
    }

    handleClick = (e) => {
        this.setState({ city: e.target.id })
    }
    handleSearchTerm = (e) => {
        this.setState({ searchTerm: e.target.value })
    }

    componentDidMount() {
        this.props.dispatch(getCinemas())
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if (nextProps != prevState.cachedProps) {
            let city = prevState.city;
            if (nextProps.match.params.city) {
                if (nextProps.match.params.city !== prevState.city) {
                    const newCity = nextProps.match.params.city;
                    if (city === "Lahore" || city === "Karachi" || city === "Islamabad" || city === "Multan") {
                        city = newCity;
                    }
                }

            }
            if (nextProps.cinemas) {
                if (nextProps.cinemas.cinemasList) {
                    return {
                        cinemasList: nextProps.cinemas.cinemasList,
                        city: city,
                        cachedProps: nextProps
                    }
                }
            }

        }
        return null;
    }
    showItems = () => {
        return this.state.cinemasList.map((cinema, key) => {
            if (this.state.city === cinema.city && this.state.searchTerm == "") return (<div className="col-12 col-md-4 mt-2">
                <div class="card shadow" styles={{ width: "9rem" }}>
                    <div class="card-body">
                        <h5 class="card-title">{cinema.name}</h5>
                        <p class="card-text">{cinema.address}</p>
                        <Link to={`/cinemaMovies/${cinema._id}`} class="btn btn-dark">View Info</Link>
                    </div>
                </div>
            </div>
            )
            else if (this.state.city === cinema.city && cinema.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())) return (<div className="col-12 col-md-4 mt-2">
            <div class="card shadow" styles={{ width: "9rem" }}>
                <div class="card-body">
                    <h5 class="card-title">{cinema.name}</h5>
                    <p class="card-text">{cinema.address}</p>
                    <Link to={`/cinemaMovies/${cinema._id}`} class="btn btn-dark">View Info</Link>
                </div>
            </div>
        </div>
        )

        })
    }
    checkCity = (value) => {
        if (this.state.city == value) {
            return "cities-names-active"
        }
    }



    render() {

        return (
            <div className="sticky-body">
                <Header user={this.props.user} />
                <div className="container mb-5"  >
                    <div className="row mt-3 pl-2">
                        <nav aria-label="breadcrumb" style={{ background: "white" }}>
                            <ol class="breadcrumb heading" style={{ background: "inherit", color: "black" }}>
                                <li class="breadcrumb-item" ><a href="/" style={{ color: "black" }}>HOME</a></li>
                                <li class="breadcrumb-item active" aria-current="page">CINEMAS</li>
                            </ol>
                        </nav>
                    </div>
                    <div className="row">
                            <div className="col">
                                <div className="input-group col-md-4 col float-right mb-3">

                                    <div class="input-group-prepend ">
                                        <span class="input-group-text " style={{ backgroundColor: "black" }} id="basic-addon1">
                                            <i className="fa fa-search" style={{ color: '#ffff' }}></i></span>
                                    </div>
                                    <input type="text" onChange={this.handleSearchTerm} class="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1" />
                                </div>

                            </div>
                        </div>
                    <div className="showtime-container ml-xl-1 row mb-5">
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

                <div className="sticky-footer" >
                    <Footer />
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