const express = require('express');
const multer = require('multer');
const Minio = require('minio');
require('dotenv').config();

const app = express();
const upload = multer({ dest: 'uploads/' }); // carpeta temporal

const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_HOST,  // 192.168.10.23
    port: parseInt(process.env.MINIO_PORT || "9000"),
    useSSL: false,
    accessKey: process.env.MINIO_USER,
    secretKey: process.env.MINIO_PASS
});

// Crear bucket si no existe
minioClient.bucketExists('test', function(err, exists) {
    if (err) return console.log(err);
    if (!exists) {
        minioClient.makeBucket('test', 'us-east-1', function(err) {
            if (err) return console.log(err);
            console.log('Bucket "test" creado');
        });
    }
});

app.use(express.static('public')); // tu frontend (index.html, css, js)

app.post('/upload', upload.single('file'), (req, res) => {
    const filePath = req.file.path;
    const fileName = req.file.originalname;

    minioClient.fPutObject('test', fileName, filePath, function(err, etag) {
        if (err) {
            console.log(err);
            return res.status(500).send('Error subiendo archivo');
        }
        res.send('Archivo subido correctamente a MinIO!');
    });
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
