# GoviSaviya Platform 🌾

[![Next.js](https://img.shields.io/badge/Frontend-Next.js-black?style=flat&logo=next.js)](https://nextjs.org/)
[![Spring Boot](https://img.shields.io/badge/Backend-Spring%20Boot-green?style=flat&logo=springboot)](https://spring.io/projects/spring-boot)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Empowering the future of farming with intelligence.**

---

## ○ Problem Statement
Despite being the backbone of our economy, traditional agriculture faces critical inefficiencies. Farmers today grapple with:
*   **Late Disease Diagnosis**: Farmers lack expert-level knowledge to identify crop diseases early, leading to widespread harvest loss.
*   **Unpredictable Local Micro-Climates**: Hyper-local weather shifts impact planting cycles more than ever, and standard forecasts often fall short.
*   **Middleman Exploitation**: Traditional supply chains are opaque, causing farmers to lose up to 60-70% of potential profit to intermediaries.
*   **No proper fertilizer management**: There is no proper fertilizer management system 

## ○ Proposed Solution
**GoviSaviya** is a revolutionary AI-infused agricultural ecosystem that transforms farming into a high-precision, profitable business. Our solution features:
*   **Intelligent Disease Diagnosis**: A Plant-AI engine that identifies diseases via image uploads and provides immediate remediation steps.
*   **Climate-Smart Insights**: weather analytics tailored specifically to the farmer's plot coordinates.
*   **Direct Marketplace**: An end-to-end marketplace connecting Farmers directly to Buyers with a dedicated Delivery module.
*   **Role-Specific Dashboards**: Tailored interfaces for Farmers (monitoring), Buyers (procurement), and Delivery Persons (fulfillment).

---

## ○ Team Details
*   **Team Name**: **MegaMinds**
*   **University**: *[University of Moratuwa]*
*   **Selected Domain**: **Smart Agriculture (AgTech)**
*   **Members**:
    *   [Dinithi Dewmini] 
    *   [Nipun Yasas] 
    *   

---

## ○ Technology Stack & Architecture

### **Architecture Overview**
The platform follows a modern **Full-Stack REST Architecture** designed for scalability and real-time processing:
- **Presentation Layer**: A Next.js 16/17 application utilizing the App Router design pattern for SEO and speed.
- **Service Layer**: A Spring Boot 4 repository-pattern backend that handles complex business workflows and security.
- **AI Integration**: Orchestrated calls to Google Gemini (for insights) and specialized PlantNet APIs (for diagnostics).
- **Data Layer**: PostgreSQL for structured data and AWS S3 for secure cloud-based media storage.

### **Tech Stack**
- **Frontend**: Next.js, TypeScript, Tailwind CSS, Lucide Icons
- **Backend**: Java 21, Spring Boot 4.0.5, Spring Data JPA, Hibernate, Spring Security (JWT)
- **Database**: PostgreSQL (PostGIS ready)
- **Cloud/Tools**: AWS S3, Maven, npm

---

## ○ Instructions on How to Run the Project

### **1. Prerequisites**
Ensure you have the following installed:
- [Java 21 JDK](https://www.oracle.com/java/technologies/downloads/#java21)
- [Node.js 18+](https://nodejs.org/en)
- [Maven 3.x](https://maven.apache.org/download.cgi)
- [PostgreSQL 15+](https://www.postgresql.org/download/)

### **2. Setup Database**
1. Create a database named `govisaviya` in PostgreSQL.
2. Update the credentials in `GoviSaviya-backend/src/main/resources/application.yaml` or `application-development.yaml`.

### **3. Start the Backend**
```bash
cd GoviSaviya-backend
mvn spring-boot:run
```
*Note: The backend runs on `http://localhost:8080/govisaviya`.*

### **4. Start the Frontend**
```bash
cd GoviSaviya-frontend
npm install
npm run dev
```
*Note: Open [http://localhost:3000](http://localhost:3000) to view the application.*

---

© 2026 GoviSaviya Platform - *Cultivating the future through intelligence.*
