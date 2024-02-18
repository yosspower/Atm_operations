const getDate = require("./getdate");
function allowedToWithdraw(account) {
  let day = getDate();
  let userTransactions = account.transactions;
  let withdrawsToday = userTransactions.filter((tr) => {
    return tr.type == "withdraw" && tr.date == day;
  });
  // returnS true if the withraws today less than 5 times ;

  return withdrawsToday.length < 5;
}

module.exports = allowedToWithdraw;
