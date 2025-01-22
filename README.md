# Feautures, HLD,LLD & Planning:
# Dev Tinder project:
. Dev tinder is bascally tinder like platform to make connection but specially focus on developer.
# Features:
. Create an Account
. Login
. Update your Profile
. Feed of People, Feed Page -explore
. Send Connection Request
. See Our Matches
. See the Request we've sent received
.Update your Profile

# Tech Planning:
these are uses 2 microservices.
1.Frontend Microservices -uses react js 
2.Backend Microservices - uses Nodejs and mongoDB

![Screenshot 2025-01-07 212320](https://github.com/user-attachments/assets/494553ec-53df-4601-b1ca-9a8096f385d0)

![Screenshot 2025-01-07 212434](https://github.com/user-attachments/assets/4812ae31-2c04-4a6a-8f5a-f22648425ead)
![Screenshot 2025-01-07 212507](https://github.com/user-attachments/assets/921930de-9358-4c9e-8a3e-55b1e95ae7d5)
![Screenshot 2025-01-07 212659](https://github.com/user-attachments/assets/a7f05148-2ae4-40a6-b1d1-75b6a4f16f20)
![Screenshot 2025-01-07 212727](https://github.com/user-attachments/assets/aa266fea-529e-4294-aa5b-eb77ad3062e8)
![Screenshot 2025-01-07 212829](https://github.com/user-attachments/assets/b71e3165-0eae-4d05-8256-3d6d60d68b13)
![Screenshot 2025-01-07 212859](https://github.com/user-attachments/assets/401c85ba-2286-4cb0-931d-d6e47dd961a2)


# LLD : 1.DB Design - how will be store the data. create a collection  uses (MONGODB DATABASE)-user collection -what are the first name,last name,emailid, password, age,gender.
user is a entity. a is sending connection request to b.you will need one more coonection.inside the user.to store user data.

-connections request:who is sending connection request.whom is sending connection request.
-from userid
-to userid
status = pending/accepted/ignored,rejected/blocked.
first collection is store the user information.
second collection is store the connection requset.

2. API Design [Rest API]

frontend application-email id,password
backend application- login api is talk to database where is check eamilid and pwd is exists aor not. bascially  api is return to response.
# RESTful APIs are a fundamental part of modern web development, enabling communication and data exchange between client applications and servers. In this tutorial, we will explore how to implement a RESTful API in Node.js, using Express, a popular and lightweight web framework for Node.js. By the end of this guide, you will have a solid understanding of how to build robust and scalable APIs that can handle various CRUD operations.

# Step 1: Initialize a New Node.js Project
Open your terminal or command prompt, create a new project folder, and navigate into it. Use the following command to initialize a new Node.js project:
npm init -y
This will create a package.json file, which will store information about your project and its dependencies.

# Step 2: Install Required Dependencies
We need to install Express, a powerful and minimalist web framework, to build our API. Run the following command to install Express:
npm install express

Additionally, we will use body-parser to parse incoming request bodies and cors to handle Cross-Origin Resource Sharing (CORS) headers:

npm install body-parser cors

# Step 3: Create the Server
Create a new file named server.js in your project folder. This file will serve as the entry point of our API.
# code:
 // Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an instance of Express
const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Server port
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

# Step 4: Define API Routes
In this step, we will create routes for handling various API endpoints. For demonstration purposes, we will create routes to handle CRUD operations for a collection of users.

Create a new file named users.js inside a folder named routes in your project directory. This file will contain the API routes related to users.

# code:
const express = require('express');
const router = express.Router();

// Sample user data (temporary)
let users = [
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Jane Smith', age: 25 },
  // Add more users as needed
];

// Get all users
router.get('/users', (req, res) => {
  res.json(users);
});

// Get a single user by ID
router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === parseInt(id));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
});

// Create a new user
router.post('/users', (req, res) => {
  const { name, age } = req.body;

  // Simple validation
  if (!name || !age) {
    return res.status(400).json({ message: 'Name and age are required' });
  }

  const newUser = { id: users.length + 1, name, age };
  users.push(newUser);

  res.status(201).json(newUser);
});

// Update an existing user by ID
router.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;

  // Simple validation
  if (!name || !age) {
    return res.status(400).json({ message: 'Name and age are required' });
  }

  const user = users.find((user) => user.id === parseInt(id));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.name = name;
  user.age = age;

  res.json(user);
});

// Delete a user by ID
router.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  users = users.filter((user) => user.id !== parseInt(id));
  res.sendStatus(204);
});

module.exports = router;

# Step 5: Integrate API Routes with the Server
Back in the server.js file, we will integrate the users.js routes into our Express application.
code :

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3000;

// Import the users routes
const usersRoutes = require('./routes/users');

// Use the users routes
app.use('/api', usersRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

# Api : An API is a set of rules and protocols that allow one software application to interact with another. It defines the methods and data formats that applications can use to communicate. APIs can be categorized into different types, such as REST, SOAP, and GraphQL, each with its own conventions and use cases.

# Key Concepts of API
Endpoint: The URL where the API can be accessed.
Request: The action of querying the API.
Response: The data returned by the API.
HTTP Methods: Common methods include GET (retrieve data), POST (send data), PUT (update data), and DELETE (remove data).
Authentication: Many APIs require a key or token to authenticate requests

# Types of APIs:
REST (Representational State Transfer): Uses HTTP requests to GET, POST, PUT, and DELETE data. It’s the most common type of API due to its simplicity and scalability.
SOAP (Simple Object Access Protocol): Uses XML for messaging and includes built-in error handling. It’s more rigid and requires more setup than REST.
GraphQL: A query language for APIs that allows clients to request exactly the data they need, making it more efficient in some scenarios.

# Advantages of REST API:

REST API is a lightweight and flexible architecture that can be easily implemented on any platform or language.
REST API is stateless, which means that each request contains all the necessary information to complete the request. This allows for scalability and reduces the load on the server.
REST API is widely adopted and supported by most modern programming languages and frameworks.
REST API provides a simple and standardized way of accessing resources over the internet.

# Disadvantages of REST API:

REST API may not be the best choice for complex business logic and workflows.
REST API can be difficult to implement in certain situations, especially when dealing with complex data structures.
REST API does not provide a built-in authentication or authorization mechanism, which means that developers must implement their own security measures.

# Advantages of RESTful API:

RESTful API is a standardized implementation of the REST architecture, which makes it easier for developers to build and maintain web services.
RESTful API provides a uniform interface for accessing resources, which simplifies the development process.
RESTful API supports caching, which can improve performance by reducing the number of requests sent to the server.
RESTful API can be used with a variety of data formats, including XML and JSON.

# Disadvantages of RESTful API:

RESTful API may not be suitable for complex business logic and workflows.
RESTful API can be difficult to implement in certain situations, especially when dealing with complex data structures.
RESTful API can be slower than other web service architectures, especially when dealing with large amounts of data.

# Similarities between REST API and RESTful API:

Both REST API and RESTful API are based on the REST architecture.
Both REST API and RESTful API are stateless, which means that each request contains all the necessary information to complete the request.
Both REST API and RESTful API provide a simple and standardized way of accessing resources over the internet.

# Difference Between REST and RESTful API

Factors         REST API                        RESTful API

Define          Develops APIs to enable         Web application follows REST architecture, providing 
                 client-server interaction.      interoperability between different systems
Working        Uses web services and is based   Working is completely based on REST applications.
                on request and response.
Bandwidth      This consumes minimum bandwidth.   This consumes less bandwidth.

Format of Data   Format of data is based on HTTP.  Format of data is based on HTTP, text, and JSON.


Cache            It represents cacheable and        The client can access cacheable information anytime and 
                 non-cacheable data                     anywhere.
                    and displaces the 
                    non-cacheable data 
                        when not required.

# What are the Requests in the Postman?
In Postman, “requests” refer to the HTTP requests sent to a web server, which are used to perform various actions such as retrieving, creating, updating, or deleting resources. These requests correspond to different HTTP methods, each serving a specific purpose in the interaction with web services and APIs:

GET: Used to retrieve information from the given server using a given URI. GET requests should only retrieve data and have no other effect on the data.
POST: Sends data to a server to create or update a resource. The data is included in the body of the request. This may be a JSON payload, form data, or file.
PUT: Replaces all current representations of the target resource with the uploaded content. It’s used to update existing resources.
When a client needs to replace an existing Resource entirely, they can use PUT.
PATCH: When they’re doing a partial update, they can use HTTP PATCH.
DELETE: Removes the specified resource from the server.

HTTP METHOD + URL request is collection of restapi.

Post / Signup 
Post /Login
GET /profile -get the data of profile.
post/profile -send the data of profile.
patch/profile
delete/profile
post/review request -accepted, rejected request
post/send request -ignored,interested

get/request
get/connections

# Diffrence betwen put and patch:
# PUT: Replacing Resources
The PUT method is designed for replacing an entire resource. When you send a PUT request, you provide a complete representation of the resource you want to update. If the resource already exists, PUT replaces it with the new data. If it does not exist, PUT can create a new resource at the specified URI.

# Key Characteristics of PUT:
Full Replacement: PUT requires the entire resource representation.
Idempotent: Multiple identical PUT requests will have the same effect as a single request.
Resource Creation: Can create a resource if it does not exist.

# Example: Updating a user’s profile information:
PUT /users/123
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "age": 30
}


# PATCH: Partial Updates
In contrast, the PATCH method is used for making partial updates to a resource. With PATCH, you only send the fields that need to be updated, leaving the rest of the resource unchanged. This is particularly useful for minor changes where sending the entire resource representation would be inefficient.

# Key Characteristics of PATCH:
Partial Modification: Only the fields to be updated are included.
Non-Idempotent: Multiple identical PATCH requests might have different effects, depending on the current state of the resource.
No Resource Creation: PATCH does not create new resources; it only updates existing ones.

# Example: Updating just the user’s email address:
PATCH /users/123
{
  "email": "john.newemail@example.com"
}

# Benefits of Understanding PUT and PATCH
Having a clear understanding of the differences between PUT and PATCH offers several benefits for developers and teams:

Efficient Data Transfer: Using the appropriate method reduces the amount of data sent over the network, improving performance and reducing latency.

Better Resource Management: Accurate use of PUT and PATCH ensures resources are updated correctly, preventing data corruption and inconsistencies.

Improved Code Maintenance: Clear distinctions in your codebase between full replacements and partial updates make the code more readable and maintainable.

Optimized API Design: Leveraging the correct HTTP methods enhances the overall design of your API, making it more intuitive and easier to use for clients.

Reduced Complexity: Properly distinguishing between PUT and PATCH simplifies the logic required for handling updates, leading to cleaner and more manageable code.

# When to Use PUT vs. PATCH
Choosing between PUT and PATCH depends on the nature of your update:

Use PUT when you need to replace the entire resource. This is useful for updates where you have the complete data set and want to ensure the resource is fully updated or created if it doesn't exist.

Use PATCH for incremental updates where you only need to change specific fields. This is efficient for minor changes and reduces the amount of data transmitted over the network.



# AWS
## Deployment

- sign up on AWS
- Launch instance
- chmod 400 <secret>.pem
- ssh commad
- connected to commad

- - Install Node Version 16.7.0
- - Git clone
  - Frontend
  - npm install -> dependencies install
  - npm run build
  - sudo apt update
  - sudo apt install nginx
  - sudo systemctl start nginx
  - sudo systemctl enable nginx
  - copy code from dist(build files) to /var/www/html/
  - sudo scp -r dist/* /var/www/html/
  - Enable port 80 your instance 
- 
- Backend
- - update the mongodb password
- - allowed ec2 instance public IP on mongodb server
- - installed npm install pm2 -g
- - pm2  start npm -- start
- - pm2 log
- - pm2 list, pm2 flush <name>, pm2 stop <name>, pm2 delete <name>