export function formatCurrency(currency) {
  return new Intl.NumberFormat("de-DE").format(currency);
}

export function formatNumberToSocialStyle(value) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  })
    .format(value)
    .replace(".", ",")
    .toLowerCase();
}

export const rateSale = (original, sale) =>
  Math.round(((original - sale) / original) * 100) + "%";

const removeSpecialCharacter = (str) => {
  return str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    "",
  );
};

export const generateNameId = ({ name, id }) => {
  return removeSpecialCharacter(name).replace(/\s/g, "-") + `-i,${id}`;
};

export const getIdFromNameId = (nameId) => {
  const arr = nameId.split("-i,");
  return arr[arr.length - 1];
};
