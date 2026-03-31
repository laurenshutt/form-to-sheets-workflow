# Form → Google Sheets Workflow
A lightweight, backend-free form submission pipeline using Google Apps Script and Google Sheets. Designed for sites that need simple data collection without standing up a full server, or users who need a way to access collected data without server knowledge.

## Overview
This project captures form submissions, stores them in a Google Sheet, and renders the data dynamically on a website.

It was built with a focus on simplicity, reliability, and clean data handling.

## Usage
### 1. Set up the Google Sheet
- Create a [Google Sheet](https://sheets.google.com)
- Add a header row (these must match your form field names exactly)

### 2. Make your sheet public (read access)
- Open your Google Sheet
- Click **Share**
- Set to **Anyone with the link → Viewer**
Example:
```
Timestamp |	Honorific | First name | Last name | Title | Email
```
**Tip:** You can [freeze the header row](https://support.google.com/docs/answer/9060449) to make scrolling easier.

### 3. Set up Google Apps Script
- Open **Extensions → Apps Script** in your sheet
- Paste in `Code.gs`
- Deploy as a web app:
```
Execute as: Me
Who has access: Anyone
```
- Copy the `/exec` URL

### 4. Get a Google Sheets API Key (for reading data)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select an existing one)
#### Enable the Google Sheets API
3. Go to **APIs & Services → Library**
4. Search for **Google Sheets API**
5. Click **Enable**
#### Create an API Key
6. Go to **APIs & Services → Credentials**
7. Click **Create Credentials → API Key**
8. Name your API key and select **Google Sheets API** under **Select API restrictions**

#### Restrict the API Key (recommended)
8a. Under **Application restrictions** select **Websites**
8b. Under **Website restrictions** click **Add**
8c. In the **Website** field enter your domain:
```
https://yourdomain.com/*
```
9. Click **Create** to create and save the key.
10. On the Credentials page, click **Show key** to the right of the API key you just created
11. Copy your API key



### 5. Submit data from the frontend
```
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