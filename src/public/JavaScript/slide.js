window.addEventListener('load', function(){
    new Glider(document.querySelector('.glider'), {
        slidesToShow: 1,
        dots: '.dots',
        draggable: true,
        arrows: {
          prev: '.glider-prev',
          next: '.glider-next'
        }
      });
    
      new Glider(document.querySelector('.glider2'), {
        slidesToShow: 2,
        slidesToScroll: 2,
        draggable: true,
        dots: '.dots2',
        arrows: {
          prev: '.glider-prev2',
          next: '.glider-next2'
        }
      });
});