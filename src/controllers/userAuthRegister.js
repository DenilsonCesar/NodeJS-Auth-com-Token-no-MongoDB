const postar = require('../model/schema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/chave')

    function geraToken(params = {}) {
        return jwt.sign(params, authConfig.secret, {
            expiresIn: 86400
        });
    }

module.exports = {

    async register(req, res){
        const {nome, email, senha} = req.body;

        try{
            if(await postar.findOne({ email }))
                return res.status(400).send({ error: 'User already exists' });

            const user = await postar.create({ nome, email, senha });

            postar.senha = undefined;

            return res.json({
                user,
                token: geraToken({ id: user.id})
            });

        }catch(err){
            return res.status(400).send({error: 'erro ao inserir!'})
        }
    },

    async auth(req, res){
        const { email, senha } = req.body;

        const user = await postar.findOne({ email }).select('+senha');

        if(!user)
            return res.status(400).send({ error: 'User not found' });

        if(!await bcrypt.compare(senha, user.senha))
            return res.status(400).send({ error: 'Invalid password' });

            user.senha = undefined;

        res.send({ 
            user, 
            token : geraToken({ id: user.id }),
        });
    },
}