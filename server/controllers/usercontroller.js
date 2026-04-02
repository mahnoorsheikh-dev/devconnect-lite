exports.registerUser = async (req, res) => {

    const { name, email, password } = req.body;

    console.log(name, email, password);

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all fields' });
    } else {
      return res.status(200).json({ message: 'User registered successfully' }); 
    }
}

