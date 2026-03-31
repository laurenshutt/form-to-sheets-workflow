# Form → Google Sheets Workflow
A lightweight, backend-free form submission pipeline using Google Apps Script and Google Sheets. Designed for sites that need simple data collection without standing up a full server, or users who need a way to access collected data without server knowledge.

## Usage
### 1. Set up your Google Sheet
1. Create a [Google Sheet](https://sheets.google.com)
2. Add a header row with the information you intend to collect from the form. 

Example:
```
Timestamp |	Honorific | First name | Last name | Title | Email
```
**Tip:** You can [freeze the header row](https://support.google.com/docs/answer/9060449) to make scrolling easier.


### 2. Make your Google sheet public
1. Click [**Share**](https://support.google.com/docs/answer/2494822)
2. Click the dropdown under **General access** that says **Restricted**
3. Select **Anyone with the link**
4. Click **Done**


### 3. Set up Google Apps Script
1. Open **Extensions → Apps Script** in your sheet
2. Name the script and paste in `Code.gs`
3. Click **[Deploy](https://developers.google.com/apps-script/concepts/deployments) → New deployment**
4. Give the deployment a description (e.g., `Initial deployment`)
5. Under **Execute as** select **Me**
6. Under **Who has access** select **Anyone**
7. Click **Deploy**
8. Copy and save the URL


### 4. Create an API key
#### 4a. Create or open a Google Cloud Console Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. [Create a new project](https://developers.google.com/workspace/guides/create-project) (or select an existing one)
#### 4b. Enable the Google Sheets API
3. Go to **APIs & Services → Library**
4. Search for **Google Sheets API**
5. Click **Enable**
#### 4c. Create the key
6. Go to **APIs & Services → Credentials**
7. Click **Create Credentials → API Key**
8. Name your API key and select **Google Sheets API** under **Select API restrictions**
#### Optional: Restrict the API Key (recommended but not required)
9. Under **Application restrictions** select **Websites**
10. Under **Website restrictions** click **Add**
11. In the **Website** field enter your domain (e.g., `https://yourdomain.com/*`)  
Tip: Asterisks (*) indicate all pages underneath the domain
12. Click **Create**
13. On the Credentials page, click **Show key** to the right of the API key you just created
14. Copy and save your API key


### 5. Modify and import the front-end functions
1. Add your API key to `render.js` 
```
const apiKey = "yourapikeyhere";
```
2. Add your Google Script URL to `submit.js`
```
const scriptURL = "yourscripturlhere";
```
3. Modify the `formData` keys in `submit.js` to match the column headers you made in step 1. 
Example:
```
const formData = {
    "Honorific": $("#honorific").val(),
    "First name": $("#first-name").val(),
    "Last name": $("#last-name").val(),
    "Title": $("#title").val(),
    "Email": $("#email").val()
};
```
4. Import `render()` and `submit()` into your script
```
import {
    render
} from "./render.js";

import {
    submit
} from "./submit.js";
```

### Notes
- Field names must match sheet headers exactly
- Requests must use GET (to avoid CORS preflight issues)
- This setup is best for simple, unauthenticated submissions

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