import React, { useEffect } from 'react'
import { connect } from 'react-redux'

export default ChildComponent => {
    function ComponentComposed(props) {
        useEffect(() => {
            console.log(props)
            if(!props.auth) {
                props.history.push('/')
            }
        }, [props.auth])

        return (
            <ChildComponent {...props}/>
        )
    }

    function mapStateToProps(state) {
        return {auth: state.auth.authenticated}
    }

    return connect(mapStateToProps)(ComponentComposed)
}