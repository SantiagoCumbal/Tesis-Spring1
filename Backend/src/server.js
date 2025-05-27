// Requerir los módulos
import express from "express";
import dotenv from "dotenv";
import cors from "cors"; //COMUNICA EL FORTEND Y BACKEND CON UN CODIGO DE AREA
import googleRoutes from "./google.js";
import routerJugadores from './routers/Jugador_routes.js';


//Inicializaciones
const app = express()
dotenv.config()

//Configuraciones
const PORT = process.env.PORT || 4000;
//app.set('port', process.env.CLOUDINARY || 3000) //SON DATOS DELICADOS
app.use(cors({
  origin: 'http://localhost:5173'  // Cambia al puerto donde corre tu frontend
}));//Middleware
//Const port = 3000


//Middlewares
app.use(express.json())

//Rutas
app.get('/',(req,res)=>{
    res.send("Server on")
})
// Rutas para veterinarios
app.use('/api',routerJugadores)

// Manejo de una ruta que no sea encontrada
app.use((req,res)=>res.status(404).send("Endpoint no encontrado - 404"))

app.use("/api/auth", googleRoutes);

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});

//exportar la instancia
export default app;






