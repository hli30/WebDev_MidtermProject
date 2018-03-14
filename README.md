# Neglect the Plates
"Neglect the Plates" is a single page application built in 5 days with a team of two for Lighthouse Web Dev Bootcamp's mid-term project. This app simulates a food ordering website where a user can place orders to local restaurants, and receive SMS confirmation of the order details.

## Technologies / Frameworks
Front-end by David Haynes:
- jQuery, AJAX, Materialize, Handlebars.js

Back-end by Harry Li:
- PostgreSQL, Node.js, Knex.js, Express, Zomato API, Twilio API

## Screenshots
!["Restaurants list"](https://github.com/hli30/WebDev_MidtermProject/blob/dev/docs/restaurants-list.png)
!["Checkout cart"](https://github.com/hli30/WebDev_MidtermProject/blob/dev/docs/checkout-cart.png)
!["Order confirmation"](https://github.com/hli30/WebDev_MidtermProject/blob/dev/docs/order-confirmation.png)

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
- body-parser
- dotenv
- express
- handlebars
- jquery
- knex
- knex-logger
- materialize
- morgan
- pg
- request
- request-promise
- require-new

## Getting Started

- Install all dependencies by using `npm install` command.
- Create a .env file and fill the required info using the ".env-template" as outline.
- Create schemas and seed your PostgreSQL database by using `npm run reset`.
- Run the development web server using the `npm start` command.
- Go to localhost:8080 or your customized port if you created one in your .env.