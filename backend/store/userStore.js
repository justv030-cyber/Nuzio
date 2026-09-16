// In-memory user store — replace with a real database (Postgres/Mongo/etc.)
// Keeping the same three methods (upsert, findById) means the controller
// never has to change when you swap this out for a real model.

const users = new Map()

export const userStore = {
  upsert(user) {
    users.set(user.id, user)
    return user
  },
  findById(id) {
    return users.get(id) || null
  }
}
