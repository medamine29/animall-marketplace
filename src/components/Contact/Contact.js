import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { MdEmail } from 'react-icons/md'
import { AiFillPhone, AiFillFacebook, AiFillInstagram } from 'react-icons/ai'

import './Contact.css'

export default function Contact() {
	return (
		<Container>
			<Row>
				<Col xs={6} md={6} lg={6}>
					<Row xs={6} md={6} lg={6} className="smRow">
						<Col xs={2} md={2} lg={2}><MdEmail size={30} color="#3f87a6" /></Col>
						<Col xs={10} md={10} lg={10}><h5 className="smText">animall.service@gmail.com</h5></Col>
					</Row>
					<Row xs={6} md={6} lg={6} className="smRow">
						<Col xs={2} md={2} lg={2}><AiFillPhone size={30} color="#3f87a6" /></Col>
						<Col xs={10} md={10} lg={10}><h5 className="smText">+216 55 555 555</h5></Col>
					</Row>
				</Col>
				<Col xs={6} md={6} lg={6}>
					<Row xs={6} md={6} lg={6} className="smRow">
						<Col xs={2} md={2} lg={2}><AiFillFacebook size={30} color="#3f87a6" /></Col>
						<Col xs={10} md={10} lg={10}><h5 className="smText">https://facebook.com/animall</h5></Col>
					</Row>
					<Row xs={6} md={6} lg={6} className="smRow">
						<Col xs={2} md={2} lg={2}><AiFillInstagram size={30} color="#3f87a6" /></Col>
						<Col xs={10} md={10} lg={10}><h5 className="smText">https://instagram.com/animall</h5></Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
}