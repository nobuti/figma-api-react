function colorString (color, opacity) {
  return `rgba(${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)}, ${opacity || color.a})`
}

module.exports = { colorString }
