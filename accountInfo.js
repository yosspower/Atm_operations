function accountInfo(account) {
  return console.log(
    `name : ${account.name}  balance : ${account.balance}  id : ${account.accountID}`,
  );
}
module.exports = accountInfo;
