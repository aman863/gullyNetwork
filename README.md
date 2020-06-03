# Transaction processor

Perform various actions on consumer transactions

## Installation

Clone or download the repository

Run npm install to download all the dependencies

```bash
npm install
```

## Usage

Upload data from a file to the database.

test.js is provided to test the API
```
node import-data.js --import
```
Delete the uploaded data
```
node import-data --delete
```

## Testing the API

#Post a transaction

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
Amount is negative for expense and positive for income

#Get transactions

Hit the url /transactions with a get request. Specify query parameters for filtered transactions.

Example url

```
GET http://localhost:3000/transactions?year=2018&month=3&day=18&category=other
```

#Get a particular transaction

Hit the url /transactions/:transactionId with get request.

Example Url

```
GET http://localhost:3000/transactions/158
```

#Get monthly net balance

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

#Get weekly balance

Get weekly net balance for a particular week, weekly balance for a month , a year or all time transactions

Hit the url /transactions/weeklyBalance with get request

For all time transactions, empty req.body




## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
