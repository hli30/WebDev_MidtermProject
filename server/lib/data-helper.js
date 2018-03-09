module.exports = function makeDataHelpers(knex) {
  return {
    //data getters
    getRestaurants: (callback) => {
      return knex.select("*")
        .from("restaurant")
        .limit(10)
        .asCallback(callback);
        // .then((rows) => callback(null, rows))
        // .catch((err) => console.log(err.message))
    },
    getFoods: (id, callback) => {
      return knex.select("*")
        .from("food")
        .where("restaurant_id", id)
        .limit(10)
        .asCallback(callback);
        // .then((rows) => callback(null, rows))
        // .catch((err) => {
        //   console.log(err.message);
        //   callback(error);
        // })
    }
  }
}