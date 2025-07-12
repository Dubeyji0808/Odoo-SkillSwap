# Team Member

Ayush dubey 
Abhinav Dwivedi
Aayush dubey
Pragnesh dubey

# Team Number

1251

---
# Odoo-SkillSwap

Odoo-SkillSwap is a platform that connects users based on skills they can offer and skills they want to learn. The core idea is to facilitate skill exchange, allowing users to request and collaborate with others for mutual learning and growth.

---

## Table of Contents

- [Overview](#overview)
- [API Endpoints](#api-endpoints)
- [Database Design (Class Diagram)](#database-design-class-diagram)
- [Core Functions](#core-functions)
- [How It Works](#how-it-works)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Odoo-SkillSwap allows users to:
- Register and create a profile listing skills they can offer and skills they want to learn.
- Browse other users' profiles.
- Request skill exchanges with other users.
- Manage requests, availability, and communication.

---

## API Endpoints

### 1. Landing Page

- **GET /**  
  Returns the landing page with a summary of the platform, how it works, and options to register or log in.

#### Example Response

```json
{
  "welcome": "Welcome to Odoo-SkillSwap!",
  "description": "Exchange skills with a global community.",
  "actions": ["Register", "Login", "Browse Skills"]
}
```

---

## Database Design (Class Diagram)

The following diagram illustrates the core data model for Odoo-SkillSwap:

```plaintext
Table users {
  id integer [primary key]
  username varchar
  email varchar
  password varchar
  confirmPassword varchar
  created_at timestamp
}

Table profile {
  id integer [ref: - users.id]
  username varchar
  email varchar 
  skillsoffered varchar
  skillswanted varchar 
  availability datetime  
  yearofexperience datetime
  contacts varchar
  profile_security text 
}

Table skills {
  id integer [primary key]
  user_id integer [ref: <> profile.id]
  skills varchar [ref: <> profile.skillsoffered]
}
```

**Diagram Explanation:**
- **users**: Stores user authentication details.
- **profile**: Extends the user with skill-related and personal info.
- **skills**: Maps specific skills to user profiles, supporting many-to-many relations for better flexibility in the future.

---

## Core Functions

These are the most important functions in the app (examples, actual implementation may vary):

### 1. User Registration & Authentication

- `registerUser(username, email, password, confirmPassword)`
- `loginUser(email, password)`
- `logoutUser()`

### 2. Profile Management

- `createOrUpdateProfile(userId, skillsOffered, skillsWanted, availability, yearOfExperience, contacts, profileSecurity)`
- `getProfile(userId)`
- `searchProfilesBySkill(skill)`

### 3. Skill Management

- `addSkillToProfile(profileId, skill)`
- `removeSkillFromProfile(profileId, skill)`
- `listAllSkills()`

### 4. Connection & Requests

- `requestSkillExchange(requestorId, targetProfileId, skillOffered, skillWanted)`
- `respondToRequest(requestId, acceptOrDecline)`
- `listPendingRequests(userId)`
- `listConnections(userId)`

### 5. Other Functionalities

- `updateAvailability(profileId, newAvailability)`
- `setProfileSecurity(profileId, securityOptions)`

---

## How It Works

1. **Sign Up / Log In:** Users register and create a profile listing both skills they can offer and skills they want.
2. **Explore:** Browse other users with matching skill interests.
3. **Request Exchange:** Initiate a skill swap request specifying which skill you offer and what you want to learn.
4. **Connect & Collaborate:** Accept or decline requests, chat, and schedule sessions.
5. **Grow:** Update your profile as you gain new skills and experiences.

---

## Getting Started

1. Clone the repository:
    ```bash
    git clone https://github.com/Dubeyji0808/Odoo-SkillSwap.git
    ```
<!-- 2. Install dependencies:
    ```bash
    cd backend
    cd SkillSwap 
    ./mvnw spring-boot: run
    ``` -->
2. Run the server:
    ```bash
    cd backend
    cd SkillSwap
    ./mvnw spring-boot: run
    ```
3. Open your browser at [http://localhost:8081/](http://localhost:8081/) (or as specified in your server config).

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## License

[MIT License](LICENSE)