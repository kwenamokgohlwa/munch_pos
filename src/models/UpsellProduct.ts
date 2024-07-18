import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Product from './product';

interface UpsellProductAttributes {
  id: number;
  productId: number;
  upsellProductId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UpsellProductCreationAttributes extends Optional<UpsellProductAttributes, 'id'> {}

class UpsellProduct extends Model<UpsellProductAttributes, UpsellProductCreationAttributes> implements UpsellProductAttributes {
  public id!: number;
  public productId!: number;
  public upsellProductId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UpsellProduct.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  productId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  upsellProductId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'upsell_products',
});

UpsellProduct.belongsTo(Product, { as: 'product', foreignKey: 'productId' });
UpsellProduct.belongsTo(Product, { as: 'upsellProduct', foreignKey: 'upsellProductId' });

export default UpsellProduct;
