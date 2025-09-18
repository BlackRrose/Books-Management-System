# 📚 Books Management System

## 📌 Objective
A full-stack **Books Management System** application built with **C# (.NET 8)**, **SQL database**, and **Angular (v8+)**.  
The project demonstrates end-to-end development with RESTful APIs, CRUD operations, and a responsive front-end.  

This project provides hands-on experience in **full-stack development** while reinforcing **self-learning** and **troubleshooting skills**.

---

## 🚀 Features

### ✅ Backend (C# / .NET 8)
- RESTful APIs for **CRUD operations**:
  - Create → Add new books
  - Read → Fetch single or multiple books
  - Update → Edit existing book details
  - Delete → Remove books from catalog
- Clean architecture with **controller → service → repository** layers
- Entity Framework Core for SQL database interactions
- Asynchronous calls with proper error handling
- Dependency injection for services and repositories

### ✅ Database
- **SQL Server** (or any relational DB) as the primary database
- Schema includes basic `Books` table with fields such as:
  - `Id`
  - `Title`
  - `Author`
  - `PublishedDate`
  - `Genre`
  - `ISBN`

### ✅ Front-End (Angular 8+)
- Responsive Angular web app
- Features:
  - Book listing (fetch all books)
  - Book detail view
  - Add/Edit/Delete book entries
- Consumes the .NET REST API
- Uses Angular services & HttpClient for API calls
- Bootstrap/Material for styling

---

## 🏗️ Architecture Overview

The solution follows a layered architecture:

- **API Layer** → Exposes REST endpoints (`/api/books`)
- **Service Layer** → Business logic and validation
- **Repository Layer** → Database access (EF Core)
- **Database** → SQL Server with `Books` table
- **UI Layer** → Angular SPA consuming the API

---


---

## 🛠️ Getting Started

### Prerequisites
- .NET 8 SDK
- Node.js 16+ and npm
- Angular CLI (v8+)
- SQL Server (LocalDB or full instance)

### Backend Setup
1. Navigate to backend folder:
   ```bash
   cd backend/Books.Api
   dotnet restore
   dotnet ef database update
   dotnet run


API available at:
Swagger UI → http://localhost:5000/swagger
REST API → http://localhost:5000/api/books]


### Frontend Setup
```bash
Frontend Setup
npm install
ng serve -o
```


###Example API Endpoints

**Get all books**
```
GET /api/books
```

**Get book by ID**
```
GET /api/books/{id}
```

**Create book**
```
POST /api/books
Body: {
  "title": "The Hobbit",
  "author": "J.R.R. Tolkien",
  "publishedDate": "1937-09-21",
  "genre": "Fantasy",
  "isbn": "978-0547928227"
}
```

**Update book**
```
PUT /api/books/{id}
```

**Delete book**
```
DELETE /api/books/{id}
```




