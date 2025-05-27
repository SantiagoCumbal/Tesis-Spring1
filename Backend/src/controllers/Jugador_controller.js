import Jugador from "../models/Jugador.js"

const registro = async (req,res)=>{
    const {email,password} = req.body

    if (Object.values(req.body).includes("")) return res.status(400).json({
        msg:"Lo sentimos, debes llenar todos los campos"
    })

    const verificarEmailBDD = await Jugador.findOne({ email });
    if (verificarEmailBDD) {
        return res.status(400).json({ msg: "Lo sentimos, el email ya se encuentra registrado" });
    }

    const nuevojugador = new Jugador(req.body)
    nuevojugador.password = await nuevojugador.encrypPassword(password)
    await nuevojugador.save()

    const token = nuevojugador.crearToken()
    await sendMailToRegister(email,token)
    await nuevojugador.save()
    res.status(200).json({msg:"Revisa tu correo electrónico para confirmar tu cuenta"})
}

export {
    registro
}
