function generateSlug(txt) {
  return txt.toLowerCase().replace(/\s/g, "-");
}

module.exports = generateSlug;
