import React from 'react';
import { Link } from 'react-router-dom';
// import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { NavDropdown, Dropdown, NavLink, NavItem } from 'react-bootstrap'

const SidenavItems = ({ user }) => {

    const items = [
        // {
        //     type:'navItem',
        //     // icon:'home',
        //     text:'Home',
        //     link:'/',
        //     restricted:false
        // },
        {
            type: 'navItem',
            // icon:'file-text-o',
            text: 'My Profile',
            link: '/profile',
            restricted: true
        },
        {
            type: 'navItem',
            admin: true,
            // icon:'file-text-o',
            text: 'Admin Panel',
            link: '/admin-panel',
            restricted: true
        },
        // {
        //     type:'navItem',
        //     // icon:'file-text-o',
        //     text:'Add Admins',
        //     link:'/register',
        //     restricted:true
        // },
        // {
        //     type:'navItem',
        //     // icon:'file-text-o',
        //     text:'Login',
        //     link:'/login',
        //     restricted:false,
        //     exclude:true
        // },
        {
            type: 'navItem',
            // icon:'file-text-o',
            text: 'My reviews',
            link: '/user/user-reviews',
            restricted: true
        },
        {
            type: 'navItem',
            // icon:'file-text-o',
            text: 'Add reviews',
            link: '/user/add',
            restricted: true
        },
        {
            type: 'navItem',
            // icon:'file-text-o',
            text: 'Logout',
            link: '/logout',
            restricted: true
        }
    ]

    const element = (item, i) => (
        <div key={i} className={item.type + "ml-n5"}>
            <NavDropdown.Item href={item.link}>{item.text}</NavDropdown.Item>
        </div>
    )

    const showItems = () => (
        user.login ?
            items.map((item, i) => {
                if (user.login.isAuth) {
                    if (user.login.role == "administrator") {
                        return item.admin ?
                            element(item, i)
                            : element(item, i)
                    }
                    else if (!item.admin)
                        return element(item, i)
                } else {
                    return !item.restricted ?
                        element(item, i)
                        : null
                }
            })
            : null
    )

    const userDropdown = () => {
        var str = ""
        user.login ?
            user.login.isAuth ?
                str = user.login.name
                : str = ""
            : str = ""
        return str.substr(0, str.indexOf(' '))
    }
    const navDropdownTitle = (<span style={{ color: "#ffff" }} className="title"><i className="fa fa-user-circle mr-1"></i> {userDropdown()}</span>);
    return (
        <div>

            <NavDropdown title={navDropdownTitle} id="basic-nav-dropdown">
                {showItems()}
            </NavDropdown>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(SidenavItems)