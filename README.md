Flatdango App 🎟️
Flatdango is a movie ticket booking application that allows users to browse available movies, check ticket availability, purchase tickets, and remove movies from the list.

🚀 Live Demo
🔗 Flatdango App

📌 Features
✅ Display a list of movies fetched from a JSON server.
✅ Show movie details, including title, description, runtime, showtime, and available tickets.
✅ Allow users to buy tickets (decreasing available count dynamically).
✅ Prevent users from buying tickets when a movie is sold out.
✅ Delete movies from the list and update the server.

🛠️ Technologies Used
HTML

CSS

JavaScript

JSON Server

Render (for hosting the API)

🔍 Understanding JSON Server & Render
What is JSON Server?
JSON Server is a simple backend tool that allows us to create a mock REST API by using a db.json file. It acts as a database and provides endpoints for CRUD operations.

How the Data is Fetched
The db.json file stores movie details, and the JSON server runs locally or is deployed on Render to provide API endpoints. The movies are fetched using JavaScript's fetch() API.

Example of fetching movies in script.js:

js
Copy
Edit
fetch("https://flatadango-app-1.onrender.com/films")
  .then(response => response.json())
  .then(movies => {
      // Display movie list and details
  })
  .catch(error => console.error("Error fetching movies:", error));
Using Render for Deployment
To keep the API running online, JSON Server was deployed on Render, a free cloud hosting service. This ensures the movie data is always accessible from the web app.

⚡ JavaScript Functionality
1️⃣ Fetching & Displaying Movies

Retrieves the list of movies from the JSON server and populates the UI.

2️⃣ Showing Movie Details

When a user clicks on a movie title, its details (title, description, runtime, showtime, available tickets, etc.) are displayed.

3️⃣ Buying Tickets

Clicking the "Buy Ticket" button decreases the available tickets and updates the server using a PATCH request.

4️⃣ Deleting Movies

Users can remove movies from the list, which also sends a DELETE request to update the backend.

🚧 Challenges Faced
CORS Issues: Initially, the app could not fetch data from Render due to cross-origin restrictions. This was fixed by modifying server settings.

Render Server Sleeping: Render's free tier sometimes puts the JSON server to sleep, causing delays when fetching data.

Deploying JSON Server: Configuring package.json correctly and ensuring the API remains accessible online was tricky.

Fetching & Updating Data: Implementing PATCH and DELETE requests required handling server responses properly.

🔄 Setup Instructions (For Local Development)
1️⃣ Install JSON Server:
npm install -g json-server

2️⃣ Clone this repository:
git clone https://github.com/eve-code93/flatadango_app.git
cd flatadango_app

3️⃣ Start the JSON server:
json-server --watch db.json --port 4000


4️⃣ Open index.html in a browser or use a local server to view the app.

🤝 Contributing
If you'd like to improve this project, feel free to fork the repo, make changes, and submit a pull request! 🚀