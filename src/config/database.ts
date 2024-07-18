import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('mysql://username:password@localhost:3306/munch_pos');

export default sequelize;
