import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import swal from 'sweetalert';
import { Container } from "react-bootstrap";

function TopicCard() {
  // React States
  const renderTopic = (
    <div>
    </div>
  )

  return (
    <Container fluid className="center-screen">
        {renderTopic}
    </Container>
  );
}

export default TopicCard;