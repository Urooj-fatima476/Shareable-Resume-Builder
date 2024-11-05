// Define interfaces for capturing form data
interface ResumeData {
  name: string;
  email: string;
  linkedin: string;
  education: string;
  experience: string;
  skills: string[];
}

// Function to handle form submission
function handleFormSubmit(event: Event): void {
  event.preventDefault();

  // Capture form data
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const linkedin = (document.getElementById("linkedin") as HTMLInputElement).value;
  const education = (document.getElementById("education") as HTMLTextAreaElement).value;
  const experience = (document.getElementById("experience") as HTMLTextAreaElement).value;
  const skills = (document.getElementById("skills") as HTMLInputElement).value.split(",");

  // Create resume data object
  const resumeData: ResumeData = { name, email, linkedin, education, experience, skills };

  // Display resume
  displayResume(resumeData);

  // Disable form fields to prevent editing
  disableFormFields();
}

// Function to display the generated resume
function displayResume(data: ResumeData): void {
  // Get the resume content area
  const resumeContent = document.getElementById("resume-content") as HTMLElement;

  // Populate the resume content
  resumeContent.innerHTML = `
    <h2>${data.name}</h2>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>LinkedIn:</strong> <a href="${data.linkedin}" target="_blank">${data.linkedin}</a></p>
    <h3>Education</h3>
    <p>${data.education}</p>
    <h3>Experience</h3>
    <p>${data.experience}</p>
    <h3>Skills</h3>
    <ul>
      ${data.skills.map(skill => `<li>${skill.trim()}</li>`).join("")}
    </ul>
  `;

  // Show the resume section and hide the form
  document.getElementById("form-section")!.style.display = "none";
  document.getElementById("resume-section")!.style.display = "block";
}

// Function to disable form fields
function disableFormFields(): void {
  (document.getElementById("name") as HTMLInputElement).disabled = true;
  (document.getElementById("email") as HTMLInputElement).disabled = true;
  (document.getElementById("linkedin") as HTMLInputElement).disabled = true;
  (document.getElementById("education") as HTMLTextAreaElement).disabled = true;
  (document.getElementById("experience") as HTMLTextAreaElement).disabled = true;
  (document.getElementById("skills") as HTMLInputElement).disabled = true;
}

// Attach event listener to the form
document.getElementById("resume-form")!.addEventListener("submit", handleFormSubmit);
