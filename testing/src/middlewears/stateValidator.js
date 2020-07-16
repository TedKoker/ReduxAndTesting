import tv4 from 'tv4'
import stateSchema from 'middlewears/stateSchema'

export default ({dispath, getState}) => next => action => {
    next(action)   
    if (!tv4.validate(getState(), stateSchema)) {
        console.error("invalid schema detected")
    }
}