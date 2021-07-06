const express = require('express');
const tccWebScraping = require('../out').default;

const app = express();
const port = 3000;

app.get('/:ecommerce', async (req, res) => {
  const { search, restrictName = false } = req.query;
  const { ecommerce } = req.params;

  if (!search) {
    res.status(400);
    res.send({ "error": "Invalid search field" });
    return;
  }

  try {
    const result = await tccWebScraping({ ecommerceOptions: [ecommerce], searchFor: search, restrictName });
    res.send(result);
  } catch (error) {
    res.send({ "error": String(error) });
  }
});

app.listen(port, () => {
  console.log(`Example WebAPI listening at http://localhost:${port}`);
});
