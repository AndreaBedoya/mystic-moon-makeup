module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: "categories",
    timestamps: false, // ya tienes created_at y updated_at manuales
  });

  Category.associate = (models) => {
    Category.hasMany(models.Product, { foreignKey: "category_id" });
  };

  return Category;
};
