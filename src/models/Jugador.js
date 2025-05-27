import {Schema, model} from 'mongoose'
import bcrypt from "bcryptjs"


const jugadorSchema = new Schema({
    nombre:{
        type:String,
        require:true,
        trim:true
    },
    apellido:{
        type:String,
        require:true,
        trim:true
    },
    username:{
        type:String,
        trim:true,
        require:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
		unique:true
    },
    password:{
        type:String,
        require:true
    },
    confirm_password:{
        type:Boolean,
        default:false
    },

},{
    timestamps:true
})


// Método para cifrar el password del veterinario
jugadorSchema.methods.encrypPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password,salt)
    return passwordEncryp
}

// Método para verificar si el password ingresado es el mismo de la BDD
jugadorSchema.methods.matchPassword = async function(password){
    const response = await bcrypt.compare(password,this.password)
    return response
}


export default model('Jugador',jugadorSchema)