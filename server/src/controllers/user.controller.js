const jwt = require('jsonwebtoken');
const db = require("../config/sequelize");
const User = db.user;
const Profile = db.profile;
const Computer = db.computer;
const Op = db.SequelizeLbr.Op;
const bcrypt = require("bcryptjs");
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: './variables.env' });
//relaciones de tablas

User.belongsTo(Profile,{foreignKey: "idProfile"});// N - N
Profile.hasMany(User,{foreignKey: "idProfile"});// M - N

const saveImages = async (imageName, imageType, imageStream) => {
    try {
        await fs.promises.writeFile(path.join(__dirname, `../files/${imageName}.${imageType}`), Buffer.from(imageStream, 'base64'));
    } catch (error) {
        console.error('Error saving image:', error);
        throw error; // Propagate the error
    }
};

// Retrieve images
exports.getImages = async (req, res) => {
    try {
        const imageName = req.params.imageName;
        // Validate that imageName is provided
        if (!imageName) {
            return res.status(400).send({ message: 'Invalid parameter: image name is required.' });
        }
        // Find panel with the specified image name
        const user = await User.findOne({ where: { imageName: imageName } });
        if (!user) {
            return res.status(404).send({ message: 'User not found for the provided image name.' });
        }
        const imageType = user.imageType;
        const imagePath = path.join(__dirname, `../files/${imageName}.${imageType}`);
        // Check if the image file exists and read its content
        if (!fs.existsSync(imagePath)) {
            return res.status(404).send({ message: 'Image file not found.' });
        }
        const imageBuffer = fs.readFileSync(imagePath);
        // Set the content-type and send the image buffer
        res.set('Content-Type', `image/${imageType}`);
        res.status(200).send(imageBuffer);
    } catch (error) {
        console.error('Error retrieving image:', error);
        res.status(500).send({ message: `An error occurred while retrieving the image: ${error.message}` });
    }
};

//crear y guardar
exports.create = async (req,res)=>{
//se hace una pequeña validacion de ejemplo para luego agregar mas validaciones a los otros campos
    if(!req.body.name || !req.body.lastname || !req.body.password || !req.body.email || !req.body.cardId || !req.body.idProfile || !req.body.state ){
        res.status(400).send({ message:"El contenido no puede estar vacio" });
        return;
    }
    // crear un registro
    
    const user={
        idUser:req.body.idUser,
        name:req.body.name,
        secName:req.body.secName,
        lastname:req.body.lastname,
        secSurname:req.body.secSurname,
        password: bcrypt.hashSync(req.body.password,8),
        email:req.body.email,
        cardId:req.body.cardId,
        idProfile:req.body.idProfile,
        state:req.body.state
    }

    //guardar un registro en la base de datos

    try{
        const data = await User.create(user);
        res.send(data);
    }catch(err){
        res.status(500).send({
            message : err.message || "Hubo un error inesperado"
        });
    }


};
//listar todos los registros de la tabla profile

exports.findAll = async (req,res)=>{
    const idUser =req.query.idUser;

    let condition = idUser?{idUser:{[Op.ilike]: `%${idUser}`}}: null;

    try {
        const data = await User.findAll({include:{ model: Profile, attributes: ["name"] } , where:condition });
        res.send(data);

    } catch (err) {
        res.status(500).send({message: err.message || "Hubo un error al momento de traer a los registros"});
    }
};

//cantidad de usuarios
exports.countUsers = async (req,res)=>{
    try {
        const data = await User.findAll({ attributes:[[Sequelize.fn('COUNT',Sequelize.col('id_user')),'n_users']] });
        res.send(data);

    } catch (err) {
        res.status(500).send({message: err.message || "Hubo un error al momento de contar los registros"});
    }
};


//listar un registro a base de id

exports.findOne = async (req,res)=>{
    const idUser = req.params.id;

    let condition = idUser?{idUser: idUser}: null;
    
    try{
        const data = await User.findOne({ include:[{ model: Profile, attributes: ["name"]},{ model: Computer, attributes:["id_computer","id_serial","mark"]}], where: condition});
        if(data){
            res.send(data);
        }else{
            res.status(404).send({
                message: `No se encontro el registro con el id=${idUser}`
            })
        }
    }catch(err){
        res.status(500).send({
            message: err.message || "Error id= "+id
        })
    }
};

//actualizar registros usuario

exports.update = async (req, res) => {
    const id = req.params.id;
    const saltRounds = 10;
    const password = req.body.password;
    const { imageName, imageStream, imageType } = req.body;

    try {
        if (password) {
            const hash = await bcrypt.hash(password, saltRounds);
            req.body.password = hash;
        }
        // If new image data is provided, save it
        if (imageStream && imageType) {
            await saveImages(imageName, imageType, imageStream);
        }
        const num = await User.update(req.body, {where: { idUser: id }});

        if (num == 1) {
            res.send({ message: 'El registro fue actualizado' });
        } else {
            res.status(500).send({ message: 'Error al actualizar el registro con el id=' + id });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al actualizar el registro con el id=' + id });
    }
};
//eliminar registro por id

exports.delete= async (req,res)=>{
    const id = req.params.id;

    try {
        const num = await User.destroy({
            where:{idUser:id}
            });
        if(num==1){
            res.send({
                message: "El registro fue eliminado exitosamente"
            });
        }else{
            res.send({
                message: `No se pudo eliminar el registro id=${id}`
            });
        }
    } catch (err) {
        res.status(500).send({
            message : err.message || "No puedes eliminar el registro"
        })
    }

};

// Login del usuario
exports.login = async (req, res)=>{

    const { password, cardId } = req.body;
    try {
        const user = await User.findOne({ include:{ model: Profile, attributes: ["name"] }, where: { cardId: cardId}});
        if (user.state === 'Inactivo') {
            res.status(305).send({
                message:"Perfil inactivo comunicate con soporte"
            });
        }else{
            if (!user) {
                res.status(404).json({ message: "Algo salio mal" });
            } else { 
                const isMatched = bcrypt.compareSync(password, user.password);
    
                if (!isMatched){
                    res.status(501).send({ message: "Algo salio mal" });
                } else {        
                    const { idUser,name, secName, lastname, secSurname, cardId, email, idProfile, state, password, tbl_profile } = user
                    
                    let data = JSON.stringify({ idUser, name, secName, lastname, secSurname, cardId, email, idProfile, state, password, tbl_profile});
                    
                    const token = jwt.sign(data, process.env.AUTH_TOKEN_KEY);
                    res.json({token});
                }
            }
        }
    } catch (error) {
        res.status(500).send({
            message:"No se pudo iniciar sesion"
        });
    }
}
