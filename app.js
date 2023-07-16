const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB Atlas
mongoose
  .connect(
    "mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.log("Failed to connect to MongoDB Atlas:", error));

// Define the Invoice schema
const invoiceSchema = new mongoose.Schema({
  invoiceDate: { type: Date, required: true },
  invoiceNumber: { type: Number, required: true },
  invoiceAmount: { type: Number, required: true },
});

// Define the Invoice model
const Invoice = mongoose.model("Invoice", invoiceSchema);

// API endpoints
app.post("/invoices", (req, res) => {
  const { invoiceDate, invoiceNumber, invoiceAmount } = req.body;

  // Validate the invoiceDate
  Invoice.findOne()
    .or([
      { invoiceDate: { $gte: invoiceDate } },
      { invoiceDate: { $lte: invoiceDate } },
    ])
    .then((existingInvoice) => {
      if (existingInvoice) {
        return res
          .status(400)
          .json({ error: "Invoice date conflicts with an existing invoice." });
      }

      // Create a new invoice
      const invoice = new Invoice({
        invoiceDate,
        invoiceNumber,
        invoiceAmount,
      });

      invoice
        .save()
        .then((savedInvoice) => {
          res.json(savedInvoice);
        })
        .catch((error) => {
          res.status(500).json({ error: "Failed to save the invoice." });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to check for existing invoices." });
    });
});

app.put("/invoices/:invoiceNumber", (req, res) => {
  const invoiceNumber = req.params.invoiceNumber;
  const { invoiceDate, invoiceAmount } = req.body;

  Invoice.findOneAndUpdate(
    { invoiceNumber },
    { invoiceDate, invoiceAmount },
    { new: true }
  )
    .then((updatedInvoice) => {
      if (!updatedInvoice) {
        return res.status(404).json({ error: "Invoice not found." });
      }

      res.json(updatedInvoice);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to update the invoice." });
    });
});

app.delete("/invoices/:invoiceNumber", (req, res) => {
  const invoiceNumber = req.params.invoiceNumber;

  Invoice.findOneAndDelete({ invoiceNumber })
    .then((deletedInvoice) => {
      if (!deletedInvoice) {
        return res.status(404).json({ error: "Invoice not found." });
      }

      res.json({ message: "Invoice deleted successfully." });
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to delete the invoice." });
    });
});

app.get("/invoices", (req, res) => {
  Invoice.find()
    .then((invoices) => {
      res.json(invoices);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to fetch invoices." });
    });
});

app.get("/invoices/filter", (req, res) => {
  const { financialYear, invoiceNumber, startDate, endDate } = req.query;

  let filter = {};

  if (financialYear) {
    filter = { ...filter, financialYear };
  }

  if (invoiceNumber) {
    filter = { ...filter, invoiceNumber };
  }

  if (startDate && endDate) {
    filter = {
      ...filter,
      invoiceDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
    };
  }

  Invoice.find(filter)
    .then((filteredInvoices) => {
      res.json(filteredInvoices);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to filter invoices." });
    });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
