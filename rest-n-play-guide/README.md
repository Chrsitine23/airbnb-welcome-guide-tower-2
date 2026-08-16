# Rest N Play — Digital Welcome Guide

A clean, minimalist, mobile-first digital check-in guide for your Airbnb guests.

## How to customize

Open `index.html` and search for the comments that say `<!-- EDIT ... -->`.  
These are the main places you should update:

- Address & location
- Lockbox / access code
- WiFi network name & password
- House rules (pets, quiet hours, etc.)
- Phone number & email
- Restaurant / bar recommendations
- Emergency numbers & nearest hospital (if different from 112)
- Check-in / check-out times

You can also change the cover photo by replacing the Unsplash URL in `styles.css` (look for `.cover-image`).

## Deploy on Render (Static Site)

1. Create a free account at [render.com](https://render.com)
2. Push this folder to a GitHub repository
3. In Render → **New** → **Static Site**
4. Connect the repository
5. Settings:
   - **Build Command**: leave empty
   - **Publish Directory**: `.` (or leave as root)
6. Click **Create Static Site**

Your guide will be live in under a minute.

## Local preview

Just open `index.html` in any browser, or use a simple local server:

```bash
npx serve .
```

---

Made for Rest N Play
