const bcrypt = require('bcrypt');
const { authValidation } = require('../validations/auth');
const { findAnyAdminExists, addAdmin, findAdmin } = require('../services/admin');
const generateToken = require('../utils/jwt');

async function signup(req, res) {
    // Validate admin information
    const validation = authValidation(req.body);
    if (validation.error) {
        return res.status(422).json({ success: false, message: validation.error.details[0].message });
    }

    // Check if any admin exists
    const adminExists = await findAnyAdminExists();
    if (adminExists) {
        return res.status(400).json({ success: false, message: 'An admin already exists.' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Save admin into the database
    const newAdmin = await addAdmin({ ...req.body, password: hashedPassword });
    if (!newAdmin) {
        return res.status(400).json({ success: false, message: 'Could not create admin' });
    }
    return res.status(201).json({ success: true, message: 'Sign Up Successful' });
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Validate admin information
        const validation = authValidation(req.body);
        if (validation.error) {
            return res.status(422).json({ success: false, message: validation.error.details[0].message });
        }

        // Find the admin in the database
        const admin = await findAdmin({ email });
        if (!admin) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Invalid password' });
        }

        // Generate a JWT token
        const token = generateToken(admin);
        return res.json({ success: true, data: token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

module.exports = { signup, login };
