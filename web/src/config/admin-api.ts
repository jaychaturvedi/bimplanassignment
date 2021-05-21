import request, { BASE_URL } from "./api"

const adminApi = {
  get: () => request.get(`${BASE_URL}/post`, {}),
  getById: (id) => request.get(`${BASE_URL}/post/${id}`, {}),
  update: (id, body) => request.put(`${BASE_URL}/post/${id}`, body),
  create: (body) => request.post(`${BASE_URL}/post`, body),
  delete: (id) => request.delete(`${BASE_URL}/post/${id}`, {}),
}
export default adminApi
