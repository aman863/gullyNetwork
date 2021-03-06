# Transaction processor

Perform various actions on consumer transactions

## Tools

NODE.JS

MONGODB

## .env file

NODE_ENV=*Your environment*

DATABASE=*Your mongoDb key*

DATABASE_PASSWORD=*Your mongoDb password*
## Installation

Clone or download the repository 

Run npm install to download all the dependencies

```bash
npm install
```


server.js is the entry point
## Usage

Upload data from a file to the database.

test.json is provided to test the API

To upload your data change the file location in the import-data.js file to your file location
```
node import-data.js --import
```
Delete the uploaded data
```
node import-data --delete
```

To run the API in development environment
```
npm run start
```

In production environment
```
npm run start:prod
```

open your browser to localhost:3000
## Testing the API

#POST A TRANSACTION

Hit the url /transactions with a post request

Example req.body
```
{
"transactionId":"178",
"targetAccount":"178347861376",
"sourceAccount":"136471361389",
"time":"2018-03-09T12:34:00Z",
"category":"eating_out",
"amount:"-50"
}
```
Amount is negative for expense and positive for income.

Allowed categories are "eating_out","groceries","other","salary"

#GET TRANSACTIONS

Get filtered transactions, sorted and paginated

Hit the url /transactions with a get request. Specify query parameters for filtered,sorted and paginated transactions.

Example url

```
GET http://localhost:3000/transactions?year=2018&month=3&day=18&category=other&sort=amount&limit=10&page=1
```

By default sorting is in ascending order.Use - in sort to get sorting in descending order 

Specify page to get the desired and page and limit to get limited transactions on one page

#GET A PARTICULAR TRANSACTION

Hit the url /transactions/:transactionId with get request.

Example Url

```
GET http://localhost:3000/transactions/158
```

#GET MONTHLY NET BALANCE

Get monthly net balance for a particular month, monthwise net balance for a particular year or monthly net balance of all time transactions.

Hit the url /transactions/monthlyBalance with get request

For all time transactions, hit the url with no req.body

For monthwise net balance for a year.Example req.body
```
{
"year":"2018"
}
```

For a particular month. Example req.body

```
{
"year":"2018",
"month":"3"
//it will give transactions for the month of march,2018
}
```

#GET WEEKLY BALANCE

Get weekly net balance for a particular week, weekly balance for a month , a year or all time transactions

Hit the url /transactions/weeklyBalance with get request

For all time transactions, empty req.body.

For weekly balance of a year , Example req.body
```
{
"year":"2018"
}
```

For weekly balance of a month, Example req.body
```
{
"year":"2018",
"month":"3"
}
```

For net balance of a week. Example req.body
```
{
"year":"2018",
"month":"3",
"week":"2"
}
```

#GET DAILY BALANCE

Get net balance of a particular day or daily net balance of a month.

Hit the url /transactions/dailyBalance with a get request.

For daily balance of a month. Example req.body
```
{
"month":"3"
}
```

For net balance of a particular day.Example req.body

```
{
"month":"3",
"day":"20"
}
```

#GET CATEGORYWISE EXPENDITURE

Get category wise expenditure for a particular day, month ,year or all time transactions.

Hit the url  /transactions/categoryBalance with a get request.

For category wise expense of  all time transactions. Pass empty req.body

For category wise expense of a year. Example req.body
```
{
"year":"2018"
}
```

For category wise expense of a month. Example req.body
```
{
"year":"2018",
"month":"3"
}
```

For category wise expense of a day. Example req.body
```
{
"year":"2018",
"month":"3",
"day":"20"
}
```






## Author
Aman Jain- aman863
