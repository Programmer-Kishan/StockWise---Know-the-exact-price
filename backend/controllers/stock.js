const fs = require("fs");

exports.getStockData = async (req, res) => {
  const quantity = +req.body.quantity;
  const data = [];

  try {
    const response = await fetch(
      "https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2024-04-18?adjusted=true&apiKey=YOURAPIKEY"
    );
    const stockData = await response.json();

    console.log(stockData.results.length);

    for (let i = 0; i < quantity; i++) {
      let stock =
        stockData.results[Math.floor(Math.random() * stockData.results.length)];
      while (data.includes(stock)) {
        stock =
          stockData.results[
            Math.floor(Math.random() * stockData.results.length)
          ];
      }
      data.push({
        name: stock.T,
        openPrice: stock.o,
        refreshInterval: Math.floor(Math.random() * 5) + 1,
      });
    }

    fs.writeFile("./data/stockdata.json", JSON.stringify(data), (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("data updated");
    });

    return res.status(200).json({
      data: data,
    });
  } catch (error) {
    return res.status(400).json({
        data: "error",
        error: error,
    })
  }
};
