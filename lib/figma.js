const fs = require("fs");

function colorString(color, opacity) {
  return `rgba(${Math.round(color.r * 255)}, ${Math.round(
    color.g * 255
  )}, ${Math.round(color.b * 255)}, ${opacity || color.a})`;
}

function generateColors(colors, callback) {
  const [samples] = colors.vectorList.map((v) => {
    const node = colors.vectorMap[v];
    return node.children.map((color) => {
      const [swatch] = color.fills;
      return {
        name: color.name,
        background: colorString(swatch.color, swatch.opacity),
      };
    });
  });

  const json = {
    colors: samples,
  };

  fs.writeFile("src/colors.json", JSON.stringify(json), "utf8", callback);
}

module.exports = { generateColors };
