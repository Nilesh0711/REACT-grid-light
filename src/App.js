import { useState } from "react";
import "./App.css";

function App() {
  const [order, setorder] = useState([]);
  const [isDeactivating, setisDeactivating] = useState(false);

  const config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  const activatedCells = (index) => {
    let neworder = [...order, index];
    setorder(neworder);
    if (neworder.length === config.flat().length) deactivateCells();
  };

  const deactivateCells = () => {
    setisDeactivating(true);
    const timer = setInterval(() => {
      setorder((originalOrder) => {
        const newOrder = originalOrder.slice();
        newOrder.pop();
        if (newOrder.length === 0) {
          clearInterval(timer);
          setisDeactivating(false);
        }
        return newOrder;
      });
    }, 300);
  };

  return (
    <div className="App">
      <div className="grid">
        {config.flat(1).map((e, index) => {
          return (
            <Cell
              key={index}
              isDisabled={order.includes(index) || isDeactivating}
              filled={order.includes(index)}
              onClick={() => activatedCells(index)}
            />
          );
        })}
      </div>
    </div>
  );
}

const Cell = ({ filled, onClick, isDisabled }) => {
  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      className={filled ? "cell-activated cell" : "cell"}
    ></button>
  );
};

export default App;
