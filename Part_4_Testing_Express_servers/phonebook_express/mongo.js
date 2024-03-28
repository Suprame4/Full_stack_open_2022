const mongoose = require('mongoose')
/*
if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[3]*/

const url = `mongodb+srv://fullstack:reactr206@cluster0.mih067p.mongodb.net/phonebookApp?retryWrites=true&w=majority`
            

mongoose.set('strictQuery',false)

//try async/await to connect to mongo
try {
  await mongoose.connect(url)
}
  catch (error){
    console.log("Error ", error)
}
//change the schema 
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 1,
    required: true
  },
  number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

/*
const contact = new Contact({
  name: 'test 2 phonebook',
  number: '206-333',
})

contact.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})*/

Contact.find({}).then(result => {
    result.forEach( contact => {
        console.log(contact)
    })
    mongoose.connection.close()
})