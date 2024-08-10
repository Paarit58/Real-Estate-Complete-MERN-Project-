# Real Estate Project

A full-stack MERN application designed to manage real estate listings. The platform allows users to add, view, and manage properties for rent or sale, with secure user authentication and image handling capabilities.

## Features

- **Property Management**: Add, view, and manage properties available for rent or sale.
- **User Authentication**: Secure sign-in using Google OAuth.
- **Image Upload**: Upload property images using Firebase Storage.
- **Landlord Contact**: Contact landlords directly for inquiries.

## Technologies Used

- **Frontend**:

  - React for building user interfaces.
  - Redux Toolkit for state management.
  - Ant Design for UI components.
  - Tailwind CSS for styling.
  - Vite for bundling and development.

- **Backend**:

  - Node.js and Express.js for server-side logic.
  - MongoDB with Mongoose for database management.
  - JWT for authentication.
  - Bcrypt for password hashing.
  - Nodemailer for email notifications.

- **Storage and Authentication**:
  - Firebase Storage for image uploads.
  - Google OAuth for secure user authentication.

## Project Structure

- **API**: Contains server-side code including routes, controllers, and configuration files.
- **Client**: Contains the frontend code with React components, state management, and styling.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/real-estate-project.git

   ```

2. Navigate to the project directory:

   ```bash
   cd real-estate-project

   ```

3. Install dependencies for both client and server:

   ```bash
   npm install
   cd client
   npm install

   ```

4. Set up environment variables:

-**API**: Create a .env file in the api folder with the following content:

```php
NODE_ENV=development
PORT=3000
DATABASE=<your-database-uri>
JWT_SECRET=<your-jwt-secret>
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>
```

-**Client**: Create a .env file in the client folder with the following content:

```php
VITE_FIREBASE_API_KEY=<your-firebase-api-key>
```



```

5. Start the server:

   -**For API**:
   ```bash
   npm run dev
   ```

   -**For Client**:
   ```bash
   npm run dev
   ```

## Usage

- **API Base URL**: http://localhost:3000/api/v1
- **Client Base URL**: http://localhost:3000/api/v1

