import React from "react";
import logo from "./../logo.svg";
import { Hero,Section,Container,Media,Heading,Content,Image, Columns, Card, Button } from "react-bulma-components";
import { getSingersQuery} from "../queries/queries";
import {flowRight as compose } from "lodash";
import Swal from "sweetalert2";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import Jumbotron from 'react-bootstrap/Jumbotron';
import ControlledCarousel from './ControlledCarousel';


const Index = props => {
	const data = props.data;
	const singerData = props.getSingersQuery.getSingers ? props.getSingersQuery.getSingers: [];
	




	return (

<Hero size="fullheight" className="dj" >

<ControlledCarousel/>
<Columns >
   {singerData.map(singer =>{

       return(

	 <Card id="proj">
      <Card.Image size="4by3" src="http://bulma.io/images/placeholders/1280x960.png" />

        
      <Card.Content>
        <Media>
         <h3><strong>{singer.name}</strong></h3>
       
        </Media>
        <Content>
          {singer.description}
          
        </Content>
       
        <Link to={"/booking/" +singer.id}>
        		<Button className="button is-medium is-fullwidth">Book Now</Button>
       </Link>
      </Card.Content>
    </Card>
    	);
		})}

  
   </Columns>
</Hero>
		);
};

export default compose(
	graphql(getSingersQuery,{ name: "getSingersQuery"})
	)(Index);

