const { Trade } = require("../schema/trade");
const express = require('express');
const router = express.Router();


router.get('/trades', async (req, res) => {
  Trade.find({}).then(items=>{
        res.json({ status: 200, message: 'Trades saved successfully', data: items })
      })
      .catch((error) => {
        console.error('Failed to save trades:', error);
        res.json({ status: 200, message: `Failed to save trades: ${error}` })
      });    
})

router.post('/trades', async (req, res) => {
    const newUser = new Trade(req.body);
      newUser.save()
        .then(() => {
          console.log('Trade saved successfully');
          res.json({ status: 200, message: 'Trade saved successfully' })
        })
        .catch((error) => {
          console.error('Failed to save trade:', error);
          res.json({ status: 200, message: `Failed to save trade: ${error}` })
        });    
})

module.exports = router;