const mongoose = require('mongoose');

const dbConection = async ()=>{
    try {
        const connexion = await mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true})
        console.log(`DB conectada: ${connexion.connection.host} - Puerto: ${connexion.connection.port} .... :)`);
    } catch (error) {
        console.log(`${error.message}`);
        throw new Error('DB can´t connection inicializes');
    }
}

module.exports = {dbConection};