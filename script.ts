document.addEventListener('DOMContentLoaded', () => {
  const toggleSkillsButton = document.getElementById('toggleSkills') as HTMLButtonElement;
  const skillsSection = document.getElementById('skillsSection') as HTMLElement;

  // Hide the skills section by default
  skillsSection.style.display = 'none';

  // Toggle skills section visibility
  toggleSkillsButton.addEventListener('click', () => {
    if (skillsSection.style.display === 'none') {
      skillsSection.style.display = 'block';
      toggleSkillsButton.textContent = 'Hide Skills';
    } else {
      skillsSection.style.display = 'none';
      toggleSkillsButton.textContent = 'Show Skills';
    }
  });
});
