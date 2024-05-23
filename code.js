const app =require('express')();
const PORT =8082;

const morgan=require('morgan')
app.use(morgan('dev'))
app.use(express.json())

app.listen(
    PORT,
    () => console.log(`Server running on ${PORT}`)
);

app.get('/fruits',(req,res) =>{
    const fruits = [
        { id: 1, name: "Apple 🍎" },
        { id: 2, name: "Banana 🍌" },
        { id: 3, name: "Orange 🍊" },
    ];
    res.send(fruits)
})