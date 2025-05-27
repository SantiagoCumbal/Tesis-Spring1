import { LoginTicket } from 'google-auth-library';
import app from './server.js';


app.listen(app.get('port'),()=>{
    console.log("Server ok")
})


