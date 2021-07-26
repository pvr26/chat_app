const sgMail = require('@sendgrid/mail')
require('dotenv').config();

//console.log(process.env)
const sendgridAPIKey = process.env.SG_API_KEY;
sgMail.setApiKey(sendgridAPIKey)

const sendEmail = (email, name, username, room) => {
    var url='https://pvr-chat-app.herokuapp.com/chat.html?username=friend&room='
    url=url+room
    sgMail.send({
        to:email,
        from:'vaibhavreddy57@gmail.com',
        subject: 'A friend needs our help!!',
        text:`Hey ${name}. ${username} needs your help, join the chat with ${url}`
    
    })
}
module.exports = {
	sendEmail
}