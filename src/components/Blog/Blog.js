import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { getTopics, addTopic } from "../../api/userService";
import swal from 'sweetalert';
import { Button, Container } from "react-bootstrap";
import TopicCard from '../TopicCard/TopicCard'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Post from './Post'

import "./Blog.css";

function Blog() {
  // React States
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [topicTitle, setTopicTitle] = useState(null)
  const [topicDescription, setTopicDescription] = useState("")

  const handleWriteTopicTitle = (event) => {
    setTopicTitle(event.target.value)
}

const handleWriteTopicDescription = (event) => {
  setTopicDescription(event.target.value)
}

const fetchData = async () => {
  const data = await getTopics() 
  if(data.status) {
      setTopics(data.data)
      setLoading(false)
  }
  else swal("Erreur", "une erreur s'est produite", "error");
}

const handleAddTopic = async () => {
  if (!topicTitle) {
    swal("Erreur", "Veuillez préciser au moins le titre du sujet", "error")
    return
  }
  
  const userId = localStorage.getItem('userId')
  const data = await addTopic(topicTitle, topicDescription, userId)

  if(data.status) swal("Succés", "Sujet a été ajouté avec succés !", "success");
  else swal("Erreur", data.message, "error");

  fetchData()
}

  const topicClick = (topic) => {
    setSelectedTopic(topic)
  }

  const backToTopics = () => {
    setSelectedTopic(null)
  }

  useEffect(()=> {
    fetchData()
  }, [selectedTopic])

  const showTopic = (
    <div>
      <Post post={selectedTopic} setSelectedTopic={setSelectedTopic}/>
    </div>
  )

  const renderTopics = (
    selectedTopic 
        ? <div style={{ color: "black !important"}}>
            <Button className="btn-back" onClick={backToTopics}><AiOutlineArrowLeft className="iconNav"/>retour à la liste des sujets</Button>
            <br></br>
            {showTopic}
          </div>
        : <div>
            {topics.map( topic => (
              <div className="topic-container" onClick={()=>topicClick(topic)}>{topic.title}</div>
            ))}
            <div className="add-topic-form">
            <input className="input-comment" type="text" name="comment" placeholder="ajouter le titre du sujet" onChange={handleWriteTopicTitle}/>
            <input className="input-comment" type="text" name="comment" placeholder="ajouter la description du sujet" onChange={handleWriteTopicDescription}/>
            <button className="btn-add-topic" onClick={handleAddTopic}>Créer un nouveau sujet</button>
            </div>
        </div>
  );

  return (
    <Container fluid className="main-screen">
        { loading 
            ? <img src="/images/loading.gif" width="500px" height="auto"/> 
            : renderTopics
        }
    </Container>
  );
}

export default Blog;