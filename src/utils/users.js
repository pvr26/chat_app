const { sendEmail } = require('./email')
var fs = require('fs')
var data;
fs.readFile('./src/utils/data.json', (err, file) => {
    if (err)
      console.log(err);
    else {
      data = JSON.parse(file);
    }
})

const users = []

const addUser = ({ id, username='', room='' }) => {

	// Clean the data
	username = username.trim().toLowerCase()
	room = room.trim().toLowerCase()

	// Validate the data
	if(!username || !room) {
		return {
			error: "Username and room are required!"
		}
	}

	// Check for existing user
	const existingUser = users.find((user) => {
		return user.room === room && user.username === username;
	})

	//Validate username
	if(existingUser) {
		return {
			error: 'Username in use already!'
		}
	}

	//Help features
	const str="help";
	if(room.includes(str))
	{
		if(username=='friend' && users.length==0)
		{
			return {
				error: 'Room is empty! Will notify you again if anyone needs your help'
			}
		}
		if(users.length==2)
		{
			return {
				error: 'Room is in use already!'
			}
		}
		if(users.length==0)
		{
			data.forEach((ele) => {
				sendEmail(ele.email,ele.name,username,room)
			});
		}
	}

	// Store user
	const user = { id, username, room }
	users.push(user)
	return { user }
}

const removeUser = (id) => {
	const index = users.findIndex((user) => user.id === id)

	if(index !== -1) {
		return users.splice(index, 1)[0]
	}
}

const getUser = (id) => {
	return users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => {
	room = room.trim().toLowerCase()
	return users.filter((user) => user.room === room)
}

module.exports = {
	addUser,
	removeUser,
	getUser,
	getUsersInRoom
}

