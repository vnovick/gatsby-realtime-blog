require('dotenv').config()
const express = require('express')
const axios = require('axios')
const app = express()
const bodyParser = require('body-parser')
const port = 5000
app.use( bodyParser.json() );

app.post('/insert_new_user', (req, res) => {
    const { user_id: userId, nickname, email } = req.body;
    const admin_secret = process.env.HASURA_ADMIN_SECRET;
    const url = process.env.HASURA_GRAPHQL_URL;
    axios.post(url, { 
        query: `mutation ($userId: String!, $nickname: String, $email: String!) {
            insert_users(objects: [{id: $userId, name: $nickname, email: $email}], on_conflict: {constraint: users_pkey, update_columns: [name]}) {
              affected_rows
            }
          }
          `,
        variables: {
            userId,
            nickname,
            email
        }
    }, {
        headers: {'content-type' : 'application/json', 'x-hasura-admin-secret': admin_secret}
    }).then(response => {
        console.log(response.data)
    }).catch(res => {
        console.log("ERROR")
        console.log(res)
    });
    res.send('Hello World!')
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))