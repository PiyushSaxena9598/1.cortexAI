# 🚀 CortexAI – AI-Powered Development Assistant

CortexAI is an AI-powered development platform designed to assist developers with programming, coding-related queries, and AI-powered conversations through an integrated interface.

Built using the MERN stack and Microservices Architecture, CortexAI provides separate services for authentication, chat, AI agents, and billing, making the application modular, scalable, and easier to maintain.

## 🌐 Live Demo

**Live Application:** https://cortexai-frontend-jjgh.onrender.com

**GitHub Repository:** https://github.com/PiyushSaxena9598/1.cortexAI

---

## ✨ Features

- **AI Chat Assistant:** Interact with an AI assistant and get responses to your queries.
- **Coding Assistant:** Get programming assistance, code explanations, and solutions to coding-related problems.
- **AI Agent Integration:** Dedicated AI agent service for intelligent task processing.
- **Google Authentication:** Secure user authentication using Firebase Google Login.
- **Billing Management:** Dedicated billing microservice for handling payment-related functionality.
- **Microservices Architecture:** Independent services for better modularity and maintainability.
- **REST API Integration:** Communication between frontend, API Gateway, and backend microservices.
- **Database Integration:** MongoDB for persistent data storage.
- **Redis Integration:** Redis connectivity for supporting backend operations.

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- Axios
- CSS / Tailwind CSS (as configured in the frontend)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- REST APIs

### Authentication & Integrations
- Firebase Authentication
- Google OAuth Login
- Razorpay (Billing integration)

### Architecture & Deployment
- Microservices Architecture
- API Gateway
- Redis
- Docker
- Render

---

## 🏗️ System Architecture

CortexAI follows a microservices-based architecture in which different functionalities are handled by independent backend services.

```text
                  ┌──────────────────┐
                  │   React Frontend │
                  └────────┬─────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │    API Gateway   │
                  └────────┬─────────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
   ┌────────────┐   ┌────────────┐   ┌────────────┐
   │ Auth       │   │ Chat       │   │ Agent      │
   │ Service    │   │ Service    │   │ Service    │
   └────────────┘   └────────────┘   └────────────┘
                           │
                           ▼
                    ┌────────────┐
                    │  Billing   │
                    │  Service   │
                    └────────────┘
```

### Backend Services

| Service | Responsibility |
|---|---|
| API Gateway | Handles incoming API requests and routes them to respective services |
| Auth Service | Manages authentication and user-related operations |
| Chat Service | Handles chat and conversation-related operations |
| Agent Service | Processes AI agent and coding assistant requests |
| Billing Service | Handles billing and payment-related operations |

---

## 📂 Project Structure

```text
CortexAI/
│
├── frontend/
│
├── services/
│   ├── gateway/
│   ├── auth/
│   ├── chat/
│   ├── agent/
│   └── billing/
│
├── shared/
│
├── Dockerfile
├── package.json
└── README.md
```

*Note: Adjust folder names if your actual repository structure differs.*

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/PiyushSaxena9598/1.cortexAI.git
```

```bash
cd 1.cortexAI
```

### 2. Install Dependencies

Install the root dependencies:

```bash
npm install
```

Install dependencies for individual services:

```bash
cd services/auth
npm install

cd ../chat
npm install

cd ../agent
npm install

cd ../billing
npm install
```

### 3. Configure Environment Variables

Create `.env` files for the respective services and configure the required environment variables.

Example Gateway configuration:

```env
PORT=8000

AUTH_SERVICE=http://localhost:8001
CHAT_SERVICE=http://localhost:8002
AGENT_SERVICE=http://localhost:8003
BILLING_SERVICE=http://localhost:8004

FRONTEND_URL=http://localhost:5173
REDIS_URL=redis://localhost:6379
```

Configure the required MongoDB connection strings, Firebase credentials, AI API keys, and billing credentials in their respective services.

**Important:** Never commit `.env` files, API keys, database credentials, or other sensitive information to GitHub.

### 4. Run the Services

Start each microservice independently using its development script:

```bash
npm run dev
```

Run the frontend separately from its directory.

---

## 🚀 Deployment

CortexAI is deployed using Render.

The frontend and backend microservices are deployed as separate services.

Each service uses its own deployment configuration and environment variables to communicate with other services.

---

## 🎯 Learning Outcomes

Building CortexAI helped me gain practical experience in:

- Designing and implementing Microservices Architecture.
- Developing RESTful APIs using Node.js and Express.js.
- Implementing Firebase Authentication.
- Managing service-to-service communication.
- Integrating AI-powered functionality.
- Working with MongoDB and Redis.
- Docker-based deployment.
- Debugging and troubleshooting production deployment issues.

---

## 🔮 Future Improvements

- Enhance AI agent capabilities.
- Improve coding assistance and response quality.
- Add more AI-powered developer tools.
- Improve application performance and scalability.
- Enhance user experience and conversation management.

---

## 👨‍💻 Developer

**Piyush Saxena**

- GitHub: https://github.com/PiyushSaxena9598
- LinkedIn: https://www.linkedin.com/in/piyushsaxena123/

---

⭐ If you find CortexAI interesting, consider giving this repository a star!

**Built with ❤️ and a passion for AI & Software Development.**
