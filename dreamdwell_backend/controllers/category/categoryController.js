const Category = require("../../models/Category");

// CREATE Category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const existingCategory = await Category.findOne({ category_name: name });
    if (existingCategory) {
      return res.status(400).json({ success: false, message: "Category already exists" });
    }

    const category = new Category({ category_name: name });
    await category.save();

    res.status(201).json({ success: true, message: "Category created successfully", category });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET all Categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({ data: categories, success: true, message: "Fetched successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET Category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// UPDATE Category
exports.updateCategory = async (req, res) => {
  try {
    const data = {
      category_name: req.body.name,
    };

    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    if (!updatedCategory) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    res.status(200).json({
      success: true,
      message: "Category updated",
      category: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE Category
exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
