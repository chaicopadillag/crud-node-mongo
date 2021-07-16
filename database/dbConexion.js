const mongoose = require('mongoose');

const dbConexion = async () => {
  try {
    await mongoose.connect(process.env.URL_MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('DB online');
  } catch (error) {
    throw new Error('Error al conectar con la base de datos');
  }
};

module.exports = dbConexion;
