document.addEventListener("DOMContentLoaded", function() {
    const icons = document.querySelectorAll('.nav-iconn');
    const texts = document.querySelectorAll('.nav-infoo');

    const navClose=document.querySelector('.nav-close-icon')
    const navNavi=document.querySelector('.nav-navigation-icon')
    const navNaviMob=document.querySelector('.nav-navigation-icon.nav-nav-mobb')
    let activeIndex = null;

    icons.forEach((icon, index) => {
        icon.addEventListener('click', () => {
            // Check if the clicked icon is the same as the currently active one
            if (activeIndex === index) {
                texts[index].classList.toggle('active');
                icons[index].classList.toggle('active');
                if (!texts[index].classList.contains('active')) {
                    activeIndex = null; // Reset activeIndex if class is removed
                }
            } else {
                // Remove 'active' class from all text elements
                texts.forEach(text => text.classList.remove('active'));
                icons.forEach(icon => icon.classList.remove('active'));
                // Add 'active' class to the corresponding text element and icon
                texts[index].classList.add('active');
                icons[index].classList.add('active');
                activeIndex = index; // Update activeIndex
            }
        });
    });

    navClose.addEventListener('click',()=>{
        document.querySelector('.mobile-navigation').classList.remove('active')
    })
    navNavi.addEventListener('click',()=>{
        document.querySelector('.mobile-navigation').classList.add('active')
    })
    navNaviMob.addEventListener('click',()=>{
        document.querySelector('.mobile-navigation').classList.add('active')
    })

    var swiper = new Swiper(".mySwiper", {
        pagination: {
          el: ".swiper-pagination",
        },
      });

});