const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(
  (entries) => {
    console.log(entries);

    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);

      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 1,
  }
);

const lastCardObserver = new IntersectionObserver((entries) => {
  const lastCard = entries[0];

  if (!lastCard.isIntersecting) {
    return;
  }

  loadNewCards();

  observer.unobserve(lastCard.target);
  lastCardObserver.observe(document.querySelector(".card:last-child"));
}, {});

lastCardObserver.observe(document.querySelector(".card:last-child"));

cards.forEach((card) => observer.observe(card));

const cardContainer = document.querySelector(".card-container");

function loadNewCards() {
  for (let i = 0; i < 10; i++) {
    const card = document.createElement("div");
    card.textContent = "New Card";
    card.classList.add("card");
    observer.observe(card);
    cardContainer.append(card);
  }
}
