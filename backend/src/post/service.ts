import PostModel, { TPost } from "./model"
import { PostsError } from "../error"

export type TFilter = {
  name?: string;
  id?: number;
  uid?: string;
  phone?: string;
  email?: string;
  pageSize?: number;
  pageNumber?: number;
}

export default class Posts {

  static async findByUid(id: number) {
    const user = await PostModel.findByPk(id)
    if (!user) throw new PostsError(`${id} not found `)
    return user
  }

  static async findAll() {
    const users = await PostModel.findAll({
      order: [
        ['updatedAt', 'DESC'],
      ],
    })
    return users
  }

  static async createNew(post: TPost) {
    const title = post.description;
    try {
      const newuser = await PostModel.create(post)
      return newuser;
    } catch (error) {
      throw new PostsError("Unable to create new ")
    }
  }

  static async updateById(id: number, post: TPost) {
    try {
      await Posts.findByUid(id)
      const [isUpdated, [result]] = await PostModel.update(post, {
        where: { id },
        returning: true
      })
      return result;
    } catch (error) {
      throw new PostsError("No data to update")
    }
  }

  static async deleteById(id: number) {
    try {
      const deleted = await PostModel.destroy({
        where: { id }
      });
      console.log(deleted);
      if (!deleted) throw new PostsError("No data to delete");
      return deleted
    } catch (error) {
      throw new PostsError("No data to delete");
    }
  }

  static async findAndCountAll(paginate: any, where: any) {
    const users = await PostModel.findAndCountAll({ ...paginate, where })
    if (!users) throw new PostsError("Unable to find and count");
    return users
  }

}
