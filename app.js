// Cihazın toxunma dəstəyi olub olmadığını yoxla

function isTouchDevice() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }
  
  // Səhifənin daşmasını (scroll) bloklamaq

  function preventScroll() {
    document.body.style.overflow = "hidden";
    document.addEventListener(
      "touchmove",
      function (e) {
        e.preventDefault();
      },
      { passive: false }
    );
  }
  
  // Dairə yaratmaq funksiyası

  function createCircle(x, y) {
    const circle = document.createElement("div");
    circle.classList.add("circle");
  
    // Dairənin ölçüsünü və rəngini təsadüfi təyin et

    const size = Math.random() * 50 + 10;
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  
    // Stil təyin et

    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.backgroundColor = color;
    circle.style.left = `${x - size / 2}px`;
    circle.style.top = `${y - size / 2}px`;
  
    // Containerə dairəni əlavə et
    
    document.querySelector(".container").appendChild(circle);
  
    // Dairənin hərəkəti

    const angle = Math.random() * 2 * Math.PI;
    const velocity = Math.random() * 2 + 1;
    let dx = Math.cos(angle) * velocity;
    let dy = Math.sin(angle) * velocity;
  
    // Dairənin mövqeyini hər 20ms yenilə

    const interval = setInterval(() => {
      const currentX = parseFloat(circle.style.left);
      const currentY = parseFloat(circle.style.top);
      circle.style.left = `${currentX + dx}px`;
      circle.style.top = `${currentY + dy}px`;
    }, 20);
  
    // 4 saniyə sonra dairəni sil

    setTimeout(() => {
      clearInterval(interval);
      circle.remove();
    }, 4000);
  }
  
  // Maus hərəkəti və klik hadisələrini idarə edən funksiya

  function updateEventListeners() {
    const container = document.querySelector(".container");
  
    // Mövcud event listener-ləri təmizlə

    container.replaceWith(container.cloneNode(true));
  
    // Ekran ölçüsünə əsasən hadisəni yenidən təyin et

    if (isTouchDevice() || window.innerWidth <= 768) {
      document.addEventListener("click", function (e) {
        createCircle(e.clientX, e.clientY);
      });
    } else {
      document.addEventListener("mousemove", function (e) {
        createCircle(e.clientX, e.clientY);
      });
    }
  }
  
  // Ekran ölçüsünə əsasən h1 başlığının mətnini dəyiş

  function updateHeading() {
    const h1 = document.querySelector("h1");
    if (window.innerWidth <= 480) {
      h1.textContent = "Ekrana kliklə...";
    } else if (window.innerWidth <= 768) {
      h1.textContent = "Sadəcə klik et...";
    } else {
      h1.textContent = "Sadəcə mausu hərəkət etdir...";
    }
  }
  
  // Səhifə yükləndikdə və ekran ölçüsü dəyişdikdə funksiyaları yenilə

  window.addEventListener("resize", () => {
    updateHeading();
    updateEventListeners();
  });
  
  // İlk yükləmədə funksiyaları çağır
  
  updateHeading();
  updateEventListeners();
  