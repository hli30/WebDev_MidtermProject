module.exports = function makeDataHelpers(knex) {
  return {
    //data getters
    getRestaurants: (callback) => {
      knex.select("*")
        .from("restaurant")
        .limit(10)
        //array of rows, which r objs of colums?
    }
  }


}