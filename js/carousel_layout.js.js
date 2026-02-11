document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.getElementById('homepageCarousel');
  const captions = document.querySelectorAll('.carousel-caption-below');
  
  // Initialize: Show the first caption
  captions[0].style.display = 'block';
  
  // Update caption when slide changes
  carousel.addEventListener('slid.bs.carousel', function(event) {
    // Hide all captions
    captions.forEach(caption => {
      caption.style.display = 'none';
    });
    
    // Show the current caption
    const activeIndex = event.to;
    captions[activeIndex].style.display = 'block';
  });
  
  // Calculate the maximum height needed for captions
  let maxHeight = 0;
  captions.forEach(caption => {
    // Temporarily make the caption visible to measure its height
    const originalDisplay = caption.style.display;
    caption.style.display = 'block';
    
    const height = caption.offsetHeight;
    if (height > maxHeight) {
      maxHeight = height;
    }
    
    // Restore original display state
    caption.style.display = originalDisplay;
  });
  
  // Set minimum height for caption container (add padding)
  const captionContainer = document.querySelector('.caption-container');
  const padding = parseInt(window.getComputedStyle(captionContainer).padding) * 2.1;
  captionContainer.style.minHeight = (maxHeight + padding) + 'px';
});
