

const router = require('express').Router();
const { jurusan } = require('../controllers');

router.get('/jurusan', jurusan.getDataJurusan);

router.get('/jurusan/:id', jurusan.getDataJurusanByID);

router.post('/jurusan/add', jurusan.addDataJurusan);

router.post('/jurusan/edit', jurusan.editDataJurusan);

router.post('/jurusan/delete/', jurusan.deleteDataJurusan);

module.exports = router;

