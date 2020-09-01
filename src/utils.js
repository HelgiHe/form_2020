const slugify = input =>
  input
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\x00-\x7F]/g, "")
    .slice(0, 200)

export { slugify }
