//Add your values here
const spreadsheetId = "yourspreadsheetidhere";
const sheet = "yoursheetname";
const apiKey = "yourapikeyhere";

const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheet}?key=${apiKey}`;
const container = "";
let signatories = {};

import {
    normalizeCaps,
    normalizeString
} from "./utils";

export const render = (() => {

    fetch(url)
        .then(res => res.json())
        .then(data => {
            
            const submissions = data.values;

            for (let s = 1; s < submissions.length; s++) {
            
                const submission = submissions[s];
                const approved = submission[9];

                if (!approved) continue;

                const honorific = submission[1];
                const first = submission[2];
                const last = submission[3];
                const postnominals = submission[4];
                const institution = submission[6];

                const key = normalizeString(last) + normalizeString(first);

                const signatory = [honorific, first, last, postnominals, institution];

                let html = "";

                signatory.forEach((entry, index) => {
                    
                    entry = normalizeCaps((entry || "").trim());

                    if (entry.length <= 1) return;

                    //You may need to modify this switch depending on your data
                    switch (true) {
                        case index < 2:
                            html += `${entry} `;
                            break;

                        case index === 2:
                            html += `${entry}`;
                            break;

                        case index === 3:
                            html += `, ${entry}`;
                            break;

                        case index > 3:
                            html += `<br/>${entry}`;
                            break;
                    }
                });

                signatories[key] = html;
            }
        })
        .catch(err => console.error(err));

    signatories = Object.fromEntries(
        Object.entries(signatories).sort()
    );

    Object.keys(signatories).forEach(function(signatory){
        const p = document.createElement("p");     
        p.innerHTML = signatories[signatory];
        container.appendChild(p);
    }); 
})();