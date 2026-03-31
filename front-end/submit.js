const scriptUrl = "yourscripturlhere";
const form = document.querySelector("form");

export const submit = (() => {

  form.addEventListener("submit", function (e) {
    
    if (!this.checkValidity()) {
      this.reportValidity();
      return;
    }

    e.preventDefault();

    document.querySelectorAll("form input, form button").forEach(el => {
      el.disabled = true;
    });

    //Replace these with your column names and form values
    const formData = {
      "Honorific": document.getElementById("honorific").value,
      "First name": document.getElementById("first-name").value,
      "Last name": document.getElementById("last-name").value,
      "Religious postnominals": document.getElementById("postnominals").value,
      "Title": document.getElementById("title").value,
      "Institution": document.getElementById("institution").value,
      "Location": document.getElementById("location").value,
      "Sign me up for the ISEC newsletter": document.getElementById("newsletter-signup").value,
      "Email": document.getElementById("email").value
    };

    const params = new URLSearchParams(formData);
    const script = `${scriptUrl}?${params}`;

    fetch(script)
      .then(res => res.text())
      .then(text => {
        const data = JSON.parse(text);
        console.log(data);
      })
      .catch(err => {
        console.error(err);
      });
  });
})();