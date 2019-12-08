const mongoose = require("mongoose")
const Schema = mongoose.Schema  //use mongoose's Schema as our basis

//Actual Schema
const transactionSchema = new Schema({

		userId :{
		type: String
		
	},

		singerId :{
		type: String
		
	},
		date :{
		type: Date
		
	},
		isCompleted :{
		type: Boolean
		
	}
	
	 },{
		timestamps: true
})

//export the model as a module
module.exports = mongoose.model("Transaction", transactionSchema);

