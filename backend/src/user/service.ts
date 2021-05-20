import UserModel, { TPost } from "./model"
import { UserError, BikeError } from "../error"

export type TFilter = {
  name?: string;
  id?: number;
  uid?: string;
  phone?: string;
  email?: string;
  pageSize?: number;
  pageNumber?: number;
}

export default class User {

  static async findByUid(id: number) {
    const user = await UserModel.findByPk(id)
    if (!user) throw new UserError(`${id} not found `)
    return user
  }

  static async findAll() {
    const users = await UserModel.findAll({
      order: [
        ['updatedAt', 'DESC'],
      ],
    })
    return users
  }

  static async createNew(post: TPost) {
    const title = post.description;
    try {
      const newuser = await UserModel.create(post)
      return newuser;
    } catch (error) {
      throw new UserError("Unable to create new ")
    }
  }

  static async updateById(id: number, post: TPost) {
    try {
      await User.findByUid(id)
      const [isUpdated, [result]] = await UserModel.update(post, {
        where: { id },
        returning: true
      })
      return result;
    } catch (error) {
      throw new UserError("No data to update")
    }
  }

  static async deleteById(id: number) {
    try {
      const deleted = await UserModel.destroy({
        where: { id }
      });
      console.log(deleted);
      if (!deleted) throw new UserError("No data to delete");
      return deleted
    } catch (error) {
      throw new UserError("No data to delete");
    }
  }

  static async findAndCountAll(paginate: any, where: any) {
    const users = await UserModel.findAndCountAll({ ...paginate, where })
    if (!users) throw new BikeError("Unable to find and count");
    return users
  }

}
