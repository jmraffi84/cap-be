import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username: String,
    password: String,

});

const AdminLogin = mongoose.model('AdminLogin', adminSchema);

export default AdminLogin;