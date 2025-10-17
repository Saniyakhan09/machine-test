#MERN Machine Test — Admin, Agent and CSV Distribution


This project allows an Admin to log in, create Agents, upload CSV/XLSX files, and distribute list items equally among 5 agents. Once on the login page, enter the credentials:

admin credentials
Email: auybshariff00@gmail.com
Password: saniya71

After login, the Admin is redirected to the *Dashboard*, which has three main sections:
1. Create Agents – Add new agents with name, email, mobile, and password.  
2. Agents – View all created agents in a table format.  
3. Upload List – Upload .csv, .xlsx, or .axls files.  
   - The data is validated and distributed equally among all agents.  
   - Each agent’s assigned data includes Name, Phone Number, and Notes.



#Features
. Admin Login (JWT Authentication)  
. Add / Manage Agents  
. Upload CSV/XLSX/AXLS Files  
. Automatic Task Distribution Among Agents  
. MongoDB Database Integration  
. Error Handling and Validation  
. Frontend React.js and Tailwind css


#Tech

Frontend: React.js and Tailwind css
Backend: Node.js + Express.js  
Database: MongoDB  
Authentication: JWT  


#Setup 
Backend: node server.js
Frontend: nmp run dev

#Repository

git: https://github.com/Saniyakhan09/machine-test
cd machine
