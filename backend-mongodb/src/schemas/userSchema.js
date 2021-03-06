import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
    },
    email:{
        type: String
    },
    password:{
        type: String
    }
}) 

// create a static function to find users when they login
userSchema.statics.findByLogin = async function(login){
    let user = await this.findOne({username:login})
    if(!user){
        user = await this.findOne({email:login})
    }
    return user
}


userSchema.pre('remove', function(next){
    this.model('Message').deleteMany({user:this._id}, next)
})

const user = mongoose.model('User', userSchema)
export default user;