import React, {useCallback, useEffect} from 'react'
import {reduxForm, Field} from 'redux-form'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { compose } from 'redux'

 function Signup(props) {

    const onSubmit = useCallback((formProps)=> {
        props.signup(formProps, () => {
            props.history.push('/feature')
        })
    })

    const {handleSubmit} = props

    useEffect(()=>{
        //console.log(props)
    },[props])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
                <label>Email</label>
                <Field
                    name="email"
                    type="text"
                    component="input"
                    autoComplete="none"
                />
            </fieldset>
            <fieldset>
                <label>Password</label>
                <Field
                    name="password"
                    type="password"
                    component="input"
                    autoComplete="none"
                />
            </fieldset>
            <div>
                {props.errorMessage}
            </div>
            <button>Sign Up!</button>
        </form>
    )
}

function mapStateToProps(state) {
    //console.log(state)
    return {errorMessage: state.auth.errorMessage}
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'signup' })
)(Signup)