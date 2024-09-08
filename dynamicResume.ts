document.addEventListener("DOMContentLoaded", () => {
    // Get references to HTML elements
    const form = document.getElementById("resumeForm") as HTMLFormElement | null;
    const resumePreview = document.getElementById("resumePreview") as HTMLElement | null;
    const profilePicInput = document.getElementById("profilePic") as HTMLInputElement | null;
    const profilePicPreview = document.getElementById("profilePicPreview") as HTMLDivElement | null;
    const profilePicImage = document.getElementById("profilePicImage") as HTMLImageElement | null;

    // Check if form and resumePreview elements are present
    if (!form || !resumePreview) {
        console.error("Form or resume preview container not found.");
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Get form values
        const name = (document.getElementById("name") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const phone = (document.getElementById("phone") as HTMLInputElement).value;
        const education = (document.getElementById("education") as HTMLTextAreaElement).value.split(",");
        const workExperience = (document.getElementById("experience") as HTMLTextAreaElement).value.split(",");
        const skills = (document.getElementById("skills") as HTMLInputElement).value.split(",");

        // Handle profile picture
        let profilePicSrc = "";
        if (profilePicInput && profilePicInput.files && profilePicInput.files[0]) {
            const file = profilePicInput.files[0];
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                profilePicSrc = e.target?.result as string;
                createResume();
            };
            reader.readAsDataURL(file);
        } else {
            createResume();
        }

        function createResume() {
            if (!resumePreview) return;

            // Clear previous resume
            resumePreview.innerHTML = "";

            // Create resume sections
            const profilePicSection = profilePicSrc ? `
                <section class="resume-section">
                    <img src="${profilePicSrc}" alt="Profile Picture" class="profile-pic" />
                </section>
            ` : '';

            const headerSection = `
                <section class="resume-section">
                    <h2>${name}</h2>
                    <p>Email: <a href="mailto:${email}">${email}</a></p>
                    <p>Phone: ${phone}</p>
                </section>
            `;

            const educationSection = `
                <section class="resume-section">
                    <h2>Education</h2>
                    <ul>${education.map(item => `<li>${item.trim()}</li>`).join("")}</ul>
                </section>
            `;

            const experienceSection = `
                <section class="resume-section">
                    <h2>Work Experience</h2>
                    <ul>${workExperience.map(item => `<li>${item.trim()}</li>`).join("")}</ul>
                </section>
            `;

            const skillsSection = `
                <section class="resume-section">
                    <h2>Skills</h2>
                    <ul>${skills.map(item => `<li>${item.trim()}</li>`).join("")}</ul>
                </section>
            `;

            // Append sections to the resume container
            resumePreview.innerHTML = profilePicSection + headerSection + educationSection + experienceSection + skillsSection;
            resumePreview.classList.remove("hidden");
        }
    });

    // Handle profile picture preview
    if (profilePicInput && profilePicPreview && profilePicImage) {
        profilePicInput.addEventListener("change", () => {
            const file = profilePicInput.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e: ProgressEvent<FileReader>) => {
                    profilePicImage.src = e.target?.result as string;
                    profilePicPreview.classList.remove("hidden");
                };
                reader.readAsDataURL(file);
            } else {
                profilePicPreview.classList.add("hidden");
            }
        });
    }
});
