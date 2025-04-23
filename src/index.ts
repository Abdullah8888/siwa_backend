import express from "express";
import siwaRoutes from "./routes/siwa_login"; // Adjust path as needed

const app = express();

const PORT = 3002;
const HOST = 'localhost';

app.use(express.json());
app.use("/auth", siwaRoutes); // This will prefix routes like /auth/siwa-login


app.listen(PORT, HOST, (): void => {
    console.log(`🚀 Server running at http://${HOST}:${PORT}`);
});
