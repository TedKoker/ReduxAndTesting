import React, { useCallback } from 'react'
import {connect} from 'react-redux'

function CommentList(props) {

    const renderComments = useCallback(() => {
        let arr = []
        props.comments.forEach((comment) => {
             arr.push(<li key={comment}>{comment}</li>)
        })

        return arr
    })
    return (
        <div>
            <h4>Comment List</h4>
            <ul>
                {renderComments()}
            </ul>
        </div>
    )
}

function mapStateToProps(state) {
    return {comments: state.comments}
}

export default connect(mapStateToProps)(CommentList)