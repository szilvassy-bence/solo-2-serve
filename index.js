import express from "express";
const app = express();

// to define a root for the application using the app.get() method
// and read the query string
app.get('/', (req, res) => {
  const q = req.query;
  console.log(q);
  res.send(`Ciao ${q.name}`);
});

// to start the application and listen for incoming HTTP requests on port 3000
app.listen(3000, () => {
  console.log(`Open this in your browser: http://127.0.0.1:3000`) // this callback fn is executed once the server is up and running
});

//to accept new request, another app.get() method
app.get('/another-path', (req, res) => {
  res.send('Ciao on another path!');
});

// another key of the request object is params, which is an object
app.get('/users/:userId', (req, res) => {
  res.send(`The user id is: ${req.params.userId}`)
  console.log(req.params);
});

//lets do some basic algorithm with the received data
//////
// this creates a new endpoint, sets up the GET route for /math/:op, where :op is a placeholder for the op name
//this way the operation name will be provided as a parameter in the URL
//if URL: /math/add than the op parameter will be "add"
/* app.get('/math/:op', (req, res) => {
  //extracting the x and y query parameters from the request using req.query, which is an object
  const x = parseFloat(req.query.x);
  const y = parseFloat(req.query.y);
  console.log(req.query); //{ x: '10', y: '2' }
  console.log(req.params);
  
  // this is the same as: const op = req.params.op
  const {op} = req.params; // typeof {op} is string
  
  const result = op === 'add'? x + y : op === 'subtract' ? x - y : op === 'multiply' ? x * y : op === 'divide' ? x / y : false;

  //sends the calculated result back to the client using res.send()
  res.send(result ? `The result is ${result}` : `Unrecognizable operation name`);

}); */

// the upper ternary operator with switch
/* switch (op) {  // checks the same variable 
  case 'add':
    result = x + y;
    break;
  case 'subtract':
    result = x - y;
    break;
  case 'mulitply':
    result = x * y;
    break;
  case 'divide':
    result = x / y;
    break;
  default:        // if none match, default returns;
    result = false;
} */

//convert the response to a JSON object
// close to creating a proper Rest API endpoint, so lets convert the ewaponse to a JSON object
app.get('/math/:op', (req, res) => {
  const x = req.query.x;
  const y = req.query.y;

  const {op} = req.params;

  const result = op === 'add'? x + y : op === 'subtract' ? x - y : op === 'multiply' ? x * y : op === 'divide' ? x / y : false;

  const resultObject = {
    numbers: {
      x: x,
      y: y
    },
    operation: op,
    result: result ? result : `Unrecognizable operation name`
  }
  res.send(resultObject)
})