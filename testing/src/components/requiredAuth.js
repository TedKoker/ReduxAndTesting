import React, { useEffect } from 'react'
import { connect } from 'react-redux'

export default (ChildComponent) => {
    function ComposeComponent(props) {

        useEffect(() => {
            if(!props.auth) {
                props.history.push('/')
            }
        }, [props.auth])

        return (
            <ChildComponent {...props}/>
        )
    }

    function mapStateToProps(state) {
        return {auth: state.auth}
    }

    return connect(mapStateToProps)(ComposeComponent)
}