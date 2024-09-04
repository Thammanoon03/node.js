const mysql = require ('mysql')

const connection =mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_crud_db',
    // port: '3306'
})
connection.connect((err)=>{
    if (err) {
        console.log('Error connection to mysql')
    }else{
       console.log('Mysql connected successfully') 
    }
    
})

module.exports = connection