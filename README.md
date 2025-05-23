# **Book Review App**
Coding Test for Software Engineer Intern

[View the Live App](https://review-my-reads.netlify.app/)  

## **Description**
The Book Review App is a full-stack web application that allows users to browse, add, edit, and delete reviews for their favorite books. It provides an intuitive platform for users to share their opinions, rate books, and discover reviews from the community. The app is built using the MERN stack (SQL, Express.js, React.js, Node.js) and includes basic CRUD functionality with a responsive user interface.

---

## **Features**
- **Add a Review:** Users can submit reviews for books, including the book's title, author, rating, and detailed comments.
- **View Reviews:** All reviews are displayed in a user-friendly format, including the date of submission.
- **Edit Reviews:** Users can update their previously submitted reviews.
- **Delete Reviews:** Users can delete reviews they no longer want to keep.
- **Rating System:** Ratings are displayed using a 1–5 star system.

---

## **Technologies Used**
- **Frontend:** React.js, React Router DOM, Axios
- **Backend:** Node.js, Express.js
- **Database:** SQL
- **Other Libraries:** Body-Parser, CORS

---

## **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone <repository-url>
cd coullex
```

### **2. Backend Setup**
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Connect to the database:
   ```
   const connection = mysql.createConnection({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root', 
    password: '',
    database: 'coullex', 
    connectTimeout: 30000,
   });

   ```
4. Start the backend server:
   ```bash
   nodeman backend/server.js
   ```
   The backend server will run at `http://localhost:5000`.

---

### **3. Frontend Setup**
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm start
   ```
   The frontend will run at `http://localhost:3000`.

---
