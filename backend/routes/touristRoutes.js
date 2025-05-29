router.post('/signup', async (req, res) => {
  try {
    console.log('Signup request body:', req.body);

    const { fullName, email, country, passport, password } = req.body;

    const existing = await Tourist.findOne({ email });
    if (existing) {
      console.log('Email already exists:', email);
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newTourist = new Tourist({ fullName, email, country, passport, password });
    await newTourist.save();

    console.log('New tourist saved:', newTourist);

    res.status(201).json({ message: 'Signup successful', user: newTourist });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});
