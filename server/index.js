const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'Password123',
    database: 'StickerEcommerce',
});

// Add sticker created to database
app.post('/CreateSticker', (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const image = req.body.image;

    db.query("CALL `Insert_StickersTbl_Proc`(?, ?, ?, ?);",
    [name, description, price, image],
    (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send("values inserted")
        }
    });
});

// Save User sign up data
app.post('/Signup', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const address = req.body.address;
    const zipcode = req.body.zipcode;
    const state = req.body.state;

    db.query("CALL `Insert_UserInfo_Proc`(?, ?, ?, ?, ?, ?);",
        [name, email, password, address, zipcode, state],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send("values inserted")
            }
        });
});

// Retrive Array for states sign up
app.get('/Signup', (req, res) => {
    db.query("CALL `ComboBox_StatesTbl_Proc`;",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result[0]);
            }
        });
});

// Check user sign in
app.post('/Signin', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("CALL `Security_CheckLogin_Proc`(?, ?);",
        [email, password],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                if (result[0]) {
                    res.send(result[0]);
                }
            }
        });
});

// Display Stickers to shop
app.get('/Shop', (req, res) => {
    db.query("CALL `View_AllStickers_Proc`;", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result[0]);
        }
    })
})

// Add sticker to cart
app.post('/Shop', (req, res) => {
    const UserID = req.body.UserID;
    const StickerID = req.body.StickerID;
    const Quantity = req.body.Quantity;

    db.query("CALL `Insert_Carttbl_proc`(?, ?, ?);",
        [UserID, StickerID, Quantity],
        (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("values inserted");
        }
    })
})


// Retrieve Stickers in Cart
app.post('/Cart', (req, res) => {
    const UserID = req.body.UserID;

    db.query("CALL`View_UserCart_Proc`(?)",
        [UserID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result[0]);
            }
        })
})

app.listen(3001, () => {
    console.log('running on port 3001');
})