const mongoose = require('mongoose');
const chalk = require('chalk')

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/user-management')
    .then((e)=>{
        console.log(chalk.green('connected to database'),e.connections[0].name,'\n')
    })
