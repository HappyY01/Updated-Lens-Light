# 📷 Lens & Light Photography Contest 2025

A modern, responsive static website for a university photography contest. Built with HTML5, CSS3, and vanilla JavaScript to showcase front-end development skills including semantic markup, modern layouts, form validation, and client-side data management.

![Project Banner](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## 🔗 Live Demo

**[View Live Website →](https://happyy01.github.io/Updated-Lens-Light/)**

---

## ✨ Key Features

### 🎨 Responsive Design
- Fully adaptive layout using **CSS Grid** and **Flexbox**
- Optimized viewing experience across mobile, tablet, and desktop devices
- Mobile-first approach with breakpoint-based media queries

### 🧭 Dynamic Navigation
- Consistent header and footer across all pages
- Active page state highlighting for better UX
- Smooth transitions and hover effects

### ✅ Real-Time Form Validation
- **Name validation**: Letters and spaces only (using Regex)
- **Email validation**: Standard email format verification
- **Phone validation**: Exactly 10 digits required
- Instant feedback with error messages
- Custom toast notifications instead of browser alerts

### 📧 Email Integration
- Contact and Registration forms use `mailto:` protocol
- Pre-filled email drafts with user-submitted data
- Simulates backend submission without server requirements

### 🛠️ Admin Dashboard (CRUD Operations)
A fully functional "Manage Entries" page with LocalStorage persistence:
- **Create**: Add new participant entries
- **Read**: View complete list of participants in a styled table
- **Update**: Edit existing entries with inline form population
- **Delete**: Remove entries with confirmation
- Data persists across browser sessions

### 💫 Enhanced UX
- Smooth fade-in animations on page load
- Interactive hover effects on cards and buttons
- Custom toast notification system
- Professional color scheme with CSS variables
- Accessible semantic HTML structure

---

## 🖼️ Screenshots

### Home Page
*Clean, welcoming hero section with call-to-action*

### Registration Form
*Real-time validation with user-friendly error messages*

### Admin Dashboard
*Complete CRUD interface with LocalStorage integration*

### About Us
*Meet the organizers section with team profiles*

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic structure (`<header>`, `<main>`, `<section>`, `<footer>`) |
| **CSS3** | Custom properties (variables), Grid, Flexbox, animations |
| **JavaScript ES6** | DOM manipulation, event handling, form validation, LocalStorage API |
| **Font Awesome** | Icon library for UI elements |
| **Google Fonts** | Playfair Display (headings) + Open Sans (body text) |

---

## 📂 Project Structure

```
Updated-Lens-Light/
│
├── images/                     # Image assets
│   ├── avanish.jpg            # Organizer profile
│   ├── drashti.jpg            # Organizer profile
│   ├── shivansh.jpg           # Organizer profile
│   ├── hero-background.jpg    # Homepage hero section
│   └── about-mission-image.png # About page visual
│
├── index.html                 # Homepage
├── about.html                 # About Us page
├── contact.html               # Contact form page
├── registration.html          # Registration form page
├── admin.html                 # Admin CRUD dashboard
│
├── style.css                  # Global styles and animations
├── script.js                  # Form validation and UI logic
├── crud.js                    # Admin panel LocalStorage operations
│
└── README.md                  # Project documentation
```

---

## ⚙️ Installation & Setup

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Optional: [Visual Studio Code](https://code.visualstudio.com/) with Live Server extension

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/HappyY01/Updated-Lens-Light.git
   ```

2. **Navigate to the project folder**
   ```bash
   cd Updated-Lens-Light
   ```

3. **Add required images**
   - Create an `images/` folder in the root directory
   - Add the following image files:
     - `avanish.jpg`
     - `drashti.jpg`
     - `shivansh.jpg`
     - `hero-background.jpg`
     - `about-mission-image.png`

4. **Launch the website**
   - **Option A**: Double-click `index.html` to open in your default browser
   - **Option B**: Use VS Code Live Server (right-click → "Open with Live Server")
   - **Option C**: Use Python's built-in server:
     ```bash
     python -m http.server 8000
     ```
     Then visit `http://localhost:8000`

---

## 📖 User Guide

### Registration Process

1. Navigate to **Register Now** from the main menu
2. Fill in the registration form:
   - **Name**: Letters and spaces only
   - **Email**: Valid email format
   - **Phone**: Exactly 10 digits
   - **Entry Title**: Your photo submission title
3. Click **Submit**
4. If validation passes, your default email client opens with a pre-filled message
5. Send the email to complete registration

### Admin Dashboard

Access the **Manage Entries** page to perform CRUD operations:

#### Add Entry
1. Fill out the form on the left side
2. Click **Add Entry** button
3. New entry appears in the table

#### Edit Entry
1. Click the **orange pencil icon** (✏️) next to any entry
2. Form auto-populates with existing data
3. Make changes and click **Update Entry**

#### Delete Entry
1. Click the **red trash icon** (🗑️) next to any entry
2. Confirm deletion
3. Entry is removed from the table

**Note**: All data is stored in browser LocalStorage and persists across sessions.

---

## 🎯 Code Highlights

### Form Validation (Regex Patterns)

```javascript
// Name: Letters and spaces only
const namePattern = /^[A-Za-z\s]+$/;

// Email: Standard format
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone: Exactly 10 digits
const phonePattern = /^\d{10}$/;
```

### LocalStorage CRUD Operations

```javascript
// Save data
localStorage.setItem('entries', JSON.stringify(entriesArray));

// Retrieve data
const entries = JSON.parse(localStorage.getItem('entries')) || [];

// Delete specific entry
entries.splice(index, 1);
```

### CSS Custom Properties

```css
:root {
  --primary-color: #2c3e50;
  --accent-color: #e74c3c;
  --text-color: #333;
  --background-light: #f8f9fa;
}
```

---

## 🚀 Future Enhancements

- [ ] Backend integration with Node.js/Express
- [ ] Database storage (MongoDB/PostgreSQL)
- [ ] User authentication system
- [ ] Image upload functionality
- [ ] Gallery page with submitted photos
- [ ] Voting/rating system
- [ ] Email notifications
- [ ] Search and filter functionality
- [ ] Export entries to CSV/PDF

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` file for more information.

---

## 👥 Team

### Project Organizers

- **Avanish** - Lead Organizer
- **Drashti** - Co-Organizer
- **Shivansh** - Technical Lead

### Developer

**HappyY01**  
📧 [GitHub Profile](https://github.com/HappyY01)  
🔗 [Project Repository](https://github.com/HappyY01/Updated-Lens-Light)

---

## 📞 Contact & Support

- **Issues**: [Report a bug](https://github.com/HappyY01/Updated-Lens-Light/issues)
- **Discussions**: [Start a discussion](https://github.com/HappyY01/Updated-Lens-Light/discussions)
- **Email**: Available through contact form on the website

---

## 🙏 Acknowledgments

- [Font Awesome](https://fontawesome.com/) - Icon library
- [Google Fonts](https://fonts.google.com/) - Typography
- [MDN Web Docs](https://developer.mozilla.org/) - Documentation reference
- [GitHub Pages](https://pages.github.com/) - Free hosting

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by HappyY01

</div>
