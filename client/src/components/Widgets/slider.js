import React, { Component } from 'react'
import { Carousel } from 'react-bootstrap'
import Coverflow from "reactjs-coverflow";
import Page1 from "./page/page1";


class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            position: 0
        };
    }
    componentDidMount() {
        const { coverflow } = this.refs;
        this.setState({
            position: (coverflow && coverflow.getPosition()) || 0
        });
    }
    handleMarginChange(e) {
        e.preventDefault();
        this.setState({ margin: parseFloat(e.currentTarget.value) });
    }
    prev(e) {
        e.preventDefault();
        this.refs.coverflow.previous();
    }
    next(e) {
        e.preventDefault();
        this.refs.coverflow.next();
        this.setState({});
    }
    onChange(position) {
        console.log(`New position: ${position}`);

        // To test the issue of infinite callback, see https://github.com/Bastorx/reactjs-coverflow/issues/18
        this.setState({ position });
    }
    getPosition(e) {
        e.preventDefault();
        console.log(this.refs.coverflow.getPosition());
    }
    goAt(num, e) {
        e.preventDefault();
        this.refs.coverflow.goAt(4);
    }
    getPage(num) {
        switch (num) {
            case 1:
                return Page1;
                break;
            // case 2:
            //     return Page2;
            //     break;
            // case 3:
            //     return Page3;
            //     break;
            // case 4:
            //     return Page4;
            //     break;
        }
    }
    changePage(page) {
        this.setState({ page }, function () {
            this.setState({
                position: this.refs.coverflow.getPosition()
            })
        })
    }
    render() {
        const { page, position } = this.state;
        return (
            <div>

                {/* <div className="row">
                    <img className="d -block"
                        src="https://image.tmdb.org/t/p/w1280/9QusGjxcYvfPD1THg6oW3RLeNn7.jpg"
                        width="400px"
                        height="400px"

                    />
                    <img className="d -block "
                        src="https://image.tmdb.org/t/p/w1280/9QusGjxcYvfPD1THg6oW3RLeNn7.jpg"

                        height="400px"

                    />
                    <img className="d -block "
                        src="https://image.tmdb.org/t/p/w1280/9QusGjxcYvfPD1THg6oW3RLeNn7.jpg"
                        width="400px"
                        height="400px"

                    />

                </div> */}
                {/* 
                <Coverflow
                    ref="coverflow "
                    style={{ width: "100vw", height: "400px", padding: "0" }}
                    startPosition={2}
                    enableScroll={false}

                    animationSpeed={0.6}
                    rotate={0}
                    onChange={position => this.onChange(position)}
                >
                    {this.getPage(this.state.page)}
                </Coverflow> */}
                {/* <Carousel className="w-100">{this.showItems()}</Carousel> */}

            </div>
        );
    }

    showItems = () => (
        this.props.movies ?
            this.props.movies.map((item, i) => {
                return (
                    <Carousel.Item key={i} >

                        <img className="d-block w-100"
                            src={item.background_url}
                            alt={item.title}
                            height="400px"

                        />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>

                        {/* <Carousel.Caption className="mb-4">
                                <h2>{item.caption}</h2>
                                <p>{item.text}</p>
                            </Carousel.Caption> */}
                    </Carousel.Item>
                )
            })
            : null
    )

}
{/* <Carousel className="d-none d-sm-block w-100" {...this.props.settings}>
                    {this.showItems()}
                </Carousel> */}
export default Slider;