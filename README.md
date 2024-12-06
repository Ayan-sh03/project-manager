## **Setup Instructions**

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Ayan-sh03/project-manager
   cd project-manager
   ```

2. **Install Dependencies**

   Ensure you have **Node.js** and **npm** installed. Then run:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=5000
   DATABASE_URL=postgres://username:password@localhost:5432/projecthub
   JWT_SECRET=your_secure_jwt_secret
   JWT_EXPIRES_IN=1h
   CORS_ORIGIN=http://your-frontend-domain.com
   ```

## **Security Best Practices Implemented**

1. **Password Hashing:**

   - Utilizes `bcrypt` to hash user passwords before storing them in the database, preventing plain-text password storage.

2. **JWT for Authentication:**

   - Implements JWT for stateless authentication, ensuring secure session management.
   - Tokens include user ID and role, facilitating RBAC.

3. **Environment Variables:**

   - Sensitive information like database credentials and JWT secrets are stored in environment variables, not in the codebase.

4. **Input Validation:**

   - While not fully implemented in the sample, it is recommended to use validation libraries like `Joi` to validate incoming request data.

5. **Error Handling:**

   - Centralized error handling ensures that unexpected errors do not expose sensitive information.

6. **Role-Based Access Control:**

   - Middleware ensures that only users with appropriate roles can access certain endpoints, minimizing the risk of unauthorized access.

7. **HTTPS:**
   - In production, ensure that the server runs over HTTPS to encrypt data in transit.
