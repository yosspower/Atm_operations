function getDate() {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed, so we add 1
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  return `${year}-${month}-${day}`;
}
module.exports = getDate;
