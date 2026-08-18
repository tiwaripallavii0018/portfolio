const sections = document.querySelectorAll(".section");


// ===============================
// SECTION SCROLL ANIMATION
// ===============================

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0px)";

        }

    });

}, {
    threshold: 0.2
});


sections.forEach(section => {

    section.style.opacity = 0;
    section.style.transform = "translateY(40px)";
    section.style.transition = "0.6s ease";

    observer.observe(section);

});


// ===============================
// LOAD PROJECTS FROM JAVA BACKEND
// ===============================

const projectsContainer =
    document.getElementById("projects-container");


async function loadProjects() {

    try {

       const response = await fetch("/api/projects");


        // Check API response
        if (!response.ok) {

            throw new Error(
                "Failed to fetch projects"
            );

        }


        // Convert API response to JSON
        const projects = await response.json();


        // Clear existing projects
        projectsContainer.innerHTML = "";


        // If no projects exist
        if (projects.length === 0) {

            projectsContainer.innerHTML =
                "<p>No projects available.</p>";

            return;

        }


        // ===============================
        // CREATE PROJECT CARDS
        // ===============================

        projects.forEach(project => {

            const projectCard =
                document.createElement("a");


            // Card link
            projectCard.className =
                "project-link";


            // GitHub link
            projectCard.href =
                project.githubUrl || "#";


            projectCard.target = "_blank";


            // ===============================
            // PROJECT CARD HTML
            // ===============================

            projectCard.innerHTML = `

                <div class="project-card">

                    ${
                        project.imageUrl
                        ?
                        `
                        <img
                            src="${project.imageUrl}"
                            alt="${project.name}"
                        >
                        `
                        :
                        ""
                    }


                    <div class="project-info">

                        <h3>
                            ${project.name}
                        </h3>


                        <p>
                            ${project.description}
                        </p>


                        <p>
                            <strong>
                                Tech Used:
                            </strong>

                            ${project.technologies}
                        </p>


                        ${
                            project.githubUrl
                            ?
                            `
                            <p>
                                <strong>
                                    GitHub:
                                </strong>

                                View Project
                            </p>
                            `
                            :
                            ""
                        }

                    </div>

                </div>

            `;


            // Add card to container
            projectsContainer.appendChild(
                projectCard
            );

        });

    }


    // ===============================
    // ERROR HANDLING
    // ===============================

    catch (error) {

        console.error(
            "Error loading projects:",
            error
        );


        projectsContainer.innerHTML = `

            <p>
                Unable to load projects.
            </p>

        `;

    }

}


// ===============================
// LOAD PROJECTS
// ===============================

loadProjects();


// ===============================
// CONTACT FORM
// ===============================

const contactForm =
    document.querySelector(".contact-form");


contactForm.addEventListener(
    "submit",
    function (e) {

        e.preventDefault();

        alert(
            "Message sent successfully!"
        );

    }
);