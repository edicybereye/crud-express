const config = require('../configs/database');
const mysql = require('mysql');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});



module.exports = {
    // Ambil data semua karyawan

    getStudents(req, res) {

        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT a.*, b.major_name majorsName FROM students a 
                left join majors b on a.majorsId = b.majorsId
                ;
                `
                , function (error, results) {
                    if (error) throw error;
                    res.send({
                        // fromCache: isCached,
                        success: true,
                        message: 'Berhasil ambil data!',
                        data: results
                    });
                });
            connection.release();
        })
    },
    // Ambil data karyawan berdasarkan ID
    getStudentByID(req, res) {
        let id = req.params.id;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT a.*, b.major_name majorsName FROM students a 
                left join majors b on a.majorsId = b.majorsId
                 WHERE a.studentId	 = ?;
                `
                , [id],
                function (error, results) {
                    if (error) throw error;
                    res.send({
                        success: true,
                        message: 'Berhasil ambil data!',
                        data: results
                    });
                });
            connection.release();
        })
    },
    // Simpan data karyawan
    addDataStudents(req, res) {
        let data = {
            studentId: req.body.id,
            fullName: req.body.fullName,
            tglLahir: req.body.tglLahir,
            gender: req.body.gender,
            profilePics: req.file.filename,
            document: req.body.document,
            majorsId: req.body.majorsId,
            status: req.body.status,


        }
        try {
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `
                    INSERT INTO students SET ?;
                    `
                    , [data],
                    function (error, results) {
                        if (error) throw error;
                        res.send({
                            success: true,
                            message: 'Berhasil tambah data!',
                        });
                    });
                connection.release();
            })
        } catch (error) {
            console.log(error.message);
        }

    },
    // Update data karyawan
    editStudents(req, res) {
        let dataEdit = {

            fullName: req.body.fullName,
            tglLahir: req.body.tglLahir,
            gender: req.body.gender,
            profilePics: req.body.profilePics,
            document: req.body.document,
            majorsId: req.body.majorsId,
            status: req.body.status,

        }
        let id = req.body.id
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE students SET ? WHERE studentId = ?;
                `
                , [dataEdit, id],
                function (error, results) {
                    if (error) throw error;
                    res.send({
                        success: true,
                        message: 'Berhasil edit data!',
                    });
                });
            connection.release();
        })
    },
    // Delete data karyawan
    deleteStudent(req, res) {
        let id = req.body.id
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM students WHERE studentId = ?;
                `
                , [id],
                function (error, results) {
                    if (error) throw error;
                    res.send({
                        success: true,
                        message: 'Berhasil hapus data!'
                    });
                });
            connection.release();
        })
    }
}