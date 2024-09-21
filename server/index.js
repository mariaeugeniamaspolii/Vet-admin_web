//Imports
import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import veterinarianRoutes from "./routes/veterinarianRoutes.js"
import patientRoutes from "./routes/patientRoutes.js"

//Initialize express
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    limit: "50mb",
    extended: false
}));
// Define port for connections
const PORT = process.env.PORT || 4000;

// Use fn to connect
connectDB();

// Allows fetch from different domains

const allowedDomains = [`${process.env.DOMAIN_URL}`]

// const corsOptions = {
//     origin: function(origin,callback) {
//         if(allowedDomains.indexOf(origin) !== -1) {
//             callback(null, true);
//         } else {
//             callback( new Error('unforbidden domain by CORS'))
//         }
//     }
// }
const corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));

// Define root routes
app.use('/api/veterinarians', veterinarianRoutes);
app.use('/api/patients', patientRoutes);

// Initialize server 
app.listen(PORT, () => {
    console.log(`server port ${PORT}`)
})