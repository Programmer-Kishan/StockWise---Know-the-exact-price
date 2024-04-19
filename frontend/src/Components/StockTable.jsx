const StockTable = (props) => {
  return (
    <div className="w-full h-fit p-4 grid 2xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
        {props.data.map(stock => (
            <div key={Math.random()} className="w-[350px] bg-gray-500/50 rounded-xl p-3 shadow-xl">
                <div className="w-full flex justify-between font-bold font-Montserrat">
                    <p>Stock Name</p>
                    <p>Opening Price</p>
                </div>
                <div className="w-full flex justify-between font-Poppins">
                    <p>{stock.name}</p>
                    <p>{stock.openPrice.toFixed(3)}</p>
                </div>
            </div>
        ))}
    </div>
  )
}

export default StockTable