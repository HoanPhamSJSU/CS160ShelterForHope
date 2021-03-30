const express = require('express');

app = express()

require('dotenv').config(),


app.use('/api/users/', require('./routes/loginRoute'))
app.use('/', require('./routes/loginRoute'))

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`)
})