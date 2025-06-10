# 🚚 Project Title: Delivery Management System (DMS)

## 👥 Team Members

* **Rand** – Client Role Implementation
* **Kawthar** – Customer Role Implementation
* **Linda** – Admin Role Implementation
* **Laith** – Driver Role Implementation

## 📚 Project Description

The **Delivery Management System (DMS)** is a role-based web application designed to streamline and manage the process of deliveries between **clients**, **drivers**, and **customers**, overseen by an **admin**. Each role has its unique workflows and permissions.

The system supports **English and Arabic languages**, and is fully responsive for mobile, tablet, and desktop devices.


## 🌐 Technologies Used
* **Frontend Framework**: Angular 19 (Standalone Components)
* **Styling**: SCSS / Bootstrap 5
* **Backend Simulation**: JSON-server

## 🚦 Setup Instructions
Make sure you have Node.js and Angular CLI installed.
```bash
# Clone the repository
git clone https://github.com/RandNassar02/delivery-management-system.git
cd delivery-management-system

# Install dependencies
npm install

# Start the application  
npm start
```

## 📁 Project Structure

```bash
src/
├── app/
│   ├── components/
│   │   ├── shared/                # Reusable components
│   │   │   ├── footer/            # Global footer
│   │   │   ├── header/            # Navigation header
│   │   │   └── home/              # Landing page
│   │   │   └── not-found/         # 404 page
│   │   │   └── sign-in/           # Auth components
│   │   │   └── store/             
│   │   ├── pages/                 # Role-specific views
│   │   │   ├── admin/             # Admin workflows
│   │   │   ├── client/            # Client workflows
│   │   │   └── customer/          # Customer workflows
│   │   │   └──driver/             #Driver workflows
│   ├── models/                    # TypeScript interfaces
│   ├── services/                  # Core business logic
│   └── app.routes.ts              # Route configuration
├── assets/
│   ├── i18n/
│   │   ├── en.json                # English translations
│   │   └── ar.json                # Arabic translations 
│   └── images/                    #Static logos
backend/
├── db.json                    # Mock database
```
## 👤 User Roles & Workflows

### 🔐 Authentication & Authorization

* Role-based sign-up and login
* Client & Customer & Driver : can sign up and log in
* Admin : secure login only

### 🧑‍💼 Client

* Sign up and log in
* Manage client profile
* View available drivers
* Send delivery requests
* Track request statuses
* View customer payment history

### 🛡 Admin

* Secure login to dashboard
* Approve/reject client accounts
* Approve/reject drivers accounts
* View all client activities
* Monitor customer payments

### 👤 Customer

* Sign up and log in
* Update profile and location
* View delivery history and upcoming deliveries

### 🚚 Driver

* Sign up and log in
 

## 🔐 Authentication Flow
graph TD
    A[Login] --> B{User Type}
    B -->|Admin| C[Admin Dashboard]
    B -->|Client| D[Client Portal]
    B -->|Driver| E[Driver Interface]
    B -->|Customer| F[Customer View]


## 📸 Screenshots
Home page ![image](https://github.com/user-attachments/assets/217d4db5-f53d-40d1-8560-5f213d19bbbd)
Login Page ![image](https://github.com/user-attachments/assets/5df0a8bb-8088-4b29-b1e5-c6b6d58c8b59)
RTL Home Page ![image](https://github.com/user-attachments/assets/8b68433c-09ca-4a6e-aa14-6a347e9bf990)



## 🌍 Internationalization (i18n)
* **ngx-translate** used for dynamic language switching
* Supports **English** and **Arabic**
* RTL layout supported for Arabic

## 📱 Responsiveness

* Built with Bootstrap 5 and SCSS
* Optimized for **mobile**, **tablet**, and **desktop** views
* Fully responsive UI components

## ✅ Features Checklist
- [ ] Role-based login
- [ ] Form validation with feedback
- [ ] Toast messages for all actions
- [ ] EN/AR language switching
- [ ] Responsive design
- [ ] Realistic data with JSON-server

## 🧪 Testing Guide

| Test Scenario                   | Expected Result                         |
| ------------------------------- | --------------------------------------- |
| Login with each role            | Redirect to correct dashboard           |
| Sign up as client/customer      | Success and login flow begins           |
| Form validation (empty/invalid) | Show appropriate error messages         |
| Language switch                 | UI language changes instantly           |
| Responsive layout on devices    | All components scale correctly          |

