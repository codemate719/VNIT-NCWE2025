# NCWE (2025) Website

This is a **fully responsive static website** built using **HTML, Tailwind CSS, and JavaScript**. The project is optimized for fast loading by purging unused CSS.

## 📂 Project Structure

```📂 NCWE(2025)-Sidebar(Reload)
 📂 assets        # Contains images and css file
 📂 includes      # Sidebar & Footer
 📂 pages         # Contains 14 different pages
 📄 index.html    # Main entry page
 📄 script.js     # JavaScript functionality
 📄 output.css    # Compiled and optimized Tailwind CSS
```

### 1. Running the Project
Since this is a static website, you can simply open `index.html` in a browser, or use a local server for better performance:

- Open the project folder and right-click `index.html` → **Open with Browser**
- OR use VS Code’s **Live Server extension** to preview the site

### 2. Tailwind CSS Optimization
This project initially used **Tailwind CDN**, but for performance, unused styles were purged using the Tailwind CLI.

If you need to regenerate `output.css`, run:
```sh
npx tailwindcss -i ./assets/style.css -o ./assets/output.css --minify
```
##  Technical Details
- **Technologies Used**: HTML, Tailwind CSS, JavaScript
- **No Additional Setup Required**: The project runs as a static website.
- **Fully Responsive**: Works on desktop, tablet, and mobile devices.