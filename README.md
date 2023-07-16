# InvoiceTable Match Scores

Given two files `app.js` and a database file `invoiceTable.db` consisting of table `invoiceTables`.

Write APIs to perform operations on the tables `invoiceTables`

**InvoiceTable Details Table**

| Column        | Type    |
| ----------    | ------- |
| invoiceDate   | DATE    |
| invoiceNumber | INTEGER |
| invoiceAmount | INTEGER |



### API 1

#### Path: `/invoices/`

#### Method: `POST`

#### Description:

Returns a list of all the invoices in the invoice table

#### Response

```
[
  { 
    invoiceNumber: 1,
    invoiceAmount: 25000
  },

  ...
]
```

### API 2

#### Path: `/invoices/:invoiceNumber`

#### Method: `PUT`

#### Description:

Returns a specific invoice based on the invoice Number

#### Response

```
{ 
  invoiceNumber: 3,
  invoiceDate: "16t July 2023"
}
```

### API 3

#### Path: `/invoices/:invoiceNumber`

#### Method: `DELETE`

#### Description:

Delate the details of a specific invoice based on the invoiceNumber

#### Request

```
{
  "invoiceNumber": 1
}
```

#### Response

```
Player Details Updated
```



### API 4

#### Path: `/invoices/`

#### Method: `GET`

#### Description:

Returns the invoice details of a specific invoiceTables Data

#### Response

```
{ 
  invoiceDate: "3 July 2023",
  invoiceNumber: 1,
  invoiceAmount: 20000
}
```

### API 5

#### Path: `/invoices/filter`

#### Method: `GET`

#### Description:

Returns a list of all the invoice of a filter the list

#### Response

```
[
 { 
  invoiceDate: "3 July 2023",
  invoiceNumber: 1,
  invoiceAmount: 20000
}

  ...
]
```
#### CREATE a query detailes

```
        CREATE TABLE invoiceTables(invoiceDate DATE,invoiceNumber INTEGER,invoiceAmount INTEGER);
```

#### INSERT a query detailes

```
        INSERT INTO customers (invoiceDate, invoiceNumber, invoiceAmount)
        VALUES ("3 July 2023", '1', 20000),
               ("4 July 2022", '2', 25000),
               ("5 July 2024", '3', 3000);
```
