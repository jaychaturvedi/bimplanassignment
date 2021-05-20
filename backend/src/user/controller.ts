import User, { TFilter } from "./service";
import { pagination, filters } from "../helper";

export async function create(body: any) {
  const uid = body.uid as string
  const phone = body.phone as string
  console.log("new user", { uid: uid, phone: phone })
  console.log("connecting for CreateUser")
  let newUser: any
  try {

    newUser = await User.createNew({ status: body.status, description: body.description })
  } catch (e) {
    newUser = e
  }
  console.log(newUser);
  const response = {
    statusCode: 200,
    headers: {
      "x-custom-header": "user_creation"
    },
    body: JSON.stringify({ uid: uid, phone: phone }),
    isBase64Encoded: false
  };
  return newUser
  // console.log(response);
}
export async function paginateUser(filter: TFilter) {
  const { pageNumber, pageSize } = filter
  delete filter.pageNumber; delete filter.pageSize
  let paginate = {}
  if (pageNumber || pageSize) {
    paginate = pagination(pageNumber!, pageSize!);
  }
  const where = filters(filter)
  const users = await User.findAndCountAll(paginate, where)
  if (!users) return 0
  return users
}
