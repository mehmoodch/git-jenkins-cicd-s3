// Add the 'loaded' class to the body when the website content is loaded
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loaded');
  });

  let calcScrollValue = () => {
    let scrollProgress = document.getElementById("progress");
    let progressValue = document.getElementById("progress-value");
    let pos = document.documentElement.scrollTop;
    let calcHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);
    if (pos > 100) {
      scrollProgress.style.display = "grid";
    } else {
      scrollProgress.style.display = "none";
    }
    scrollProgress.addEventListener("click", () => {
      document.documentElement.scrollTop = 0;
    });
    scrollProgress.style.background = `conic-gradient(#d0519c ${scrollValue}%, #fff ${scrollValue}%)`;
  };
  window.onscroll = calcScrollValue;
  window.onload = calcScrollValue;
  
  function scrollToContent() {
    // Replace 'yourContentSection' with the ID or class of the section you want to scroll to
    document.querySelector('.button_click').scrollIntoView({
        behavior: 'smooth'
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const workSection = document.querySelector(".section-work-data");
  const workObserver = new IntersectionObserver(
    (entries, observer) => {
      const [entry] = entries;

      // Check if the section is intersecting with the viewport
      if (!entry.isIntersecting) return;

      // Animate number counters
      const counterNum = document.querySelectorAll(".counter-numbers");
      const speed = 200;

      counterNum.forEach((curElem) => {
        const targetNumber = parseInt(curElem.dataset.number);
        let initialNum = 0; // Set initial number to 0

        const updateNumber = () => {
          const incrementNumber = Math.ceil(targetNumber / speed);

          if (initialNum < targetNumber) {
            curElem.innerText = `${Math.min(initialNum + incrementNumber, targetNumber)}+`;
            initialNum += incrementNumber;

            // Continue animation until the target number is reached
            requestAnimationFrame(updateNumber);
          }
        };

        // Start the animation
        updateNumber();
      });

      // Stop observing the section once the animation is triggered
      observer.unobserve(workSection);
    },
    {
      root: null,
      threshold: 0,
    }
  );

  // Start observing the section
  workObserver.observe(workSection);
});
