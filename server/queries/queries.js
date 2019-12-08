const {ApolloServer, gql} = require("apollo-server-express");
const { GraphQLDateTime } = require("graphql-iso-date");
// const bcrypt = require("bcrypt");
// const bcrypt = require("bcrypt");
//mongoose models
const Date = require("../models/Date");	 
const Singer = require("../models/Singer");	 
const User = require("../models/User");
const Role = require("../models/Role");
const Transaction = require("../models/Transaction");

//CRUD
// type Query == Retrieve/ Read
// type Mutation == Create/ Update/Delete
//resolver for date schema to be able to handle date data types
const CustomScalarResolver = {
	Date : GraphQLDateTime
};


const typeDefs = gql`
	#this is a comment
	#the type Query is the root of all GraphQL queries
	#this is used for executing "GET" requests

	scalar Date

	type DateType{
		id : ID
		name: String
		createdAt : Date
		updatedAt : Date
		
		

	}

	type SingerType{
		id: ID
		name: String
		description: String
		
		createdAt : Date
		updatedAt : Date
		date: DateType

	}

	type UserType{
		id: ID!
		firstName: String
		lastName: String
		address: String
		email: String
		roleId: String
		username: String
	    password : String
		createdAt : Date
		updatedAt : Date
		role: RoleType
		
	}

	type RoleType{
		id : ID
		name: String
	}
	
	type TransactionType{
		id : ID
		userId: String
		singerId : String
		date: Date
		isCompleted: Boolean
		createdAt : Date
		updatedAt : Date
		singer:SingerType
		user:UserType

	}

	type Query {
		#create a query called hello that will expect a 
		#string data type 
		hello : String
		getDates : [DateType]
		getSingers : [SingerType]
		getUsers: [UserType]
		getRoles: [RoleType]
		getTransactions: [TransactionType]

		getDate(id: ID!) : DateType  
		getSinger(id: ID) : SingerType
		getUser(id: ID) : UserType
		getRole(id: ID) : RoleType
		getTransaction(id: ID) : TransactionType
	}

	#CUD functionality
	#we are mutating the server/database
	type Mutation {

		createDate(name: String

		) : DateType


		createRole(name: String
		) : RoleType

		createSinger(
		name: String
		 description: String
	
		 ) : SingerType

		 createUser(
		 firstName: String
		 lastName: String
		 roleId: String
		 address: String
		 email: String
		 username: String
		 password: String
		 ) :UserType


		 createTransaction(
		 userId : String
		 singerId : String
		 date : Date
		 isCompleted : Boolean
		 ) :TransactionType

		 updateDate(
		 	id : ID
		 	name: String
		 	
		 ) : DateType


		  updateSinger(
		 	id: ID
		 	name: String
			description: String
			dateId: String
		 ) : SingerType

		 updateUser(
		 	id:ID
		 	firstName: String
		 	lastName: String
		 	roleId: String
		 	address: String
		 	email: String
		 	username: String
		 	password: String
		 ) : UserType

		  updateRole(
		 	id : ID
		 	name: String
		 ) : RoleType

		  updateTransaction(
		  	id : ID
		  	userId : String
		  	singerId : String
		  	date : Date
		  	isCompleted : Boolean

		  ) : TransactionType

		 deleteDate(id: String): Boolean

		 deleteSinger(id: String): Boolean

		 deleteUser(id: String): Boolean

		 deleteRole(id: String): Boolean

		 deleteTransaction(id: String): Boolean

		 logInUser(
			username : String,
			password: String
		): UserType
	}
`;	 

const resolvers = {
	//what are we going to do when the query is executed
	Query : {
		hello : () => "my first query",
  		
  		getDates : () => {
  			return Date.find({})
  		},
  		getSingers : () => {
  			return Singer.find({})
  		},
  		getUsers: () => {
  			return User.find({})
  		},

  		getRoles: () => {
  			return Role.find({})
  		},
  		getTransactions: () => {
  			return Transaction.find({})
  		},

  		getUser: (_,args) => {
  			console.log("nagexecute ka ng getMember query")
  			console.log(args)
  			return User.findById(args.id)

  		},
  		getDate: (parent,args) => {
  			console.log(args)
  			console.log("hoy nag getTeam query ka")
  			// return Team.findById(args.id)
  			return Date.findOne({_id : args.id })
  		},
  		getSinger: (parent,args) => {
  			return Singer.findById(args.id)
  			// return Task.findOne({_id : args.id })
  		},

  		getRole: (parent,args) => {
  			return Role.findById(args.id)
  			// return Task.findOne({_id : args.id })
  		},
  		getTransaction: (parent,args) => {
  			return Transaction.findById(args.id)
  		}


	},

	Mutation : {
		createDate : (_,args) => {
			console.log(args)
			let newDate = Date({
				name : args.name
				
			})
			console.log(newDate)
			return newDate.save()
		},

		createSinger : (_,args) => {
			console.log(args)
			let newSinger = Singer({
				name : args.name,
				description : args.description,
				dateId: args.dateId
			})
			console.log(newSinger)
			return newSinger.save()
		},

		createUser : (_,args) => {
			console.log(args)
			let newUser = User({
				firstName : args.firstName,
				lastName : args.lastName,
				address : args.address,
				email : args.email,
				roleId: args.roleId,
				username: args.username,
				//bycript.hashSync( plain password, # of salt rounds )
				password: args.password
				// password: bcrypt.hashSync(args.password, 10)
				 // bcrypt.hashSync(args.password, 10)
			})
			console.log(newUser)
			return newUser.save()
		},

		createRole : (_,args) => {
			console.log(args)
			let newRole = Role({
				name : args.name
				
			})
			console.log(newRole)
			return newRole.save()
		},

		createTransaction : (_,args) => {
			let newTransaction = Transaction({
				userId : args.userId,
				singerId : args. singerId,
				date: args.date,
				isCompleted: args.isCompleted
			})
			return newTransaction.save()
		},
		updateDate: (_, args) => { 
			// findOneAndUpdate(condition, update, callback dunction)
			let condition = {_id: args.id };
			let updates = {
			 name : args.name
			
			}
			// findOneAndUpdate(condition, updates)

			return Date.findOneAndUpdate(condition,updates)
	
		},

		updateSinger: (_, args) => { 
			// findOneAndUpdate(condition, update, callback dunction)
			let condition = {_id: args.id };
			let updates = {
				name : args.name ,
				description : args.description}


				return Singer.findOneAndUpdate(condition,updates)
			},
			// findOneAndUpdate(condition, updates)
				


			updateUser: (_, args) => { 
			// findOneAndUpdate(condition, update, callback dunction)
			let condition = {_id: args.id };
			let updates = { 
				firstName : args.firstName,
				lastName: args.lastName,
				address: args.address,
				email: args.email,
				role: args.roleId,
				username: args.username,
				password: args.password

			}


				return User.findOneAndUpdate(condition,updates)
			

		},


		updateRole: (_, args) => { 
			// findOneAndUpdate(condition, update, callback dunction)
			let condition = {_id: args.id };
			let updates = {
			 name : args.name
			
			}
			// findOneAndUpdate(condition, updates)

			return Role.findOneAndUpdate(condition,updates)
	
		},


		
		deleteUser : (_, args)=>{
			console.log(args.id);
			let condition = args.id;

			return User.findByIdAndDelete(condition)
			.then ((user, err)=>{
				console.log(err);
				console.log(user);
				if (err || !user){
					console.log("delete failed. no user found");
					return false;
				}
				console.log("deleted");
				return true;
			});

		},

		deleteSinger : (_, args)=>{
			console.log(args.id);
			let condition = args.id;

			return Singer.findByIdAndDelete(condition)
			.then ((singer, err)=>{
				console.log(err);
				console.log(singer);
				if (err || !singer){
					console.log("delete failed. no user found");
					return false;
				}
				console.log("deleted");
				return true;
			});

		},

		deleteDate : (_, args)=>{
			console.log(args.id);
			let condition = args.id;

			return Date.findByIdAndDelete(condition)
			.then ((date, err)=>{
				console.log(err);
				console.log(date);
				if (err || !date){
					console.log("delete failed. no date found");
					return false;
				}
				console.log("deleted");
				return true;
			});

		},


		deleteRole : (_, args)=>{
			console.log(args.id);
			let condition = args.id;

			return Role.findByIdAndDelete(condition)
			.then ((role, err)=>{
				console.log(err);
				console.log(role);
				if (err || !role){
					console.log("delete failed. no roles found");
					return false;
				}
				console.log("deleted");
				return true;
			});

		},




		logInUser: (_, args) => {
			console.log("trying to log in...");
			console.log(args);

			// returns the member in our members collection
			// with the same value as args.firstName
			return User.findOne({ username: args.username }).then(user => {
				console.log(user);

				if (user === null) {
					console.log("user not found");
					return null;
				}

				console.log(user.password);
				console.log(args.password);

				// compare the hashed version version of args.password
				// with member.password(already hashed)
				// syntax : bcrypt.compareSync(plain_pass, hashed_pass)

				// create a variable called hashedPassword and assign
				// the value of the result of bcrypt.compareSync
				// let hashedPassword = bcrypt.compareSync(
				// 	args.password,
				// 	user.password
				// );

				// console.log(hashedPassword);

				// if hashedPasword is false, output in the console wrong password
				if (!hashedPassword) {
					console.log("wrong password");
					return null;
				}
				// else output in the console login successful and  return member
				else {
					// successful login
					console.log(user);
					return user;
				}
			});
		}
	},

	// custom type resolver
	//custom Team type resolver
	// TeamType : {
	// 	// declare a resolver for the tasks field inside TeamType
	// 	tasks : (parent, args) => {
	// 		// console.log("getting the task assigned for this team")
	// 		console.log(parent.id)
	// 			return Task.find({ teamId : parent.id })
	// 	}
	// 	// items : (parent, args) => {
	// 	// 	// console.log("getting the task assigned for this team")
	// 	// 	console.log(parent.id)
	// 	// 		return Items.find({ teamId : parent.id })
	// 	// }

	// },

	// DateType : {
	// 	// declare a resolver for the tasks field inside TeamType
	// 	singer : (parent, args) => {
	// 		// console.log("getting the team assigned for this team")
	// 		// console.log(parent.id)
			
	// 			return Date.findOne({ _id : parent.Id })

	// 	}
	// },



	SingerType : {
		// declare a resolver for the tasks field inside TeamType
		date : (parent, args) => {
			console.log("getting the date assigned for this singer")
			console.log(parent.id)
			
				return Date.findOne({ _id : parent.dateId })

		}
	},

		UserType : {
		// declare a resolver for the tasks field inside TeamType
		role : (parent, args) => {
			console.log("getting the singer assigned for this user")
			console.log(parent.id)
			
				return Role.findOne({ _id : parent.roleId })

		}
	},

		TransactionType : {
		// declare a resolver for the tasks field inside TeamType
		user : (parent, args) => {
			console.log("getting the singer assigned for this user")
			console.log(parent.id)
			
				return User.findOne({ _id : parent.userId })

		},

		singer : (parent, args) => {
			console.log("getting the singer assigned for this user")
			console.log(parent.id)
			
				return Singer.findOne({ _id : parent.singerId })

		}


	}



}




//create an instance of the apollo server
//In the most basic sense, the ApolloServer can be started
//by passing schema type defiitions(typeDefs) and the
//resolvers responsible for fetching the data for the declared
//requests/queries

const server = new ApolloServer({
	typeDefs,
	resolvers
})

module.exports = server;