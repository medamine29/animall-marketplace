import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid'
import { AiFillCloseCircle } from 'react-icons/ai'
import CommentCard from './CommentCard'
import { deleteTopic, addComment, getTopicDetails } from "../../api/userService";
import swal from 'sweetalert';

import "./Post.css";

function Post({ post, setSelectedTopic}) {
  // React States
  const [statePost, setStatePost] = useState(post)
  const [showDeletePost, setShowDeletePost] = useState(false)
  const [commentToSend, setCommentToSend] = useState("")

  const handleDeletePost = async () => {
    const data = await deleteTopic(statePost._id)
    if(data.status) swal("Succés", "Le poste a été supprimé avec succés !", "success");
    else swal("Erreur", data.message, "error");

    setSelectedTopic(null)
  } 

  const handleWriteComment = (event) => {
    setCommentToSend(event.target.value)
  }

  const handleAddComment = async () => {
    const userId = localStorage.getItem('userId')
    const data = await addComment(statePost._id, userId, commentToSend)

    if(!data.status) swal("Erreur", data.message, "error") 

    const postData = await getTopicDetails(statePost._id)
    if (postData.status) {
      const newPost = {...postData.data}
      setStatePost(newPost)
    }
  }

  useEffect( ()=>{  
    const userId = localStorage.getItem('userId')
    if ( localStorage.getItem('role') === 'admin') setShowDeletePost(true)
    else if (userId === statePost.ownerId) setShowDeletePost(true)
  }, [])

  return (
    <div className="main-container-post">
        <div className="close-button" onClick={handleDeletePost} style={{ display: showDeletePost ? "block" : "none" }}><AiFillCloseCircle size={20} color="#971919" /></div>
        <h6 className="name-tag"><strong><u>{statePost.ownerName}</u></strong>&nbsp;</h6>
        <div className="date">{statePost.createdAt} &nbsp;</div>
        <div className="m-top title-post">{statePost.title}</div>
        <div className="desc-post">{statePost.description}</div>
        <div className="comments-section">
        {
            statePost.comments.map( commentElem => (
                <Grid item key={commentElem._id} xs={12} sm={12} lg={12}>
                    <CommentCard comment={commentElem} setStatePost={setStatePost} postId={statePost._id}/>
                </Grid>
            ))
        }
        </div>
        <input className="input-comment" type="text" name="comment" placeholder="ajouter un commentaire" onChange={handleWriteComment}/>
        <button className="btn-add-topic" onClick={handleAddComment}>Envoyer</button>
    </div>
  );
}

export default Post;