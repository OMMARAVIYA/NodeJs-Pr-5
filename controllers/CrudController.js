const CrudTbl = require('../models/CrudTbl');
const fs = require('fs');

const index = async (req, res) => {
    try {
        let user = await CrudTbl.find({});
        if (user) {
            return res.render('form', {
                user,
                single: ""
            })
        } else {
            console.log("Record Not Fatch");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return res.render('back')
    }
}

const AddRecord = async (req, res) => {
    try {
        const { editid, name, director, writer, actor, language, country, type } = req.body;
        if (editid) {
            if (req.file) {
                if (!name || !director || !writer || !actor || !language || !country || !type) {
                    console.log("Fill The Data");
                    return res.redirect('back');
                }
                let deletedata = await CrudTbl.findById(editid);
                if (deletedata) {
                    fs.unlinkSync(deletedata.image);
                }
                else {
                    console.log("File Not Unlink");
                    return res.redirect('back');
                }
                let image = "";
                if (req.file) {
                    image = req.file.path;
                }
                let updatedata = await CrudTbl.findByIdAndUpdate(editid, {
                    name: name,
                    director: director,
                    writer: writer,
                    actor: actor,
                    language: language,
                    country: country,
                    type: type,
                    image: image
                });
                if (updatedata) {
                    console.log("update successfully");
                    return res.redirect('/')
                }
                else {
                    console.log("Not update");
                    return res.redirect('/')
                }
            }
            else {
                let image = "";
                let singledata = await CrudTbl.findById(editid);
                if (singledata) {
                    image = singledata.image;
                    let updatedata = await CrudTbl.findByIdAndUpdate(editid, {
                        name: name,
                        director: director,
                        writer: writer,
                        actor: actor,
                        language: language,
                        country: country,
                        type: type,
                        image: image
                    })
                    if (updatedata) {
                        console.log("Update successfully");
                        return res.redirect('/');
                    }
                    else {
                        console.log("Not Update");
                        return res.redirect('/');
                    }
                }
                else {
                    console.log("record not fatch");
                    return res.redirect('/');
                }
            }
        }
        else {
            if (!name || !director || !writer || !actor || !language || !country || !type) {
                console.log("Fill The Data");
                return res.redirect('back');
            }
            let image = "";
            if (req.file) {
                image = req.file.path;
            }
            let data = await CrudTbl.create({
                name: name,
                director: director,
                writer: writer,
                actor: actor,
                language: language,
                country: country,
                type: type,
                image: image
            });
            if (data) {
                console.log("Data Successfully Inserted");
                return res.redirect('back');
            }
            else {
                console.log(err);
                return res.redirect('back');
            }
        }
    } catch (err) {
        console.log(err);
        return res.redirect('/');
    }
}

const deleteData = async (req, res) => {
    try {
        let id = req.query.id;
        let deleteData = await CrudTbl.findById(id);
        if (deleteData) {
            fs.unlinkSync(deleteData.image);
        }
        else {
            console.log("Record Delete not");
            return res.redirect('/');
        }
        let data = await CrudTbl.findByIdAndDelete(id);
        if (data) {
            console.log("delete successfull");
            return res.redirect('back')
        }
        else {
            console.log("record not delete");
            return res.redirect('back')
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('/');
    }
}


const editData = async (req, res) => {
    try {
        let id = req.query.id;
        let alldata = await CrudTbl.find({});
        let single = await CrudTbl.findById(id);
        if (single) {
            return res.render('form', {
                single,
                user: alldata
            })
        }
        else {
            console.log("record not fatch");
            return res.redirect('/')
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('/');
    }
}

module.exports = {
    index,
    AddRecord,
    deleteData,
    editData
}