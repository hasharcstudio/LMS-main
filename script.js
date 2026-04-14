document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");
    const navToggle = document.querySelector(".nav__toggle");
    const sidebar = document.querySelector(".sidebar");
    const sidebarClose = document.querySelector(".sidebar__close");
    const sidebarLinks = document.querySelectorAll(".sidebar__link");
    const allNavLinks = document.querySelectorAll(".nav__link, .sidebar__link");
    const revealSections = document.querySelectorAll(".section-reveal");
    const yearElement = document.querySelector("#year");
    const bookingForm = document.querySelector("#bookingForm");
    const bookingNote = document.querySelector("#bookingNote");

    const openSidebar = () => {
        sidebar.classList.add("active");
        sidebar.setAttribute("aria-hidden", "false");
        navToggle.setAttribute("aria-expanded", "true");
        document.body.style.overflow = "hidden";
    };

    const closeSidebar = () => {
        sidebar.classList.remove("active");
        sidebar.setAttribute("aria-hidden", "true");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
    };

    navToggle?.addEventListener("click", openSidebar);
    sidebarClose?.addEventListener("click", closeSidebar);
    sidebarLinks.forEach((link) => link.addEventListener("click", closeSidebar));

    document.addEventListener("click", (event) => {
        if (!sidebar.classList.contains("active")) {
            return;
        }

        if (!sidebar.contains(event.target) && !navToggle.contains(event.target)) {
            closeSidebar();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && sidebar.classList.contains("active")) {
            closeSidebar();
        }
    });

    const setActiveNavLink = () => {
        const sectionIds = ["home", "services", "workflow", "pricing", "booking", "contact"];
        const offset = window.scrollY + 140;

        let activeId = "home";
        sectionIds.forEach((id) => {
            const section = document.getElementById(id);
            if (section && section.offsetTop <= offset) {
                activeId = id;
            }
        });

        allNavLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${activeId}`);
        });
    };

    const onScroll = () => {
        header.classList.toggle("scrolled", window.scrollY > 24);
        setActiveNavLink();
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (event) => {
            const href = anchor.getAttribute("href");
            if (!href || href === "#") {
                return;
            }

            const target = document.querySelector(href);
            if (!target) {
                return;
            }

            event.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - 76;
            window.scrollTo({ top, behavior: "smooth" });
        });
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.16 }
    );

    revealSections.forEach((section) => observer.observe(section));

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    bookingForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        bookingNote.textContent = "Thanks. Your pickup request has been received. Our team will contact you shortly.";
        bookingForm.reset();
    });
});