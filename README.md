# Form → Google Sheets Workflow
A lightweight, backend-free form submission pipeline using Google Apps Script and Google Sheets. Designed for static sites that need simple data collection without standing up a full server.

## Overview
This project captures form submissions, stores them in a Google Sheet, and renders the data dynamically on a website.

It was built with a focus on simplicity, reliability, and clean data handling.

## Usage
### 1. Set up the Google Sheet
- Create a Google Sheet
- Add a header row (these must match your form field names exactly)

Example:
```
Timestamp |	Honorific | First name | Last name | Title | Email
```

### 2. Set up Google Apps Script
- Open **Extensions → Apps Script** in your sheet
- Paste in `Code.gs`
- Deploy as a web app:
```
Execute as: Me
Who has access: Anyone
```
- Copy the `/exec` URL

### 3. Submit data from the frontend
```
js
const params = new URLSearchParams(formData);

fetch(`${SCRIPT_URL}?${params}`)
  .then(res => res.json())
  .then(data => {
    // handle success
  });
```

### 4. Fetch and render data

Use the Google Sheets API or your preferred method to read and display stored entries.

### Notes
Field names must match sheet headers exactly
Requests must use GET (to avoid CORS preflight issues)
This setup is best for simple, unauthenticated submissions

## Key Decisions
### 1. No Traditional Backend
Instead of using a server (Node, PHP, etc.), this uses Google Apps Script as a lightweight backend.

- No hosting required  
- Easy integration with Google Sheets  
- Works well for low to moderate traffic use cases  

### 2. GET Requests Instead of POST
Form data is sent via query parameters.

- Avoids CORS preflight issues  
- Works reliably with Apps Script web apps  
- Keeps requests simple and predictable  

### 3. Data Normalization
Input is cleaned and standardized before rendering:
- Trimming whitespace  
- Normalizing capitalization  
- Converting special characters  
- Formatting output consistently  

This ensures consistent display even with messy user input.

### 4. Matching Data Structure
Frontend keys match Google Sheet headers exactly.

- Eliminates mapping logic  
- Keeps data flow simple  
- Reduces risk of mismatched fields  

## Files
```
frontend/
submit.js // handles form submission
render.js // fetches and displays data

apps-script/
Code.gs // writes submissions to Google Sheets

utils/
normalize.js // cleans and formats input data
```