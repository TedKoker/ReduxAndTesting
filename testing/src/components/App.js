import React, { useCallback, useEffect } from 'react'
import {Route, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import CommentBox from 'components/CommentBox'
import CommentList from 'components/CommentList'
import * as actions from 'actions'

function App(props) {
    
    const renderBtn = useCallback(() => {
        if(props.auth) {
            return (<button onClick={() => {props.changeAuth(false)}}>Sign Out</button>)
        }
        else {
            return (<button onClick={() => {props.changeAuth(true)}}>Sign In</button>)
        }
    })

    const renderHeader = useCallback(() => {
        return (
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/post">Post a comment</Link>
                </li>
                <li>
                    {renderBtn()}
                </li>
            </ul>
        )
    })

    return (
        <div>
            {renderHeader()}
            <Route path="/post" component={CommentBox} />
            <Route path="/" exact component={CommentList} />
        </div>
    )
}

function mapStateToProps(state) {
    return {auth: state.auth}
}

export default connect(mapStateToProps, actions)(App)