import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.HOST_MAILTRAP,
    port: process.env.PORT_MAILTRAP,
    auth: {
        user: process.env.USER_MAILTRAP,
        pass: process.env.PASS_MAILTRAP,
    }
});

const sendMailToRegister = (emailJugador) => {
    const mailOptions = {
        from: 'admin@smartgamer.com',
        to: emailJugador,
        subject: "Delta studio 🎮 - ¡Bienvenido a la partida!",
        html: `
            <p>¡Hola Gamer! 👾</p>
            <p>Gracias por registrarte en Wraith. ¡Ya estás listo para comenzar tu aventura!</p>
            <p>¡Disfruta y diviértete jugando! 🕹️</p>
            <hr>
            <footer>El equipo de Delta studio te da la bienvenida al mundo de los videojuegos.</footer>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error al enviar el correo:", error);
        } else {
            console.log("Correo gamer enviado con éxito:", info.messageId);
        }
    });
};

export default sendMailToRegister;

