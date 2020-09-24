const slugify = string => {
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;"
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------"
  const p = new RegExp(a.split("").join("|"), "g")

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, "") // Trim - from end of text
}

const allFilters = {
  buisness: "01-Atvinnuhúsnæði",
  apt: "02-Einbýlishús",
  multi: "03-Fjölbýlishús",
  school: "04-Skólar",
  summer: "05-Sumarhús",
  union: "06-Stéttarfélög",
  swimmingPool: "07-Sundlaugar",
  planning: "08-Skipulag",
  public: "09-Opinber verk",
  other: "10-Annað",
}

export { slugify, allFilters }
