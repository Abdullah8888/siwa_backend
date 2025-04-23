import jwt, { SignOptions } from 'jsonwebtoken';
import fs from 'fs';

const teamId = '3RDVFJ9DJ6';
const clientId = 'org.vgtechdemo.gopaddi';
const keyId = 'Z9X977Z2KF';
const privateKey = fs.readFileSync('./AuthKey.txt');

export function generateAppleClientSecret(): string {
    const payload = {
        iss: teamId,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (86400 * 180),
        aud: 'https://appleid.apple.com',
        sub: clientId,
    };

    const signOptions: SignOptions = {
        algorithm: 'ES256',
        keyid: keyId,
    };

    return jwt.sign(payload, privateKey, signOptions);
}
