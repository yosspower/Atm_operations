# Bank Account Management System

## Files

- `users.json`: JSON file containing user account information and transaction history.
- `getdate.js`: Module to get the current date in this format : (YYYY-MM-DD).
- `allowedToWithdraw.js`: Module to check if the user is allowed to withdraw money based on daily limits.
- `useEvents.js`: Event emitter module for handling events like deposit, withdrawal etc.
- `useFunctions.js` : same as `useEvents.js` but with using normal function calling instead of event emitters.
- `login.js` : handle the user log in ,
- `singUp.js` : handle the user singUp and store the user data in `users.json` file ,
- `.prettierrc` : Configuration file for prettier code formatter .

## instructions

1. **SignUp** Users are prompted to choose between SignUp/login. If they choose Sign Up then they will be asked for their name, password and the accountID is generated automatically if you want to login directly just use this informations(accountID: ACC1001, pin: 1234) its predefined in the `users.json` file;

2. **Main Menu**: After successful login/SignUp, you will be redirected to the menu you can choose various operations.
3. **Check Balance**: Allows you to check your account balance.
4. **Deposit Money**: Allows you to deposit money into your account.
5. **Withdraw Money**: Allows you to withdraw money from your account, with checks for sufficient balance and daily withdrawal limits be aware that you cannot withdraw more than 5000$ and more than 5 withdraws per day.
6. **Transactions**: Displays the transaction history for your transactions .
7. **Logout**: Allows you to log out from your account and you will be redirected to the first step **SignUp**.
