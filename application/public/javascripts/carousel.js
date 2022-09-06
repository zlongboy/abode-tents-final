(function carousel() {
    const carouselSlides = document.querySelectorAll(".carousel-img__container");
    carouselSlides.forEach(function(carouselSlide, index) {
        carouselSlide.style.transform = `translateX(${index*100}%)`;
    });

    const nextSlide = document.querySelector(".carousel__btn--next");
    let currentSlide = 0;

    nextSlide.addEventListener('click', function() {
        if (currentSlide === carouselSlides.length-1) {
            currentSlide = 0;
        }
        else currentSlide++;
        carouselSlides.forEach(function(carouselSlide, index) {
            carouselSlide.style.transform = `translateX(${100*(index - currentSlide)}%)`;
            carouselSlide.style.transition = 'all 1000ms';
        });
    })

    const prevSlide = document.querySelector(".carousel__btn--prev");
    prevSlide.addEventListener('click', function() {
        if (currentSlide === 0) {
            currentSlide = carouselSlides.length - 1;
        }
        else currentSlide--;
        carouselSlides.forEach(function(carouselSlide, index) {
            carouselSlide.style.transform = `translateX(${100*(index - currentSlide)}%)`;
            carouselSlide.style.transition = 'all 1000ms';
        });
    });
})();
