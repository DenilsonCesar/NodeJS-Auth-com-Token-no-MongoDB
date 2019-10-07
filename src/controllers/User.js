const postar = require('../model/schema')

module.exports = {

    async store(req, res){
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
}