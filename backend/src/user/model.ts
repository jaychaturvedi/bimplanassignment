import Sequelize, { BuildOptions, DataTypes, Model } from 'sequelize';
import db from "../db"

export interface TPost {
  title?: string;
  description?: string;
  status?: boolean;
}

type TPostModel<T> = typeof Model & {
  new(values?: object, options?: BuildOptions): T;
};

let Post: TPostModel<TPost & Model> = <TPostModel<TPost & Model>>db.define('posts',
  {
    title: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
  },
  {
    freezeTableName: true
  }
);

export default Post