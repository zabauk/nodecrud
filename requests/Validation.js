const Joi=require('joi');

const PostSchema=Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required()
})

module.exports={
    PostSchema
}