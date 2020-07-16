import React, { useState, useCallback, useRef, useEffect } from 'react'
import {connect} from 'react-redux'
import * as actions from 'actions'
import requierAuth from 'components/requiredAuth'

function CommentBox(props) {
    const [comment, setComment] = useState('')
    const formRef = useRef()

    const handleChange = useCallback((e) => {
        setComment(e.target.value)
    })

    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        props.saveComment(comment)
        setComment("")
    })
    
    const handleKeyPress = useCallback((e) => {
        if(e.charCode === 13 ) {
            if(e.ctrlKey) {
                let commentValue = comment
                setComment(commentValue+"\n")
            }
            else {
                handleSubmit(e)
            }
        }
    })

    return (
        <div>
            <form ref={formRef} onSubmit={handleSubmit}>
                <h4>Add a coment</h4>
                <textarea value={comment} onChange={handleChange} onKeyPress={handleKeyPress}/>
                <div>
                    <button>Submit comment</button>
                </div>
            </form>
            <button className="fetch-cooments" onClick={props.fetchComment}>fetch comments</button><br/>
            <button className="delete-comments" onClick={props.deleteComments}>delete all</button>
        </div>
    )
}

export default connect(null, actions)(requierAuth(CommentBox))