const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql2');

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())
app.use(express.json());

const connection = mysql.createConnection({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root', 
  password: '',
  database: 'coullex', 
  connectTimeout: 30000,
});

connection.connect((err) => {
	if (err) {
	  console.error('Error connecting to MySQL: ' + err);
	  return;
	}
	console.log('Connected to MySQL!');
});

//get one book reviews
app.get('/reviews/:id', (req,res) => {
	const selectSQL = 'select * from reviews where id = ?';

	const id = req.params.id;

	connection.query(selectSQL, [id], (err, data) =>{
		if(!err){
			console.log(data);
			return res.send(data);
		}
	})
})

//get all book reviews
app.get('/reviews', (req,res) => {
	const selectSQL = 'select * from reviews';

	connection.query(selectSQL, (err, data) =>{
		if(!err){
			console.log(data);
			return res.send(data);
		}
	})
})

//new book review
app.post('/reviews', (req,res) => {
	const insertSQL = 'insert into reviews (`title`, `author`, `rating`, `reviewText`, `dateAdded`) values (?)';

	const title = req.body.title;
	const author = req.body.author;
	const rating = req.body.rating;
	const reviewText = req.body.reviewText;
	const dateAdded = new Date();

	const values = [
		title,
		author,
		rating,
		reviewText,
		dateAdded
	]

	connection.query(insertSQL, [values], (err, data) =>{
		if(!err){
			return res.json(data);
		}
	})
})

//edit a book review
app.put('/reviews/:id', (req, res) => {
    const editSQL = 'update reviews set `title` = ?, `author` = ?, `rating` = ?, `reviewText` = ?, `dateAdded` = ? where `id` = ?';

    const id = req.params.id; 

    const dateAdded = new Date();

    const values = [
        req.body.title,
        req.body.author,
        req.body.rating,
        req.body.reviewText,
        dateAdded
    ];

    connection.query(editSQL, [...values, id], (err, data) => {
        if (err) {
            return res.json('Error!');
        }
        return res.json(data);
    });
});


//delete a book review
app.delete('/reviews/:id', (req,res) => {
	const deleteSQL = 'delete from reviews where id = ?';

	const id = req.params.id;

	connection.query(deleteSQL, [id], (err, data) =>{
		if(err){
			return res.json('Error!');
		}
		return res.json(data);
	})
})

app.listen(PORT, () => {
    console.log(`Server is up and running at port ${PORT}`)
})