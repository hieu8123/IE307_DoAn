# IE307 UIT | Ecommerce Cross Platfrom (React Native) App


## Features :memo:

- [x] Splash Screen
- [x] Login Screen
- [x] Signup Screen
- [x] Forget Screen
- [x] User Profile Screen
- [x] My Account Screen
- [x] Update Password Screen
- [x] Admin Login
- [x] Admin Dashboard
- [x] Admin Add Product
- [x] Admin View Product
- [x] Admin Edit Product
- [x] Cart Screen
- [x] Checkout Screen
- [x] Scan QR code

## How to Run App :white_check_mark:

### System require

- Install [NodeJS](https://nodejs.org/) version 18.17.0 or later.
- Install [Xampp](https://www.apachefriends.org/download.html) version 8.0.8 or later.

### How to run app

1. **Step 1:** Clone this repo .

    ```bash
    git clone https://github.com/hieu8123/IE307_DoAn
    ```

2. **Step 2:** Go to project folder.

    ```bash
    cd IE307_DoAn
    ```

3. **Step 3:** Install dependencies.

    Install dependencies on folder frontend and backend of project
   
    ```bash
    npm install
    ```

5. **Step 4:** Set up Database.

    * Turn on Apache and MySQL on XAMPP

    * Create new database has name:
    ```
    IE307
    ```

    * Import file `CSDL_IE307.sql` in folder `backend\sql` to database.
    
    * If you give the database a different name, please edit the file `BackEnd\src\config\DBConnection.js`:

    ```bash
    host: 'localhost',
    user: 'root',
    database: 'ie307',
    ```

6. **Step 5:** Edit `network` on `FrontEnd\until\until.js` by your ip address.

7. **Step 6:** Run app

   * Run app by this command in folder `frontend` anh `backend`:
     
   ```bash
   npm start
   ```
### Account available

1. **Admin**
      * Username: `admin`.
    
      * Password: `123456`.

3. **User** .

      * Username: `user2`.
    
      * Password: `123456`.
    
