const Category = require('../models/Category');
const Trip = require('../models/Trip');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.render("categories", {
      title: "TripMate | Categories",
      categories
    });
  } catch (err) {
    console.error("❌ Error loading categories:", err);
    res.status(500).send("Server Error loading categories");
  }
};

exports.getCategoryTrips = async (req, res) => {
  try {
    const categoryName = req.params.name;

    // 🔥 Fetch 5 trips ONLY from this category
    const trips = await Trip.findAll({
      where: { category: categoryName },
      limit: 5
    });

    res.render("categoryTrips", {
      title: `Trips in ${categoryName}`,
      categoryName,
      trips
    });

  } catch (err) {
    console.error("❌ Error loading category trips:", err);
    res.status(500).send("Server Error");
  }
};
