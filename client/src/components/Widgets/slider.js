import React from 'react'
import { Carousel } from 'react-bootstrap'

const Slider = (props) => {

    const items = [
        {
            type: 'home-slider',
            image: 'assets/images/lionkingbackdrop.jpg',
            image_text: 'First slide',
            caption: 'Welcome to Movie Hut',
            text: 'Movie Hut makes it easy to share a single document with others via email or a shared link',

        },
        {
            type: 'home-slider',
            image: 'assets/images/lionkingbackdrop.jpg',
            image_text: 'Realtime Editing',
            caption: 'Latest movies in cinemas',
            text: 'Easy for colleagues and other collaborators to jump into one of your documents.',

        },
        {
            type: 'home-slider',
            image: 'assets/images/lionkingbackdrop.jpg',
            image_text: 'Third slide',
            caption: 'Export to Dropbox',
            text: 'Whether you need to post your finished product to your blog or attach it to an email, it can be done instantly.',
        }
    ]

    const showItems = () => (
        props.movies ?
            props.movies.map((item, i) => {
                return (
                    <Carousel.Item key={i} >
                        <img className="d-block w-100"
                            src={item.background_url}
                            alt={item.title}
                            height="400px"

                        />
                        {/* <Carousel.Caption className="mb-4">
                            <h2>{item.caption}</h2>
                            <p>{item.text}</p>
                        </Carousel.Caption> */}
                    </Carousel.Item>
                )
            })
            : null
    )

    return (
        <Carousel className="d-none d-sm-block w-100" {...props.settings}>
            {showItems()}
        </Carousel>
    )

}

export default Slider;