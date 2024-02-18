const readline = require("readline");
const { log } = require("console");
const users = require("./users.json");
const fs = require("fs");
const getDate = require("./getdate");
const allowedToWithdraw = require("./allowedToWithraw");
const eventEmitter = require("events");
const login = require("./login");
const signUp = require("./signUp");
const accountInfo = require("./accountInfo");

const emitter = new eventEmitter();

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

emitter.on("start", () => {
  log("1- sing Up");
  log("2- log in ");
  log("3- nothing ");
  rl.question("Enter the number of your choice ", (choice) => {
    switch (choice) {
      case "1":
        signUp(rl, showMenu);
        break;
      case "2":
        login(rl, showMenu);
        break;

      case "3":
        rl.close();
        break;
      default:
        log("Invalid option");
        showMenu(account);
        break;
    }
  });
});

emitter.emit("start");

function showMenu(account) {
  log("----> Account Menu<-----");
  log("----- Check balance (1)");
  log("----- Deposit  Money (2)");
  log("----- Withdaw  Money (3)");
  log("----- Transactions (4)");
  log("----- Account Info (5)");
  log("-----  LOG OUT (6)");

  rl.question(
    "\nEnter the number of operation you want to do :\n ",
    (option) => {
      switch (option.trim()) {
        case "1":
          emitter.emit("checkBalance", account);
          break;
        case "2":
          emitter.emit("depositMoney", account);
          break;
        case "3":
          emitter.emit("withdrawMoney", account);
          break;
        case "4":
          emitter.emit("transactions", account);
          break;
        case "5":
          emitter.emit("accountInfo", account);
          break;
        case "6":
          emitter.emit("start");
          break;
        default:
          log("Invalid option");
          showMenu(account);
          break;
      }
    },
  );
}
emitter.on("accountInfo", (account) => {
  accountInfo(account);
  emitter.emit("backToMenu", account);
});

emitter.on("transactions", (account) => {
  const transactions = account.transactions;
  log("your transactions : ");
  transactions.forEach((element) => {
    log(`${element.type} : $${element.amount} in  date : ${element.date}`);
  });
  emitter.emit("backToMenu", account);
});

emitter.on("backToMenu", (account) => {
  rl.question("press enter to back to the menu\n ", () => {
    showMenu(account);
  });
});

// function to add new transaction

emitter.on("depositMoney", (account) => {
  rl.question("\nHow much money would you like to add?:\n", (amount) => {
    let parseAmount = parseFloat(amount);
    if (!isNaN(parseAmount) && parseAmount > 0) {
      account.balance += parseAmount;
      let indexUser = users.findIndex(
        (user) => user.accountID == account.accountID,
      );
      if (indexUser !== -1) {
        log(`you have added $${parseAmount} to your ballance`);

        users[indexUser].balance = account.balance;
        users[indexUser].transactions.push({
          type: "deposit",
          amount: parseAmount,
          date: getDate(),
        });
        fs.writeFileSync("users.json", JSON.stringify(users, null, 3));
        emitter.emit("backToMenu", account);
      } else {
        log("User not found");
        emitter.emit("backToMenu", account);
      }
    } else {
      log("please provide a valide number");
      emitter.emit("depositMoney", account);
    }
  });
});

emitter.on("withdrawMoney", (account) => {
  if (allowedToWithdraw(account)) {
    rl.question("\nHow much money would you like to withraw?:\n", (amount) => {
      let parseAmount = parseFloat(amount);
      if (
        parseAmount <= account.balance &&
        parseAmount <= 5000 &&
        typeof parseAmount === "number" &&
        parseAmount > 0
      ) {
        account.balance -= parseAmount;
        log(`you have withdrawed  $${parseAmount} from your ballance`);
        let indexUser = users.findIndex(
          (user) => user.accountID == account.accountID,
        );
        users[indexUser].balance = account.balance;
        users[indexUser].transactions.push({
          type: "withdraw",
          amount: parseAmount,
          date: getDate(),
        });

        fs.writeFileSync("users.json", JSON.stringify(users, null, 3));
        emitter.emit("backToMenu", account);
      } else if (parseAmount > 5000) {
        log("sorry we cannot withdraw you more than  5000$ ");
        emitter.emit("withdrawMoney", account);
      } else if (!isNaN(parseAmount) && parseAmount > 0) {
        log("You don't have enough money");
        emitter.emit("backToMenu", account);
      } else {
        log("Please enter a valid number");
        emitter.emit("withdrawMoney", account);
      }
    });
  } else {
    log("Sorry, You surpassed  the daily limit of withraws");
    emitter.emit("backToMenu", account);
  }
});

emitter.on("checkBalance", (account) => {
  log(`your balance is $${account.balance}`);
  emitter.emit("backToMenu", account);
});
