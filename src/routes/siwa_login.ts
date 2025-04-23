import express, { Request, Response, Router } from "express";

import axios from 'axios';
import qs from 'qs';
import { generateAppleClientSecret } from '../generate_client_secret';

const clientId = 'org.vgtechdemo.gopaddi';

const router = Router();


router.post("/siwa-login", async (req: Request, res: Response) => {
    const authorizationCode: string = req.body.authorizationCode

    if (authorizationCode == '' || authorizationCode == null) {
        res.status(400).json({ success: false, error: "Missing authorization code" });
        return
    }

    const clientSecret = generateAppleClientSecret();

    const body = qs.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: authorizationCode,
        grant_type: "authorization_code",
    });

    try {

        const response = await axios.post("https://appleid.apple.com/auth/token", body, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        const { id_token } = response.data;
        const base64Payload = id_token.split(".")[1];
        const decoded = JSON.parse(Buffer.from(base64Payload, "base64").toString());
        console.log("Decoded ID Token Payload:", decoded);
        if (decoded.email) {
            res.json({ success: true, email: decoded.email });
            return
        }

        res.status(400).json({ success: false, error: "Email not found in token" });


    } catch (error: any) {
        res.status(error.response?.status).json({ success: false, error: error.response?.data });
    }
});

export default router;
