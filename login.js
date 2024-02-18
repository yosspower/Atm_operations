const { log } = require("console");
const users = require("./users.json");
const fs = require("fs");

function login(rl, showMenu) {
  rl.question("what is your account id \n", (id) => {
    rl.question("what is your pin code : \n", (pin) => {
      if(!isNaN(pin)){

     
      try {
        var account = users.find((ele) => {
          return ele.accountID == id && ele.pin == pin;
        });

        log(`welcome to your account  ${account.name}`);

        showMenu(account);
      } catch {
        log("Invalid Username/Password!!!");
        login(rl, showMenu);
      }
    }else{
      log("PIN Code SHOULD BE A NUMBER")
      login(rl,showMenu);
    }
    });

  });
}

module.exports = login;
