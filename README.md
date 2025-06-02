# ChargeHub — Full-Stack Charger Management App

## Project Overview

ChargeHub is a full-stack application to manage electric vehicle charging stations. It includes:

- **Backend:** Node.js + Express REST API with JWT Authentication
- **Frontend:** Vue.js app to login, list, add, update, delete chargers, and view them on a map
- **Database:** MongoDB (or your choice)
- **Deployment:** Both backend and frontend deployed on Render

---

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB database (local or cloud e.g. MongoDB Atlas)
- Render account (for deployment)

---

### Backend Setup

1. Navigate to the backend folder:

cd backend

npm install

Method	    Endpoint	    Description	Request     Body	    Response
GET 	/api/chargers	    Get all chargers	    None	    List of chargers
POST	/api/chargers	    Create a new charger	{ name, latitude, longitude, status, powerOutput, connectorType }	  Created charger

PUT 	/api/chargers/:id	    Update charger by ID	Partial or full charger data	    Updated charger
DELETE	   /api/chargers/:id	Delete charger by ID	None	    Success message or error

AC4O46UJcjmUuds0



