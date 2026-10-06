document.addEventListener("DOMContentLoaded", () => {

    /* ================================
       부드러운 메뉴 이동
    ================================= */

    const links = document.querySelectorAll(
        '.main-nav a, .hero-button'
    );

    links.forEach(link => {

        link.addEventListener("click", (event) => {

            const href = link.getAttribute("href");

            if (!href || !href.startsWith("#")) {
                return;
            }

            const target = document.querySelector(href);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* ================================
       현재 위치에 따른 메뉴 표시
    ================================= */

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    const navLinks = document.querySelectorAll(
        ".main-nav a"
    );

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                const id = entry.target.getAttribute("id");

                navLinks.forEach(link => {

                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") === `#${id}`
                    ) {
                        link.classList.add("active");
                    }

                });

            });

        },
        {
            threshold: 0.35
        }
    );


    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    /* ================================
       페이지 진입 애니메이션
    ================================= */

    const animatedItems = document.querySelectorAll(
        ".story-item, .work, .strength-grid article, .device-flow div"
    );

    const animationObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.15
        }
    );


    animatedItems.forEach(item => {

        item.classList.add("before-show");

        animationObserver.observe(item);

    });


    /* ================================
       새로고침 시 페이지 최상단
    ================================= */

    if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);

});