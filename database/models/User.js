const mongoose =  require('mongoose');
const bcrypt = require('bcryptjs');

const {Schema} = mongoose;

mongoose.set('runValidators', true);

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: [true, "FirstName is required"],
        minlength: [1, "Firstname must be at least 1 character !"]
    },
    lastname: {
        type: String,
        required: [true, "LastName is required"],
        minlength: [2, "Lastname must be at least 2 character !"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [1, "Password must be at least 6 character !"]
    },
    role: {
        type: String,
        default: "user"
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

UserSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

UserSchema.statics.comparePassword = async function(password, hashedPassword){
    return await bcrypt.compare(password, hashedPassword);
}

module.exports = mongoose.model("UserSchema", UserSchema);