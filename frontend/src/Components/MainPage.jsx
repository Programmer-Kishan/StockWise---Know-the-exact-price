import { useState, useEffect } from "react";

import StockTable from "./StockTable";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "framer-motion";

import axios from "axios";

const MainPage = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [input, setInput] = useState(0);
  const [stockData, setStockData] = useState(null);

  const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

  const color = useMotionValue(COLORS[0]);
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #e3e8e5 50%, ${color})`;

  const handleNumChange = (e) => {
    const num = +e.target.value;
    if (num > 20 || num <= 0) {
      setErrorMsg("Number Cannot be Greater than 20 or less than 0");
      return;
    }
    setErrorMsg(null);
    setInput(num);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    if (input === 0) {
      setErrorMsg("Input Field cannot be left blank");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/stock-data", {
        quantity: input,
      });
      console.log(response);
      if (response.data.data === 'error') {
        setErrorMsg("Unable to Fetch the Stock Data");
        return ;
      }
      setStockData((prev) => response.data.data);
    } catch (error) {
      setErrorMsg("Something Went Wrong While Getting the stock Data")
    }
  };

  useEffect(() => {
    animate(color, COLORS, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  useEffect(() => {
    console.log(stockData);
    const newData = stockData?.slice();
    console.log(newData);
    newData?.map((stock) => {
      const interval = setInterval(() => {
        stock.openPrice = Math.random() * 10 + 4 * 2 - 5;
        setStockData((prev) => newData);
      }, +stock.refreshInterval * 1000);

      return () => clearInterval(interval);
    });
  }, [stockData]);

  return (
    <motion.div
      style={{
        backgroundImage,
      }}
      className="w-full h-screen min-h-full flex flex-col gap-7 items-center"
    >
      <div className="w-full text-center">
        <h1 className=" font-extrabold text-5xl font-Montserrat text-gray-950">
          Welcome to the StockWise
        </h1>
      </div>
      <div className="w-3/5">
        <form onSubmit={handleSubmit}>
          <TextField
            onChange={handleNumChange}
            label="Enter Number between 1-20"
            variant="standard"
            color="success"
            fullWidth
            inputProps={{ type: "number", min: "1", max: "20" }}
          />
          {errorMsg && <p className="text-base text-red-700">{errorMsg}</p>}
          <div className="my-2">
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              className="font-Poppins"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
      <div>
        {stockData && (
          <div className="h-fit">
            <StockTable data={stockData} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MainPage;
