import React, { useState, useEffect } from "react";
import { AiFillCloseCircle } from 'react-icons/ai'
import  { deleteComment, getTopicDetails } from '../../api/userService'
import swal from 'sweetalert';

import './Post.css'

function CommentCard({ comment, setStatePost, postId }) {

  const [stateComment, setStateComment] = useState(comment)
  const [showDeleteComment, setShowDeleteComment] = useState(false)

  const handleDeleteComment = async () => {
    const data = await deleteComment(postId, comment.commentId)
    if(data.status) swal("Succés", "Le commentaire a été supprimé avec succés !", "success");
    else swal("Erreur", data.message, "error");

    const postData = await getTopicDetails(postId)
    if (postData.status) {
      const newPost = {...postData.data}
      setStatePost(newPost)
    }
  } 

  useEffect( ()=>{  
    const userId = localStorage.getItem('userId')
    if ( localStorage.getItem('role') === 'admin') setShowDeleteComment(true)
    else if (userId === stateComment.userId) setShowDeleteComment(true)
  }, [])


  return (
    <div className="comment-container">
        <div className="close-button" onClick={handleDeleteComment} style={{ display: showDeleteComment ? "block" : "none" }}><AiFillCloseCircle size={20} color="#971919" /></div>
        <h6 className="name-tag"><strong><u>{stateComment.username}</u></strong>&nbsp;</h6>
        <div className="date-comment">{stateComment.date}</div>
        <div className="desc-post m-top">{stateComment.message}</div>
    </div>
  );
}

export default CommentCard;