# fullstack-chat-app
my first full stack app with a very ugly UI

to run the app locally in your system, do the following steps

so in both of the folders, you wouldnt notice the node_modules. so download it by executing the command

cd frontend
npm install

cd ..
cd backend
npm install

this installs the required packages for the projects to run.

youll miss a .env file here create a .env file and enter the required API keys

PORT=3000 (or any other port you want)
API_KEY=(you should use the API key of newsdata.io)
DB_URL=(your mongodb url)
JWT_SECRET=(your secret code for jwt verification)
OPEN_ROUTER_API_KEY=(your api key of open router)

push the env file to the backend folder

now run this command

npm run dev 

 mostly the application listens to the port of your choice if you didnt make any mistake

whatever the port your backedn listens to, edit the urls on the frontend

see through every page and identify where a request is made with axios, edit there with a url - "http://localhost:{your_port}/"

I changed the localhost with the deployed backend URL to host my app. you can change the API base url with your local host url to run the app locally

after that run this command

npm run dev

go to http://localhost:5173/ in your browser

and you will see the app running locally in your system. To get the DB_URL go to mongoDB atlas, sign up and create a cluster after creating a new project.
