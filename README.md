# Visit Home

**Visit Home** is a web application designed to manage student home visit information digitally. It reduces redundant paperwork and enhances the accuracy of data collection and retrieval—such as student home routes, SDQ assessments, and visit reports.

## Key Features

- **Students:** Fill out home information, complete SDQ assessments, check visit and assessment status
- **Teachers:** Manage visit data, view digital maps, print PDF reports
- **Administrators:** Manage academic years, student assignments, and homeroom teachers

## Technologies

- **Backend:** Bun + ElysiaJS
- **Frontend:** React + Tailwind CSS
- **Database:** MongoDB

## Features in v0.1.0
- Can login with google authentication

## How to Use

To clone the project, copy the following command and run it in your terminal:

```bash
git clone https://github.com/PatiphatRattanosot/visit-home.git
```

**Frontend**
```bash
cd frontend
```


Install node modules

```bash
bun install
```

Environment
- create **.env** file in frontend folder

- insert these variable to .env file
```bash
VITE_BASEURL= "your local URL"
VITE_APIKEY= "firebase api key"
VITE_AUTHDOMAIN= "firebase auth domain"
VITE_PROJECTID= "firebase project id"
VITE_STORAGEBUCKET= "firebase storage bucket"
VITE_MESSAGINGSENDERID= "firebase messaging sender id"
VITE_APPID= "firebase app id"
```


Run project
```bash
bun run dev
```



**Backend**

```bash
cd backend
```
Install node modules

```bash
bun install
```
Environment
- create **.env** file in frontend folder

- insert these variable to .env file

```bash
JWT_SECRET= "your json web token secret key"
NODE_ENV= "dev or production"
PORT= "3000"
FRONTEND_URL= "your frontend url"
DB_URL= "mongodb+srv://localhost:27017/visit-home?retryWrites=true&w=majority"
```