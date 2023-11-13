import mongoose from "mongoose";

const formDataSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    areaCode: String,
    country: String,
    business: String,
    description: String,

});

const FormData = mongoose.model('FormData ', formDataSchema);

export default FormData;