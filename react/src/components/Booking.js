import React,{useState,useEffect} from "react";
import logo from "./../logo.svg";
import { Table,Section,Container,Media,Heading,Content,Image, Columns, Card, Button } from "react-bulma-components";
import { getSingerQuery,getDatesQuery} from "../queries/queries";
import {flowRight as compose } from "lodash";
import Swal from "sweetalert2";
import { graphql } from "react-apollo";
import Example from "./Calendar";
import {Form,Col,Row} from 'react-bootstrap';
import { createUserMutation} from "../queries/mutations";
import { Link } from "react-router-dom";

import {getUsersQuery} from "../queries/queries";


const Booking = props => {
  console.log(props);
	const data = props.data;
	const singer = props.getSingerQuery.getSinger ? props.getSingerQuery.getSinger: [];
	const dateData = props.getDatesQuery.getDates ? props.getDatesQuery.getDates: [];

 const [name, setName] = useState("");
  const [description, setDescription] = useState("");


///for create username

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [address, setaddress] = useState("");
  const [email, setemail] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  useEffect(()=> {
    console.log(lastName);
    console.log(firstName);
    console.log(address);

    console.log(email);
    console.log(username);
    console.log(password);
  
  });
  const firstNameChangeHandler = e => {
    console.log(e.target.value);
    setfirstName(e.target.value);
  };
  const lastNameChangeHandler = e => {
    console.log(e.target.value);
    setlastName(e.target.value);
  };
  const addressChangeHandler = e => {
    console.log(e.target.value);
    setaddress(e.target.value);
  };
  const emailChangeHandler = e => {
    console.log(e.target.value);
    setemail(e.target.value);
  };
  const usernameChangeHandler = e => {
    setUsername(e.target.value);
  };
  const passwordChangeHandler = e => {
    setPassword(e.target.value);
  };

  const addUser = e => {
      
    

    e.preventDefault();
    let newUser = {
      firstName: firstName,
      lastName: lastName,
      address:address,
      email:email,
   
      username:username,
      password:password
    };
    console.log(newUser);

    props.createUserMutation({


      variables : newUser,
      refetchQueries: [{
        query: getUsersQuery
      }]



    });
    setfirstName("");
    setlastName("");
    setaddress("");
    setemail("");
    setUsername("");
    setPassword("");
  };


	return (

<div>
<Columns>
<Columns.Column>
   <Card id="projbook">
      <Card.Image size="4by3" src="http://bulma.io/images/placeholders/1280x960.png" />

        
      <Card.Content>
        <Media>
         <h3><strong>{singer.name}</strong></h3>
       
        </Media>
        <Content>

          {singer.description}
         
        </Content>
       
    
      

      </Card.Content>
    </Card>
    </Columns.Column>

    <Columns.Column id="colform">

    <Form id="form" onSubmit={addUser}>

      <h1>Sign up to Book Now!</h1>
     <Form.Row>
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>First Name</Form.Label>
      <Form.Control onChange={firstNameChangeHandler} value={firstName} type="text" placeholder="Enter first name" />
    </Form.Group>

     <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Last Name</Form.Label>
      <Form.Control onChange={lastNameChangeHandler} value={lastName} type="text" placeholder="Enter last name" />
    </Form.Group>
  </Form.Row>


  <Form.Row>
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control onChange={emailChangeHandler} value={email} type="email" placeholder="Enter email" />
    </Form.Group>
  </Form.Row>

  <Form.Group controlId="formGridUsername">
    <Form.Label>User Name</Form.Label>
    <Form.Control onChange={usernameChangeHandler} value={username} placeholder="Enter Username" />
  </Form.Group>

  <Form.Group controlId="formGridAddress1">
    <Form.Label>Address</Form.Label>
    <Form.Control onChange={addressChangeHandler} value={address} placeholder="1234 Main St" />
  </Form.Group>

     

 <Form.Group >
 <Form.Label>Event Date</Form.Label>
    <Example/>
  </Form.Group>


 

  <Form.Group id="formGridCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>

  <Button variant="primary" type="submit">
    Submit
  </Button>

</Form>
  
    </Columns.Column>
</Columns>
</div>
		);
};

export default compose(
  graphql(getDatesQuery,{ name: "getDatesQuery"}),
  graphql(getUsersQuery,{ name: "getUsersQuery"}),
  graphql(createUserMutation,{ name: "createUserMutation"}),
	graphql(getSingerQuery, {
    options: props => {
      // retrieve the wildcard id param
      console.log(props.match.params.id);
      return {
        variables: {
          id: props.match.params.id
        }
      };
    },
    name: "getSingerQuery"
  })
	)(Booking);

