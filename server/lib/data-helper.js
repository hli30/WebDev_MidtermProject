module.exports = function makeDataHelpers(knex) {
  return {
    //data getters
    getRestaurants: (callback) => {
      knex.select("*")
        .from("restaurant")
        .limit(10)
        .then((rows) => callback(null, rows))
        .catch((err) => console.log(error.message))
    }
  }
}