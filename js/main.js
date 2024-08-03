// Rejestracja pluginów GSAP
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function() {
    const icons = document.querySelectorAll('.nav-iconn');
    const texts = document.querySelectorAll('.nav-infoo');
    const navClose = document.querySelector('.nav-close-icon');
    const navNavi = document.querySelector('.nav-navigation-icon');
    const navNaviMob = document.querySelector('.nav-navigation-icon.nav-nav-mobb');
    let tittleOfSectionH3 = document.querySelectorAll('.tittle-of-section h3');
    let tittleOfOrna = document.querySelectorAll('.tittle-orna');
    let HeaderOrna = document.querySelectorAll('.orna-div');
    let HeaderWord = document.querySelectorAll('.intro-word');
    let resButton = document.querySelectorAll('.intro-no1:nth-child(4)');
    let formBoxInput = document.querySelectorAll('.form-box input');
    let formBoxTeaxtarea = document.querySelector('.form-box textarea');

    let activeIndex = null;

    gsap.to('.some-info-inside', { duration: 0, opacity: 0 });
    gsap.to('.section.text', { duration: 0, opacity: 0 });
    gsap.to('.section1-some-imgs.img1', { duration: 0, opacity: 0, x: "-100px" });
    gsap.to('.section1-some-imgs.img2', { duration: 0, opacity: 0, x: "100px" });
    gsap.to('.card', { duration: 0, opacity: 0, x: '-100px' });

    function displayCardsPerson(element, delayTime) {
        gsap.to(element, {
            opacity: 1,
            x: "0px",
            duration: 0.5,
            delay: delayTime,
            ease: "power2.out" // Dodanie wygładzenia dla lepszego efektu
        });
    }

    function opacityImageBackground() {
        gsap.to('.some-info-inside', { duration: 0.5, opacity: 1 });
        gsap.to('.section.text', { duration: 0.5, opacity: 1, delay: 0.5 });
        gsap.to('.section1-some-imgs.img1', { duration: 0.5, opacity: 1, x: '0px' });
        gsap.to('.section1-some-imgs.img2', { duration: 0.5, opacity: 1, x: '0px' });
    }

    // Timeline fragment
    const tl = gsap.timeline();

    tl.to(HeaderOrna[0], { duration: 0.3, marginLeft: '0px', opacity: 1 })
      .to(HeaderWord[0], { duration: 0.3, opacity: 1 })
      .to(HeaderOrna[1], { duration: 0.3, opacity: 1 })
      .to(HeaderWord[1], { duration: 0.3, opacity: 1 })
      .to(HeaderOrna[2], { duration: 0.3, marginLeft: '0px', opacity: 1, delay: 0.6 })
      .to(HeaderOrna[3], { duration: 0.3, marginLeft: '0px', opacity: 1 }, '-=0.3')
      .to(HeaderWord[2], { duration: 0.3, opacity: 1 })
      .to(resButton, { duration: 0.3, opacity: 1, delay: 1 });

    function animateText() {
        const articles = document.querySelectorAll(".about-us-info article");
        let articleIndex = 0;
        let charIndex = 0;

        function showNextChar() {
            if (articleIndex < articles.length) {
                let article = articles[articleIndex];
                article.style.display = 'block'; // Upewnij się, że artykuł jest widoczny
                let text = article.getAttribute("data-text");

                if (charIndex < text.length) {
                    article.innerText = text.substring(0, charIndex + 1);
                    charIndex++;
                    setTimeout(showNextChar, 10); // Opóźnienie między znakami (15 ms)
                } else {
                    charIndex = 0;
                    articleIndex++;
                    setTimeout(showNextChar, 30); // Opóźnienie między artykułami (50 ms)
                }
            }
        }

        // Przygotowanie artykułów do animacji
        articles.forEach(article => {
            article.setAttribute("data-text", article.innerText);
            article.innerText = ""; // Pusty początkowy tekst
        });

        showNextChar();
    }

    icons.forEach((icon, index) => {
        icon.addEventListener('click', () => {
            if (activeIndex === index) {
                texts[index].classList.toggle('active');
                icons[index].classList.toggle('active');
                if (!texts[index].classList.contains('active')) {
                    activeIndex = null; // Reset activeIndex if class is removed
                }
            } else {
                texts.forEach(text => text.classList.remove('active'));
                icons.forEach(icon => icon.classList.remove('active'));
                texts[index].classList.add('active');
                icons[index].classList.add('active');
                activeIndex = index; // Update activeIndex
            }
        });
    });

    navClose.addEventListener('click', () => {
        document.querySelector('.mobile-navigation').classList.remove('active');
    });
    navNavi.addEventListener('click', () => {
        document.querySelector('.mobile-navigation').classList.add('active');
    });
    navNaviMob.addEventListener('click', () => {
        document.querySelector('.mobile-navigation').classList.add('active');
    });

    var swiper = new Swiper(".mySwiper", {
        pagination: {
            el: ".swiper-pagination",
        },
    });

    // Stworzenie ScrollTrigger dla tittleOfSectionH3
    tittleOfSectionH3.forEach((elem) => {
        gsap.to(elem, {
            scrollTrigger: {
                trigger: elem,
                start: 'top 80%',
                onEnter: () => $(elem).addClass('active-tittle')
            }
        });
    });

    // Stworzenie ScrollTrigger dla tittleOfOrna
    tittleOfOrna.forEach((elem) => {
        gsap.to(elem, {
            scrollTrigger: {
                trigger: elem,
                start: 'top 80%',
                onEnter: () => $(elem).addClass('active-orna')
            }
        });
    });

    // Stworzenie ScrollTrigger dla card z opóźnieniem
    $('.card').each(function(index) {
        gsap.to(this, {
            scrollTrigger: {
                trigger: this,
                start: 'top 80%',
                once: true,
                onEnter: () => displayCardsPerson(this, index * 0.2) // Opóźnienie wzrasta dla każdego elementu
            }
        });
    });


    ScrollTrigger.create({
        trigger: '.about-us-flex',
        start: 'top 60%',
        once: true,
        onEnter: animateText
    });

    ScrollTrigger.create({
        trigger:'.contact-flex',
        start:'top 10%',
        once:true,
        onEnter: ()=> $('.contact-flex').addClass('active')
    })
    ScrollTrigger.create({
        trigger: '.some-info',
        start: 'top 60%',
        once: true,
        onEnter: opacityImageBackground
    });

    document.querySelector('.mob-anch-us').addEventListener('click',()=>{
        document.querySelector('.mobile-navigation').classList.remove('active')
        document.querySelector('.section-services').scrollIntoView({behavior:'smooth'})
    })
    document.querySelector('.mob-anch-on').addEventListener('click',()=>{
        document.querySelector('.mobile-navigation').classList.remove('active')
        document.querySelector('.aboutus').scrollIntoView({behavior:'smooth'})
    })
    document.querySelector('.mob-anch-ga').addEventListener('click',()=>{
        document.querySelector('.mobile-navigation').classList.remove('active')
        document.querySelector('.galery').scrollIntoView({behavior:'smooth'})
    })
    document.querySelector('.mob-anch-ko').addEventListener('click',()=>{
        document.querySelector('.mobile-navigation').classList.remove('active')
        document.querySelector('.contact').scrollIntoView({behavior:'smooth'})
    })

    // kod do aktywnej animacji nawigacji podczas scrollowania

    const navTop = document.querySelector('.nav-top');
    const navNav = document.querySelector('.nav-nav');
    
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScroll > lastScrollTop) {
            // Scrolling down
            navTop.classList.add('active');
            navNav.classList.add('active');
        } else {
            // Scrolling up
            navTop.classList.remove('active');
            navNav.classList.remove('active');
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
    });
});
