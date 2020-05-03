require("dotenv").config();

//const express = require("express");
const fetch = require("isomorphic-fetch");
const figma = require("./lib/figma");

const canvasMap = {};

//const app = express();

function preprocessTree(canvas, node) {
  if (!canvasMap[canvas.id]) {
    canvasMap[canvas.id] = {
      id: canvas.id,
      name: canvas.name,
      vectorMap: {},
      vectorList: [],
    };
  }

  const { vectorMap, vectorList } = canvasMap[canvas.id];

  if (!vectorMap[node.id]) {
    vectorMap[node.id] = node;
    vectorList.push(node.id);
  }
}

function preprocessCanvas(canvas) {
  canvas.children.forEach((child) => {
    if (child.visible !== false) {
      preprocessTree(canvas, child);
    }
  });
}

function selectElement(name) {
  const [element] = Object.keys(canvasMap).filter(
    (current) => canvasMap[current].name === name
  );
  return element ? canvasMap[element] : element;
}

function processColors() {
  const colors = selectElement("Colors");
  figma.generateColors(colors, (error) =>
    error
      ? console.error(error)
      : console.log("JSON colors file generated succesfully")
  );
}

async function figmaFileFetch() {
  const result = await fetch(
    `https://api.figma.com/v1/files/${process.env.FILEID}`,
    {
      method: "GET",
      headers: {
        "X-Figma-Token": process.env.APIKEY,
      },
    }
  );

  const data = await result.json();
  const doc = data.document;

  doc.children.forEach(
    (canvas) => canvas.visible !== false && preprocessCanvas(canvas)
  );

  return processColors();
}

figmaFileFetch().catch((error) => console.log(error));

// app.use("/", async function (req, res, next) {
//   const result = await figmaFileFetch().catch((error) => console.log(error));
//   res.send(JSON.stringify(result));
// });

// const APP = {
//   port: 3000,
// };

// app.listen(APP.port, () =>
//   console.log(`Figma api app listening at http://localhost:${APP.port}`)
// );
