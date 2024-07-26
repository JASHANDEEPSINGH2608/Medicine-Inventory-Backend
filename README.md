# Medicine-Inventory-Backend
# Medicine API

## Endpoints

### Create a Medicine
- **URL**: `/api/medicines`
- **Method**: POST
- **Body**: `{ name, price, discountPrice, quantity, manufacturer, image }`

### Get Medicines
- **URL**: `/api/medicines`
- **Method**: GET
- **Query Parameters**: `name, price, quantity, manufacturer, sort`

### Update a Medicine
- **URL**: `/api/medicines/:id`
- **Method**: PUT
- **Body**: `{ name, price, discountPrice, quantity, manufacturer, image }`

### Delete a Medicine
- **URL**: `/api/medicines/:id`
- **Method**: DELETE

## Running the Project
```bash
npm install
node app.js
