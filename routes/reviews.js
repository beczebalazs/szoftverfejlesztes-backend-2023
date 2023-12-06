router.post('/', async (req, res) => {
  const { productId, username, description, rating, date } = req.body;

  try {
    const newReview = new Review({
      productId,
      username,
      description,
      rating,
      date,
    });

    const savedReview = await newReview.save();

    const reviews = await Review.find({ productId });
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    await Product.findByIdAndUpdate(productId, { $set: { rating: averageRating }});

    res.status(201).json(savedReview);
  } catch (error) {
    console.error('Error saving to the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});