document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const captionText = document.getElementById("caption");
    const imageCounter = document.getElementById("imageCounter");
    const projectLinks = document.querySelectorAll(".project-link");
    const closeBtn = document.getElementsByClassName("close")[0];
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    let galleryImages = [];
    let currentImageIndex = 0;

    // Function to update the image, counter, and navigation visibility
    function showImage(index) {
        if (galleryImages.length === 0) return;
        
        currentImageIndex = index;
        
        // Handle wrap-around navigation (going from 1st to last, or last to 1st)
        if (currentImageIndex < 0) {
            currentImageIndex = galleryImages.length - 1;
        } else if (currentImageIndex >= galleryImages.length) {
            currentImageIndex = 0;
        }

        modalImg.src = galleryImages[currentImageIndex];
        
        // Update Counter: displays (1 / 5)
        imageCounter.innerHTML = `Screenshot ${currentImageIndex + 1} of ${galleryImages.length}`;
        
        // Show navigation only if there is more than 1 image
        const navVisible = galleryImages.length > 1 ? 'block' : 'none';
        prevBtn.style.display = navVisible;
        nextBtn.style.display = navVisible;
        
        // Add a class for transition effect (optional)
        modalImg.classList.remove('fade-in');
        // A small timeout ensures the browser resets the class before reapplying
        setTimeout(() => {
            modalImg.classList.add('fade-in');
        }, 10);
    }

    // Event listener for opening the modal (clicking on a project card)
    projectLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); 
            
            // The data-gallery-images attribute holds comma-separated paths
            const imageString = this.getAttribute('data-gallery-images');
            const caption = this.getAttribute('data-caption');

            if (imageString) {
                // Parse the comma-separated string into an array
                galleryImages = imageString.split(',');
                
                // Set the project title/caption
                captionText.innerHTML = caption;
                
                // Show the first image (index 0)
                showImage(0);

                modal.style.display = "block";
            }
        });
    });

    // Event listeners for navigation buttons
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent modal from triggering the close function
        showImage(currentImageIndex - 1);
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent modal from triggering the close function
        showImage(currentImageIndex + 1);
    });

    // Close Modal listeners
    closeBtn.onclick = function() { 
      modal.style.display = "none";
    }

    // Close modal if user clicks outside of the image/navigation
    modal.onclick = function(event) {
        if (event.target === modal || event.target === closeBtn) {
            modal.style.display = "none";
        }
    }
});