# Form → Google Sheets Workflow
A lightweight, backend-free form submission pipeline using Google Apps Script and Google Sheets. Designed for static sites that need simple data collection without standing up a full server.


## Overview
This project captures form submissions, stores them in a Google Sheet, and renders the data dynamically on a website.

It was built with a focus on simplicity, reliability, and clean data handling.


## How It Works
1. A user submits a form on the frontend  
2. The form data is sent via a simple GET request  
3. Google Apps Script receives and processes the data  
4. The data is written to a Google Sheet  
5. The frontend fetches and displays the stored data  

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