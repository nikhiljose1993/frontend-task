import "./App.css";
import { useEffect, useState } from "react";
import { fabric } from "fabric";
import Erasor from "../src/icons/eraser.png";
import Pencil from "../src/icons/pencil.png";
import Check from "../src/icons/check.png";

const colors = ["#333333", "#219653", "#f2c94c", "#2f80ed", "#eb5757"];

function App() {
  const [penSize, setPensize] = useState(1);
  const [erazerSize, setErazerSize] = useState(1);
  const [canvas, setCanvas] = useState("");
  const [selectedTool, setSelectedTool] = useState("pen");
  const [selectedColor, setSelectedColor] = useState("#333333");

  const initialiseCanvas = () =>
    new fabric.Canvas("drawingBoard", {
      height: window.innerHeight,
      width: window.innerWidth,
      isDrawingMode: true,
    });

  useEffect(() => {
    setCanvas(initialiseCanvas());
  }, []);

  useEffect(() => {
    if (canvas && selectedTool === "pen") {
      setCanvas((canv) => {
        canv.freeDrawingBrush.color = selectedColor;
        canv.freeDrawingBrush.width = penSize;
        return canv;
      });
    } else if (canvas && selectedTool === "eraser") {
      setCanvas((canv) => {
        canv.freeDrawingBrush.color = "white";
        canv.freeDrawingBrush.width = erazerSize;
        return canv;
      });
    }
  }, [canvas, erazerSize, penSize, selectedColor, selectedTool]);

  const changePenColor = (color) => {
    setSelectedTool("pen");
    setSelectedColor(color);
  };

  return (
    <div>
      <div className="wrapper">
        <div className="pencil">
          <button
            className="icon-btn"
            style={{ backgroundColor: selectedColor }}
            onClick={() => {
              setSelectedTool("pen");
            }}
          >
            <img alt={"pen"} className="btn-img" src={Pencil}></img>
          </button>
          <input
            type="range"
            min="1"
            max="100"
            className="range-slider"
            value={penSize}
            onChange={(e) => setPensize(parseInt(e.target.value))}
            id="pen-size"
          />
          <div className="btn-wrapper">
            {colors.map((colorstring, index) => (
              <button
                key={index}
                class="btn"
                style={{ backgroundColor: colorstring }}
                onClick={() => {
                  changePenColor(colorstring);
                }}
              >
                {colorstring === selectedColor ? (
                  <img
                    alt={"check"}
                    className="color-check-img"
                    src={Check}
                  ></img>
                ) : null}
              </button>
            ))}
          </div>
        </div>
        <div className="eraser">
          <button
            className="icon-btn"
            onClick={() => {
              setSelectedTool("eraser");
            }}
          >
            <img alt={"eraser"} className="btn-img" src={Erasor}></img>
          </button>
          <input
            type="range"
            min="1"
            max="100"
            value={erazerSize}
            className="range-slider"
            onChange={(e) => setErazerSize(parseInt(e.target.value))}
            id="eraser-size"
          />
        </div>
      </div>
      <canvas id="drawingBoard" />
    </div>
  );
}

export default App;
