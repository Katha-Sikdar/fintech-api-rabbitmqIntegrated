
# 🏦 FinTech API – Node.js + RabbitMQ Microservice

This is a lightweight FinTech API built with **Node.js**, **Express**, and **RabbitMQ** to simulate basic financial operations like creating users, adding money, withdrawing, transferring, and making payments. It supports message queuing to handle operations asynchronously using RabbitMQ.

---

## 🚀 Features

* Create user with an initial balance
* Get user balance
* Queue operations:

  * Add money
  * Withdraw money
  * Transfer between users
  * Make a payment

---

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **RabbitMQ**
* **JavaScript (CommonJS)**

---

## 📁 Project Structure

```
.
├── mq.js                # RabbitMQ connection and queue sender
├── server.js            # Main API server
├── workers/
│   └── users.js         # In-memory user store and operations
└── README.md
```

---

## 📦 Installation

1. **Clone the repo**

   ```bash
   git clone [https://github.com/Katha-Sikdar/fintech-api-rabbitmqIntegrated.git]
   cd fintech-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start RabbitMQ**

   * Make sure RabbitMQ is installed and running on `amqp://localhost`.

4. **Run the server**

   ```bash
   node server.js
   ```

---

## 🔗 API Endpoints

### ➕ Create User

`POST /create-user`

```json
{
  "userId": "user123",
  "initialBalance": 1000
}
```

### 💰 Get Balance

`GET /balance/:userId`
**Example:** `/balance/user123`

---

### 💸 Queue Operations

Each of these endpoints queues the operation using RabbitMQ.

#### 1. Add Money

`POST /add`

```json
{
  "userId": "user123",
  "amount": 500
}
```

#### 2. Withdraw Money

`POST /withdraw`

```json
{
  "userId": "user123",
  "amount": 300
}
```

#### 3. Transfer Money

`POST /transfer`

```json
{
  "fromUserId": "user123",
  "toUserId": "user456",
  "amount": 200
}
```

#### 4. Pay

`POST /pay`

```json
{
  "userId": "user123",
  "merchantId": "shop001",
  "amount": 150
}
```

---

## 🧪 Testing (Optional)

You can use **Postman** or **cURL** to test the endpoints.
Make sure RabbitMQ is running before queuing any requests.

---

