import express from "express";
import dotenv from "dotenv";
import FormData from "../Model/formData.js";
import { transporter } from "../Config/mailer.js";

dotenv.config();


//  initilizing the routes
const router = express.Router();

router.post('/submitForm', async (req, res) => {
    try {
        const { name, email, phone, areaCode, country, business } = req.body;

        // const mailOptions = {
        //     from: process.env.MAIL_ID,
        //     to: process.env.RECIPIENT_EMAIL,
        //     subject: 'New Form Submission',
        //     html: `
        //   <p>Name: ${name}</p>
        //   <p>Email: ${email}</p>
        //   <p>Phone: ${areaCode} ${phone}</p>
        //   <p>Country: ${country}</p>
        //   <p>Business: ${business}</p>
        // `,
        // };
        // try {
        //     await transporter.sendMail(mailOptions);
        //     console.log('Email sent successfully');
        // } catch (emailError) {
        //     console.error('Error sending email:', emailError);
        //     // Handle email sending error appropriately, e.g., log, respond to the client, etc.
        //     res.status(500).json({ message: 'Error sending email' });
        //     return;
        // }

        // console.log('Received form data:', req.body);


        const newFormData = new FormData({
            name,
            email,
            phone,
            areaCode,
            country,
            business,
        })

        const validationError = newFormData.validateSync();
        if (validationError) {
            console.error('Validation Error:', validationError);
            res.status(400).json({ message: 'Validation Error', errors: validationError.errors });
            return;
        }
        // Save the document to the database
        const savedFormData = await newFormData.save();
        if (!savedFormData) {
            console.log('Error in saving form data');
            res.status(400).json({ message: "Error in saving form data" })
        }
        console.log('Form data saved successfully:', savedFormData);
        res.status(201).json({ message: 'Form data submitted successfully', savedFormData });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })

    }
})
router.get('/form-data-all', async (req, res) => {
    try {
        const allFormData = await FormData.find();
        console.log('All Form Data:', allFormData);
        if (!allFormData) {
            res.status(400).json({ message: "Wrong Request no data available" })

        }
        res.status(200).json({ formData: allFormData });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFormData = await FormData.findByIdAndDelete(id);

        if (!deletedFormData) {
            return res.status(404).json({ message: "Data not found" })
        }
        res.status(200).json({ message: "Data deleted successfully", deletedFormData })

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})
router.put('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, areaCode, country, business } = req.body;

        const updatedFormData = await FormData.findByIdAndUpdate(id,
            { name, email, phone, areaCode, country, business }, { new: true });
        if (!updatedFormData) {
            return res.status(404).json({ message: "Form data not found" });
        }
        res.status(200).json({ message: "Form data updated successfully", updatedFormData });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });

    }
})




export const formRouter = router;