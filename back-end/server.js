// imports 
const express = require('express')
const body_parser = require('body-parser')
const p = require('path')
const cors = require('cors')
const mdb = require('mongoose')

const app = express()
const port = 4000

app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); 

// mongoose
mongodb_connect().catch((err) => { console.log(err) })

// connecting to mongodb database
async function mongodb_connect() {
    await mdb.connect('mongodb+srv://hello:there@datarepdb.fhnaepc.mongodb.net/?retryWrites=true&w=majority')
    console.log('Connected to Database!\n')
}

// mongodb schema
const account_schema = new mdb.Schema({
    first_name: String,
    last_name: String,
    watchlist: [String]
});

// mongodb 'accounts' collection model
const account_model = mdb.model('accounts', account_schema)

// path middleware
app.use(express.static(p.join(__dirname, '../build')));
app.use('/static', express.static(p.join(__dirname, 'build/static')));

// global variables
let active_account_id = "";
let stored_watchlist = [];

app.get('/signin/account', async (req, res) => {
    let account_status = false;
    let account_fname = "";
    let account_lname = "";
    let account_watchlist = [];

    if (active_account_id != "") {
        account_status = true
        let account = await account_model.findOne(active_account_id);
        // console.log(account)
        account_fname = account.first_name;
        account_lname = account.last_name;
        account_watchlist = account.watchlist;
    } // if someone is logged in
    else {
        account_watchlist = stored_watchlist;
    }

    res.status(200).json({
        message: "Success",
        log_in_status: account_status,
        first_name: account_fname,
        last_name: account_lname,
        watchlist: account_watchlist
    })
})

app.post('/find/account', async (req, res) => {
    let account_first_name = req.body.fname;
    let account_last_name = req.body.lname;
    let account_status = ""

    // find document with first name and last name provided
    let account = await account_model.findOne({first_name: account_first_name, last_name: account_last_name})

    if(account == null) {
        account_model.create({
            first_name: account_first_name,
            last_name: account_last_name,
            watchlist: stored_watchlist
        }).then(() => {
            console.log(`Created new document.\nFirst Name: ${account_first_name}\nLast Name: ${account_last_name}\nEmpty Watchlist.`);
        }).catch((error) => {
            console.log("Data not received");
        })

        account = await account_model.findOne({first_name: account_first_name, last_name: account_last_name});
        active_account_id = account._id;
        account_status = `Created new account. Welcome ${account_first_name} ${account_last_name}!`;
        if (stored_watchlist.length > 0) {
            account_status += " added stored watchlist items";
        }
    } // if document can't be found, make a new document and remember id
    else {
        active_account_id = account._id;
        account_status = `Signed in. Welcome back ${account_first_name} ${account_last_name}`;
    } // else found document, remember id 

    

    res.status(200).json({
        message: "Success!",
        account_status_message: account_status,
        signed_in_status: true
    })
})

app.put('/add/watchlist', async (req, res) => {
    let media_id = req.body.id;
    let found_duplicate = false;

    if (active_account_id != "") {
        let account = await account_model.findOne({_id: active_account_id});
        
        for(let i = 0; i < account.watchlist.length; i++) {
            if (account.watchlist[i] == media_id) {
                found_duplicate = true;
            }
        } // search array to find duplicate

        if (!found_duplicate) {
            account = await account_model.findByIdAndUpdate(active_account_id, {$push: {watchlist: media_id}})
        } // if a duplicate isn't found
    }// add media id to watchlist array for document, if signed in

    else {
        for(let i = 0; i < stored_watchlist.length; i++) {
            if (stored_watchlist[i] == media_id) {
                found_duplicate = true;
            }
        } // search array to find duplicate

        if (!found_duplicate) {
            stored_watchlist.push(media_id);
        } // if no duplicate add id to array
    }   

    res.status(200).json({
        message: "Success"
    })
});

app.put('/remove/watchlist', async (req, res) => {
    let media_id = req.body.id;
    let return_watchlist = []

    if (active_account_id != "") {
        let account = await account_model.findByIdAndUpdate(active_account_id, {$pull: {watchlist: media_id}})
        return_watchlist = account.watchlist;
    }// remove media id from watchlist array for document, if signed in
    else {
        let delete_index = 0;
        for(let i = 0; i < stored_watchlist.length; i++) {
            if (stored_watchlist[i] == media_id) {
                delete_index = i;
                break;
            }
        }
        stored_watchlist.splice(delete_index, 1);
        return_watchlist = stored_watchlist;
    } // remove media id from watchlist array (locally), if not signed in

    res.status(200).json({
        watchlist: return_watchlist
    })
})

app.get('*', (req, res) => {
    res.sendFile(p.join(`${__dirname}/../build/index.html`));
})

app.listen(port, () => {
    console.log(`\nApp waiting for signal on port ${port}`)
    console.log(`Go to http://localhost:${port}\n`)
})
