import sequelize from '../config/database';
import User from './User';
import Product from './Product';
import Transaction from './Transaction';
import TransactionItem from './TransactionItem';

// Associations
User.hasMany(Transaction, { foreignKey: 'userId' });
Transaction.belongsTo(User, { foreignKey: 'userId' });

Transaction.hasMany(TransactionItem, { foreignKey: 'transactionId' });
TransactionItem.belongsTo(Transaction, { foreignKey: 'transactionId' });

TransactionItem.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(TransactionItem, { foreignKey: 'productId' });

const initDb = async () => {
  await sequelize.sync({ force: true });
};

export { User, Product, Transaction, TransactionItem, initDb };
