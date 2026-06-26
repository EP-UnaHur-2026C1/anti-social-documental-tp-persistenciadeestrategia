const multer = require("multer");
const path = require("path");
const fs = require("fs");

//Ruta donde se van a guardar las imagenes que subamos
const uploadPath = path.join(__dirname, "../../uploads/posts");

// Si la carpeta no existe, se crea automáticamente
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}


// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  // Genera un nombre único para evitar conflictos
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(
        file.originalname
      )}`
    );
  },
});

module.exports = multer({ storage });