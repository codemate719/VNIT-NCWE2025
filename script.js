// Load Sidebar
fetch("/includes/sidebar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("sidebar-container").innerHTML = data;
    highlightActiveLink(); // Highlight active page
    initSidebar(); // Reinitialize sidebar functionality after loading
  })
  .catch(error => console.error("Error loading sidebar:", error));


// Load Footer
fetch("/includes/footer.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
    highlightActiveLink(); // Highlight the active page after sidebar loads
  })
  .catch(error => console.error("Error loading footer:", error));

// Function to highlight active page link in sidebar
function highlightActiveLink() {
    let links = document.querySelectorAll("aside nav a"); // Select all sidebar links
    let currentPath = window.location.pathname; // Get current page path
    let currentFullPath = window.location.href; // Get full URL (including hash)

    let parentTabs = new Map(); // Store parent tabs for dropdown links

    links.forEach(link => {
        const linkPath = new URL(link.href, window.location.origin).pathname; // Get base path
        const linkFullPath = link.href; // Full link (including hash)

        if (currentPath === linkPath || currentFullPath === linkFullPath) { 
            link.classList.add("bg-blue-200", "text-blue-900"); // Highlight exact matching link

            // Store parent tab reference if this link is inside a dropdown
            let parentDropdown = link.closest(".group"); // Find dropdown container
            if (parentDropdown) {
                let parentTab = parentDropdown.querySelector("a:first-child"); // Get main tab (About Us)
                if (parentTab) {
                    parentTabs.set(parentTab, true); // Mark parent tab for highlighting
                }
            }
        } else {
            link.classList.remove("bg-blue-200", "text-blue-900");
        }
    });

    // Highlight parent tabs if any child is active
    parentTabs.forEach((_, parentTab) => {
        parentTab.classList.add("bg-blue-200", "text-blue-900");
    });
}

// Back to top button
document.addEventListener("DOMContentLoaded", function () {
    const backToTopBtn = document.getElementById("back-to-top");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 200) { 
            backToTopBtn.classList.remove("opacity-0", "pointer-events-none", "hidden");
            backToTopBtn.style.pointerEvents = "auto"; 
        } else {
            backToTopBtn.classList.add("opacity-0", "pointer-events-none");
            backToTopBtn.style.pointerEvents = "none"; 
        }
    });

    backToTopBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});



// JavaScript for Sidebar Toggle
function initSidebar() {
    const sidebar = document.getElementById("sidebar");
    const toggleButton = document.getElementById("toggle-sidebar");

    // Create an overlay to detect outside clicks
    let overlay = document.getElementById("sidebar-overlay");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "sidebar-overlay";
        overlay.classList.add("fixed", "inset-0", "bg-black", "bg-opacity-50", "hidden", "z-30");
        document.body.appendChild(overlay);
    }

    function openSidebar() {
        sidebar.classList.remove("-translate-x-full");
        overlay.classList.remove("hidden");
    }

    function closeSidebar() {
        sidebar.classList.add("-translate-x-full");
        overlay.classList.add("hidden");
    }

    function toggleSidebar() {
        if (sidebar.classList.contains("-translate-x-full")) {
            openSidebar();
        } else {
            closeSidebar();
        }
    }

    if (!sidebar || !toggleButton || !overlay) return; // Prevent errors

    // Toggle sidebar on button click
    toggleButton.addEventListener("click", function (event) {
        event.stopPropagation();
        toggleSidebar();
    });

    // Close sidebar when clicking outside or on overlay
    overlay.addEventListener("click", closeSidebar);
    document.addEventListener("click", function (event) {
        if (!sidebar.contains(event.target) && !toggleButton.contains(event.target)) {
            closeSidebar();
        }
    });

    // Keep sidebar open on large screens (lg)
    window.addEventListener("resize", function () {
        if (window.innerWidth >= 1024) {
            sidebar.classList.remove("-translate-x-full");
            overlay.classList.add("hidden");
        } else {
            sidebar.classList.add("-translate-x-full");
        }
    });
}

// Initialize sidebar on first page load
document.addEventListener("DOMContentLoaded", initSidebar);
