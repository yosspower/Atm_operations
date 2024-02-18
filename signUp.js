const { log } = require("console");
const users = require("./users.json");

function signUp(rl, showMenu) {
  const fs = require("fs");

  rl.question("what is your name \n", (nom) => {
    rl.question("what is your password \n", (pin) => {
      if (nom && pin && isNaN(nom)&&!isNaN(pin)) {
        // convert fromstring to array

        if (pin.length == 4) {
          let newUser = {
            accountID: "ACC" + String(users.length + 1001),
            name: nom,
            pin: pin,
            balance: 0,
            transactions: [],
          };

          users.push(newUser);
          fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
          log(`welcome ${newUser.name} your account has been created`);
          log(`your generated account ID is  : ${newUser.accountID}`);
          let account = users.find(
            (user) => user.accountID === newUser.accountID,
          );
          showMenu(account);
        } else {
          log("password must be 4 characters long");
          signUp(rl, showMenu);
        }
      } else {
        console.log("---->make sure  you enter both fields correctlly!!!<-----");
        signUp(rl, showMenu);

      }

    });

  });
  
}

module.exports = signUp;
