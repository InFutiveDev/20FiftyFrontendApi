# 20Fifty Frontend API

Node.js API for handling contact form submissions with MongoDB.

## Features

- Contact Us form submission
- MongoDB integration
- RESTful API endpoints
- Data validation

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## API Endpoints

### Contact Form

- **POST** `/api/contact` - Create a new contact form submission
- **GET** `/api/contact` - Get all contact form submissions
- **GET** `/api/contact/:id` - Get a single contact by ID
- **DELETE** `/api/contact/:id` - Delete a contact by ID

### Contact Form Fields

- `name` (String, required)
- `company` (String, required)
- `email` (String, required, validated)
- `phone` (String, required)
- `areaOfInterest` (Enum, required)
  - Options: 'Web Development', 'Mobile Development', 'Digital Marketing', 'UI/UX Design', 'Consulting', 'Other'
- `preferredTime` (Enum, required)
  - Options: 'Morning (9 AM - 12 PM)', 'Afternoon (12 PM - 5 PM)', 'Evening (5 PM - 8 PM)', 'Flexible'
- `message` (String, required)

## Example Request

```json
POST /api/contact
{
  "name": "John Doe",
  "company": "ABC Corp",
  "email": "john@example.com",
  "phone": "+1234567890",
  "areaOfInterest": "Web Development",
  "preferredTime": "Morning (9 AM - 12 PM)",
  "message": "I would like to discuss a project."
}
```

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose