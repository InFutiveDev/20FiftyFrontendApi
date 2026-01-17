# CURL Commands for Contact API

Base URL: `http://localhost:3004`

## 1. Create a New Contact (POST)

```bash
curl -X POST http://localhost:3004/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "namn": "John Doe",
    "företag": "ABC Corp",
    "epost": "john.doe@example.com",
    "telefon": "+1234567890",
    "intresseområde": "Energikonsultation",
    "föredragenTidFörMöte": "Förmiddag (09:00-12:00)",
    "meddelande": "Jag vill diskutera ett energiprojekt för mitt företag."
  }'
```

**Intresseområde (Area of Interest) Options:**
- `Energikonsultation`
- `Solprojekt`
- `Mjukvara & IT-lösningar`
- `Allmän rådgivning`

**Föredragen Tid För Möte (Preferred Time) Options:**
- `Förmiddag (09:00-12:00)`
- `Eftermiddag (13:00-17:00)`
- `Flexibel`

## 2. Get All Contacts (GET)

### Basic - Get All Contacts (Default: 10 per page)
```bash
curl -X GET http://localhost:3004/api/contact
```

### With Pagination
```bash
# Get page 1 with 10 items (default)
curl -X GET "http://localhost:3004/api/contact?page=1&limit=10"

# Get page 2 with 20 items per page
curl -X GET "http://localhost:3004/api/contact?page=2&limit=20"

# Get page 1 with 5 items per page
curl -X GET "http://localhost:3004/api/contact?page=1&limit=5"
```

### Filter by Name (namn)
```bash
# Filter by name (case-insensitive partial match)
curl -X GET "http://localhost:3004/api/contact?namn=John"

# Filter by name with pagination
curl -X GET "http://localhost:3004/api/contact?namn=John&page=1&limit=10"
```

### Filter by Phone (telefon)
```bash
# Filter by phone number (partial match)
curl -X GET "http://localhost:3004/api/contact?telefon=123"

# Filter by phone with pagination
curl -X GET "http://localhost:3004/api/contact?telefon=123&page=1&limit=10"
```

### Filter by Both Name and Phone
```bash
# Filter by both name and phone
curl -X GET "http://localhost:3004/api/contact?namn=John&telefon=123"

# Filter by both with pagination
curl -X GET "http://localhost:3004/api/contact?namn=John&telefon=123&page=1&limit=10"
```

### Response Format with Pagination
The response will include pagination metadata:
```json
{
  "success": true,
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "itemsPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "count": 10,
  "data": [...]
}
```

## 3. Get Contact by ID (GET)

```bash
curl -X GET http://localhost:3004/api/contact/{CONTACT_ID}
```

**Example:**
```bash
curl -X GET http://localhost:3004/api/contact/507f1f77bcf86cd799439011
```

## 4. Delete Contact by ID (DELETE)

```bash
curl -X DELETE http://localhost:3004/api/contact/{CONTACT_ID}
```

**Example:**
```bash
curl -X DELETE http://localhost:3004/api/contact/507f1f77bcf86cd799439011
```

## Additional Examples

### Create Contact - Additional Example
```bash
curl -X POST http://localhost:3004/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "namn": "Jane Smith",
    "företag": "XYZ Ltd",
    "epost": "jane@xyz.com",
    "telefon": "9876543210",
    "intresseområde": "Solprojekt",
    "föredragenTidFörMöte": "Eftermiddag (13:00-17:00)",
    "meddelande": "Intresserad av solpaneler för mitt företag."
  }'
```

### Create Contact - All Field Options Example
```bash
curl -X POST http://localhost:3004/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "namn": "Test User",
    "företag": "Test Company",
    "epost": "test@example.com",
    "telefon": "1234567890",
    "intresseområde": "Mjukvara & IT-lösningar",
    "föredragenTidFörMöte": "Flexibel",
    "meddelande": "Test meddelande"
  }'
```

### Pretty Print JSON Response
Add `| jq` at the end if you have jq installed:

```bash
curl -X GET http://localhost:3004/api/contact | jq
```

### Save Response to File
```bash
curl -X GET http://localhost:3004/api/contact -o response.json
```

### Verbose Output (Debug)
```bash
curl -v -X POST http://localhost:3004/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "namn": "Test User",
    "företag": "Test Company",
    "epost": "test@example.com",
    "telefon": "1234567890",
    "intresseområde": "Allmän rådgivning",
    "föredragenTidFörMöte": "Flexibel",
    "meddelande": "Test meddelande"
  }'
```

## Field Names Reference

- `namn` - Name (required)
- `företag` - Company (required)
- `epost` - Email (required, validated)
- `telefon` - Phone (required)
- `intresseområde` - Area of Interest (required, enum)
- `föredragenTidFörMöte` - Preferred Time (required, enum)
- `meddelande` - Message (required)
