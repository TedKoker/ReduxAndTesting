import React, { useCallback } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import './HeaderStyle.css'

function Header(props) {

    const renderLinks = useCallback(() => {
        if(props.authenticated) {
            return (
                <div>
                    <Link to="/signout">Sigin Out</Link>
                    <Link to="/feature">Feture</Link>
                </div>
            )
        } else {
            return (
                <div>
                    <Link to="/signup">Sigin Up</Link>
                    <Link to="/signin">Sigin IN</Link>
                </div>
            )
        }
    })

    return (
        <div className="header">
            <Link to="/">Redux Auth</Link>
            {renderLinks()}
        </div>
    )
}

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated}
}

export default connect(mapStateToProps)(Header)