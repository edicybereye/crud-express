

const router = require('express').Router();
const multer = require('multer');
const { jurusan, student } = require('../controllers');
const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    // konfigurasi penamaan file yang unik
    filename: function (req, file, cb) {
        const name = Date.now() ;
        cb(
            null,
            name + file.originalname
        );
    },
});

const upload = multer(
    {
        storage: diskStorage
    }
)
router.get('/jurusan', jurusan.getDataJurusan);

router.get('/jurusan/:id', jurusan.getDataJurusanByID);

router.post('/jurusan/add', jurusan.addDataJurusan);

router.post('/jurusan/edit', jurusan.editDataJurusan);

router.post('/jurusan/delete/', jurusan.deleteDataJurusan);

router.get('/student', student.getStudents);

router.get('/student/:id', student.getStudentByID);

router.post('/student/add', upload.single('photo'), student.addDataStudents);

router.post('/student/edit', student.editStudents);

router.post('/student/delete/', student.deleteStudent);

module.exports = router;

