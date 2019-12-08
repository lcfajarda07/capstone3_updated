import {gql} from "apollo-boost";
const getDatesQuery = gql`
{
  getDates{
      id
      name
     

  }
}
`;
export { getDatesQuery };

const getSingersQuery = gql`
{
  getSingers{
      id
      name
      description
  
     

  }
}
`;
export { getSingersQuery };


const getRolesQuery = gql`
{
  getRoles{
      id
      name
    
  
     

  }
}
`;
export { getRolesQuery };

const getUsersQuery = gql`
{
  getUsers{
      id
      firstName
      lastName
      address
      email
      roleId
      username
      password
         role{
        id
        name
      }
     
     

  }
}
`;
export { getUsersQuery };


const getSingerQuery = gql`
query($id : ID!){
  getSinger(id: $id){
      id
      name
      description
      

   
    
    }
  }
`;

export { getSingerQuery };


const getRoleQuery = gql`
query($id : ID!){
  getRole(id: $id){
      id
      name
      
      

   
    
    }
  }
`;

export { getRoleQuery };

const getUserQuery = gql`
query($id : ID!){
  getUser(id: $id){
      id
      firstName
      lastName
      email
      address
     roleId
     username
     password

   
    
    }
  }
`;

export { getUserQuery };