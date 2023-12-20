const express = require('express')
const app = express()
const port = 4000

app.listen(4000, () => {
    console.log(`App waiting for signal on port ${port}`)
    console.log(`Go to http://localhost:${port}`)
})
