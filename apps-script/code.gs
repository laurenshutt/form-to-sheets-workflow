//Add your values here
const apiKey = "yourapikeyhere";
const spreadsheetId = "yourspreadsheetidhere";
const sheet = "yoursheetnamehere";

function doGet(e){
  return handleResponse(e);
}

const SCRIPT_PROP = PropertiesService.getScriptProperties(); 

function handleResponse(e) {

  const lock = LockService.getPublicLock();
  lock.waitLock(30000); 
  
  try {

    const doc = SpreadsheetApp.openById(spreadsheetId);
    const sheet = doc.getSheetByName(sheet);
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const nextRow = sheet.getLastRow()+1; // get next row
    const row = []; 
    
    for (h in headers){
      if (headers[h] == "Timestamp"){ 
        row.push(new Date());
      } else { 
        row.push(e.parameter[headers[h]]);
      }
    }

    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);

    return ContentService
          .createTextOutput(JSON.stringify({"result":"success", "row": nextRow}))
          .setMimeType(ContentService.MimeType.JSON);
  } 
  
  catch(e){
    return ContentService
      .createTextOutput(JSON.stringify({"result":"error", "error": e}))
      .setMimeType(ContentService.MimeType.JSON);
  } finally { 
    lock.releaseLock();
  }
}

function setup() {
    SCRIPT_PROP.setProperty("key", apiKey);
}