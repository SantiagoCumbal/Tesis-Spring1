// google.js
import { OAuth2Client } from "google-auth-library";
import express from "express";

const router = express.Router();

const client = new OAuth2Client("34989899076-4ruvk9qrm3svqq4hgtpplku85qjms6oh.apps.googleusercontent.com" );

router.post("/google", async (req, res) => {
  const { token } = req.body;

 try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "34989899076-4ruvk9qrm3svqq4hgtpplku85qjms6oh.apps.googleusercontent.com", 
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    res.status(200).json({
      success: true,
      message: "Usuario verificado con Google",
      user: { email, name, picture },
    });
  } catch (error) {
    console.error("Error verificando el token:", error);
    res.status(401).json({ success: false, error: "Token inválido" });
  }
});






export default router;

