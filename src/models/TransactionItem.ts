import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface TransactionItemAttributes {
  id: number;
  transactionId: number;
  productId: number;
  quantity: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TransactionItemCreationAttributes extends Optional<TransactionItemAttributes, 'id'> {}

class TransactionItem extends Model<TransactionItemAttributes, TransactionItemCreationAttributes> implements TransactionItemAttributes {
  public id!: number;
  public transactionId!: number;
  public productId!: number;
  public quantity!: number;
  public price!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TransactionItem.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  transactionId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'transaction_items',
});

export default TransactionItem;
