/snacksnap
│── /client         (Frontend: React + Vite + TypeScript)
│   ├── src/
│   ├── tsconfig.app.json
│── /server         (Backend: Express + TypeScript)
│   ├── server.ts   <-- Your backend entry file
│   ├── tsconfig.node.json
│── tsconfig.json   (Base config)
│── package.json    <-- One package.json for everything!
│── node_modules/
│── package-lock.json


## Setup

### 1. To get one package.json and initialize both servers from the root. Need to move the tsconfig.json to the root and tsconfig.node.json to the server.
### 2. Next thing you need to do is initialize a new package.json. can either use npm init-y to get default package.json or initialize cors express dotenv and move the client package.json and merge it into package.json in root.
### 3. Once these are all setup run npm install and delete the old package.json and package-lock.json in client.