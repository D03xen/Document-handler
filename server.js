// Developed by Debparna Biswas
const express = require('express')
const path = require('path')
const app = express()
const multer = require('multer')
const { mergePdfs } = require('./merge')
var docxConverter = require('docx-pdf');
const sharp = require('sharp')
const upload = multer({ dest: 'uploads/' })
app.use('/static', express.static('public'))
const port = process.env.PORT||3000

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "templates/index.html"))
})
app.get('/')
app.post('/merge', upload.array('pdfs', 10), async (req, res, next) => {
    console.log(req.files)
    let d = new Date().getTime()
    for (i = 0; i < ((req.files).length); i++) {
        await mergePdfs(path.join(__dirname, req.files[i].path), d)
    }
    res.redirect(`http://localhost:3000/static/${d}merged.pdf`)
})


app.post('/wordupload', upload.single('wordfile'), async (req, res, next) => {
    console.log(req.file)
    let d = new Date().getTime()
    docxConverter(path.join(__dirname, req.file.path), path.join(__dirname, `./public/${d}converted.pdf`), function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log('result' + result);
        res.redirect(`http://localhost:3000/static/${d}converted.pdf`)
    });
})


app.post('/jpgupload', upload.single('jpgfile'), async (req, res, next) => {
    console.log(req.file)
    format = req.body.format
    if (req.file) {
        console.log(req.file.path)
        let d = new Date().getTime()
        outputFilePath = path.join(__dirname, `./public/${d}converted-to-png.png`);
        await sharp(req.file.path)
        .toFile(outputFilePath, (err, info) => {
            if (err) throw err;
            res.redirect(`http://localhost:3000/static/${d}converted-to-png.png`)
            if (err) throw err;
            
        });
    }
})



app.post('/pngupload', upload.single('pngfile'), async (req, res, next) => {
    console.log(req.file)
    format = req.body.format
    if (req.file) {
        console.log(req.file.path)
        let d = new Date().getTime()
        outputFilePath = path.join(__dirname, `./public/${d}converted-to-jpg.jpg`);
        await sharp(req.file.path)
        .toFile(outputFilePath, (err, info) => {
            if (err) throw err;
            res.redirect(`http://localhost:3000/static/${d}converted-to-jpg.jpg`)
            if (err) throw err;
            
        });
    }
})


app.post('/submit',(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    res.send('Form submitted successfully!');
})
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})