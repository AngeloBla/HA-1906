//Import aller erforderlichen Module
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const SaleModel = require('../models/saleModel');
const asyncHandler = require('express-async-handler');

// Die Funktion mongoose.Schema wird zu "Schema" vereinfacht
const Schema = mongoose.Schema;

// Hier wird ein neues Schema erstellt
const SaleSchema = new Schema({
  schrauben_typ: { type: String, required: true },
  verkaufsdatum: { type: Date, required: true },
  menge: { type: Number, required: true },
  preis_pro_einheit: { type: Number, required: true },
  produkt_id: { type: String, required: true },
});

// Hier wird das virtuelle Feld "gesamtpreis" definiert. Der Getter (.get) wird als Funktion angegeben,
// die die Menge mit dem Preis pro Einheit multipliziert.
SaleSchema.virtual('gesamtpreis').get(function () {
  return this.menge * this.preis_pro_einheit;
});

// Hier wird das Model SaleSchema als "Sale" exportiert und die Variable SaleModel gespeichert.
const SaleModel = mongoose.model('Sale', SaleSchema);

// Exportieren von SaleModel
module.exports = SaleModel;


// Route für die Verkaufsinformationen einer bestimmten Schraube
router.get('/sales/:id', asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const sales = await SaleModel.find({ produkt_id: productId });
    res.json(sales);
  }));
  
  // Route für die Verkaufsinformationen aller Schrauben
  router.get('/sales', asyncHandler(async (req, res) => {
    const sales = await SaleModel.find();
    res.json(sales);
  }));
  
  // Exportieren von router
  module.exports = router;