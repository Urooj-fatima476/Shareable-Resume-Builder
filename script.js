function handleFormSubmit(event) {
    event.preventDefault();
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var linkedin = document.getElementById("linkedin").value;
    var education = document.getElementById("education").value;
    var experience = document.getElementById("experience").value;
    var skills = document.getElementById("skills").value.split(",");
    var resumeData = { name: name, email: email, linkedin: linkedin, education: education, experience: experience, skills: skills };
    displayResume(resumeData);
}
function displayResume(data) {
    var resumeContent = document.getElementById("resume-content");
    resumeContent.innerHTML = "\n    <h2 contenteditable=\"true\" oninput=\"updateField(this, 'name')\">".concat(data.name, "</h2>\n    <p><strong>Email:</strong> <span contenteditable=\"true\" oninput=\"updateField(this, 'email')\">").concat(data.email, "</span></p>\n    <p><strong>LinkedIn:</strong> <a href=\"").concat(data.linkedin, "\" target=\"_blank\" contenteditable=\"true\" oninput=\"updateField(this, 'linkedin')\">").concat(data.linkedin, "</a></p>\n    <h3>Education</h3>\n    <p contenteditable=\"true\" oninput=\"updateField(this, 'education')\">").concat(data.education, "</p>\n    <h3>Experience</h3>\n    <p contenteditable=\"true\" oninput=\"updateField(this, 'experience')\">").concat(data.experience, "</p>\n    <h3>Skills</h3>\n    <ul id=\"skills-list\">\n      ").concat(data.skills.map(function (skill) { return "<li contenteditable=\"true\" oninput=\"updateSkill(this)\">".concat(skill.trim(), "</li>"); }).join(""), "\n    </ul>\n  ");
    document.getElementById("form-section").style.display = "none";
    document.getElementById("resume-section").style.display = "block";
}
function resetForm() {
    document.getElementById("form-section").style.display = "block";
    document.getElementById("resume-section").style.display = "none";
}
// Function to update each field in the ResumeData object
function updateField(element, field) {
    var resumeData = getResumeData();
    if (field === "skills") {
        resumeData.skills = element.innerText.split(",").map(function (skill) { return skill.trim(); });
    }
    else {
        resumeData[field] = element.innerText;
    }
    saveResumeData(resumeData);
}
// Function to update individual skills in the ResumeData object
function updateSkill(element) {
    var resumeData = getResumeData();
    var skills = [].slice.call(document.querySelectorAll("#skills-list li")).map(function (el) { return el.textContent.trim(); });
    resumeData.skills = skills;
    saveResumeData(resumeData);
}
// Retrieve resume data from session storage or return default data
function getResumeData() {
    var data = sessionStorage.getItem("resumeData");
    return data ? JSON.parse(data) : { name: "", email: "", linkedin: "", education: "", experience: "", skills: [] };
}
// Save updated resume data to session storage
function saveResumeData(data) {
    sessionStorage.setItem("resumeData", JSON.stringify(data));
}
// Attach form submit event
document.getElementById("resume-form").addEventListener("submit", handleFormSubmit);
