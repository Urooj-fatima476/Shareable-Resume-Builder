// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    // Capture form data
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var linkedin = document.getElementById("linkedin").value;
    var education = document.getElementById("education").value;
    var experience = document.getElementById("experience").value;
    var skills = document.getElementById("skills").value.split(",");
    // Create resume data object
    var resumeData = { name: name, email: email, linkedin: linkedin, education: education, experience: experience, skills: skills };
    // Display resume
    displayResume(resumeData);
    // Disable form fields to prevent editing
    disableFormFields();
}
// Function to display the generated resume
function displayResume(data) {
    // Get the resume content area
    var resumeContent = document.getElementById("resume-content");
    // Populate the resume content
    resumeContent.innerHTML = "\n    <h2>".concat(data.name, "</h2>\n    <p><strong>Email:</strong> ").concat(data.email, "</p>\n    <p><strong>LinkedIn:</strong> <a href=\"").concat(data.linkedin, "\" target=\"_blank\">").concat(data.linkedin, "</a></p>\n    <h3>Education</h3>\n    <p>").concat(data.education, "</p>\n    <h3>Experience</h3>\n    <p>").concat(data.experience, "</p>\n    <h3>Skills</h3>\n    <ul>\n      ").concat(data.skills.map(function (skill) { return "<li>".concat(skill.trim(), "</li>"); }).join(""), "\n    </ul>\n  ");
    // Show the resume section and hide the form
    document.getElementById("form-section").style.display = "none";
    document.getElementById("resume-section").style.display = "block";
}
// Function to disable form fields
function disableFormFields() {
    document.getElementById("name").disabled = true;
    document.getElementById("email").disabled = true;
    document.getElementById("linkedin").disabled = true;
    document.getElementById("education").disabled = true;
    document.getElementById("experience").disabled = true;
    document.getElementById("skills").disabled = true;
}
// Attach event listener to the form
document.getElementById("resume-form").addEventListener("submit", handleFormSubmit);
