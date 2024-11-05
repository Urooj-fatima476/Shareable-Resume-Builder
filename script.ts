interface ResumeData {
  name: string;
  email: string;
  linkedin: string;
  education: string;
  experience: string;
  skills: string[];
}

function handleFormSubmit(event: Event): void {
  event.preventDefault();

  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const linkedin = (document.getElementById("linkedin") as HTMLInputElement).value;
  const education = (document.getElementById("education") as HTMLTextAreaElement).value;
  const experience = (document.getElementById("experience") as HTMLTextAreaElement).value;
  const skills = (document.getElementById("skills") as HTMLInputElement).value.split(",");

  const resumeData: ResumeData = { name, email, linkedin, education, experience, skills };

  displayResume(resumeData);
}

function displayResume(data: ResumeData): void {
  const resumeContent = document.getElementById("resume-content") as HTMLElement;

  resumeContent.innerHTML = `
    <h2 contenteditable="true" oninput="updateField(this, 'name')">${data.name}</h2>
    <p><strong>Email:</strong> <span contenteditable="true" oninput="updateField(this, 'email')">${data.email}</span></p>
    <p><strong>LinkedIn:</strong> <a href="${data.linkedin}" target="_blank" contenteditable="true" oninput="updateField(this, 'linkedin')">${data.linkedin}</a></p>
    <h3>Education</h3>
    <p contenteditable="true" oninput="updateField(this, 'education')">${data.education}</p>
    <h3>Experience</h3>
    <p contenteditable="true" oninput="updateField(this, 'experience')">${data.experience}</p>
    <h3>Skills</h3>
    <ul id="skills-list">
      ${data.skills.map(skill => `<li contenteditable="true" oninput="updateSkill(this)">${skill.trim()}</li>`).join("")}
    </ul>
  `;

  document.getElementById("form-section")!.style.display = "none";
  document.getElementById("resume-section")!.style.display = "block";
}

function resetForm(): void {
  document.getElementById("form-section")!.style.display = "block";
  document.getElementById("resume-section")!.style.display = "none";
}

// Function to update each field in the ResumeData object
function updateField(element: HTMLElement, field: keyof ResumeData): void {
  const resumeData = getResumeData();
  if (field === "skills") {
    resumeData.skills = element.innerText.split(",").map(skill => skill.trim());
  } else {
    resumeData[field] = element.innerText as string;
  }
  saveResumeData(resumeData);
}

// Function to update individual skills in the ResumeData object
function updateSkill(element: HTMLElement): void {
  const resumeData = getResumeData();
  const skills = [].slice.call(document.querySelectorAll("#skills-list li")).map((el: HTMLElement) => el.textContent!.trim());
  resumeData.skills = skills;
  saveResumeData(resumeData);
}

// Retrieve resume data from session storage or return default data
function getResumeData(): ResumeData {
  const data = sessionStorage.getItem("resumeData");
  return data ? JSON.parse(data) : { name: "", email: "", linkedin: "", education: "", experience: "", skills: [] };
}

// Save updated resume data to session storage
function saveResumeData(data: ResumeData): void {
  sessionStorage.setItem("resumeData", JSON.stringify(data));
}

// Attach form submit event
document.getElementById("resume-form")!.addEventListener("submit", handleFormSubmit);
