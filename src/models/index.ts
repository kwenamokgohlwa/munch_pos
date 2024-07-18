import User from './User';
import Product from './Product';
import UpsellProduct from './UpsellProduct';
import Transaction from './Transaction';
import TransactionItem from './TransactionItem';

// Associations
User.hasMany(Transaction, { foreignKey: 'userId' });
Transaction.belongsTo(User, { foreignKey: 'userId' });

Product.belongsToMany(Product, { through: UpsellProduct, as: 'UpsellProducts', foreignKey: 'productId', otherKey: 'upsellProductId' });

Transaction.hasMany(TransactionItem, { foreignKey: 'transactionId' });
TransactionItem.belongsTo(Transaction, { foreignKey: 'transactionId' });

TransactionItem.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(TransactionItem, { foreignKey: 'productId' });

export { User, Product, UpsellProduct, Transaction, TransactionItem };
