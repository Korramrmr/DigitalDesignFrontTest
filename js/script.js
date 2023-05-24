document.addEventListener('DOMContentLoaded', () => {
// дата
function getDayInfo(cardDate) {
  const date = new Date(...cardDate.split('.').reverse());

  const weekdayOptions = { weekday: 'long' };
  const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const weekNumber = Math.ceil((date.getDate() + firstDayOfMonth.getDay()) / 7);

  const weekdayFormatter = new Intl.DateTimeFormat('ru-RU', weekdayOptions);
  const weekdays = Array.from({ length: 7 }, (_, i) => {
    const currentDate = new Date(date.getFullYear(), date.getMonth(), i + 1);
    return weekdayFormatter.format(currentDate).replace(/^\w/, (c) => c.toUpperCase());
  });

  const formattedDate = `${weekdays[date.getDay()]}, ${weekNumber} неделя ${months[date.getMonth()]} ${date.getFullYear()} года`;

  return formattedDate;
}

// создание карточки товара
function createCard(imageSrc, caption, date) {
  let card = document.createElement('div');
  card.className = 'card';
  
  let image = document.createElement('img');
  image.src = imageSrc;
  card.appendChild(image);
  
  let title = document.createElement('h3');
  title.textContent = caption;
  card.appendChild(title);
  
  let dateInfo = document.createElement('p');
  dateInfo.className = 'date-info';
  dateInfo.textContent = getDayInfo(date);
  card.appendChild(dateInfo);
  
  let buyButton = document.createElement('a');
  buyButton.className = 'buy-btn';
  buyButton.href = '#';
  buyButton.textContent = 'Купить';
  card.appendChild(buyButton);

  card.addEventListener('mouseenter', () => {
    image.src = imageSrc.replace('.png', '_hover.png');  
  });

  card.addEventListener('mouseleave', () => {
    image.src = imageSrc;
  });
  
  return card;
}

// добавление карточки товара в категорию
const cardContainers = [
  document.querySelector('#rings .card-container'),
  document.querySelector('#pendants .card-container'),
  document.querySelector('#earrings .card-container'),
  document.querySelector('#bracelets .card-container'),
];

const cards = [
  [
    { imageSrc: 'img/rings/ring1.png', caption: 'Кольцо Сердце', date: '15.12.2023' },
    { imageSrc: 'img/rings/ring2.png', caption: 'Кольцо Узор', date: '19.03.2023' },
    { imageSrc: 'img/rings/ring3.png', caption: 'Кольцо Проволока', date: '22.04.2023' },
    { imageSrc: 'img/rings/ring4.png', caption: 'Кольцо Ромб', date: '11.06.2023' },
    { imageSrc: 'img/rings/ring5.png', caption: 'Кольцо с ониксом', date: '22.07.2023' },
    { imageSrc: 'img/rings/ring6.png', caption: 'Кольцо широкое', date: '07.09.2023' },
    { imageSrc: 'img/rings/ring7.png', caption: 'Кольцо Цепь', date: '05.05.2023' },
    { imageSrc: 'img/rings/ring8.png', caption: 'Кольцо Крест', date: '.04.2023' },
  ],
  [
    { imageSrc: 'img/pendants/pend1.png', caption: 'Подвеска с кварцем', date: '03.06.2023' },
    { imageSrc: 'img/pendants/pend2.png', caption: 'Колье с ониксом', date: '12.08.2023' },
    { imageSrc: 'img/pendants/pend3.png', caption: 'Подвеска Сердце', date: '11.01.2023' },
    { imageSrc: 'img/pendants/pend4.png', caption: 'Цепь панцирь', date: '22.05.2023' },
  ],
  [
    { imageSrc: 'img/earrings/ear2.png', caption: 'Серьги-протяжки', date: '22.12.2023' },
    { imageSrc: 'img/earrings/ear3.png', caption: 'Серьги с танзанитом', date: '01.12.2023' },
    { imageSrc: 'img/earrings/ear1.png', caption: 'Пусеты с ониксом', date: '22.11.2023' },
    { imageSrc: 'img/earrings/ear4.png', caption: 'Серьга на цепочке', date: '04.04.2023' },
    { imageSrc: 'img/earrings/ear5.png', caption: 'Моносерьга', date: '06.02.2023' },
    { imageSrc: 'img/earrings/ear6.png', caption: 'Асимметричные пусеты', date: '15.11.2023' },
  ],
  [
    { imageSrc: 'img/bracelets/brace1.png', caption: 'Цепь плетения Якорь', date: '22.10.2023' },
    { imageSrc: 'img/bracelets/brace2.png', caption: 'Браслет позолота', date: '22.09.2023' },
    { imageSrc: 'img/bracelets/brace3.png', caption: 'Незамкнутый браслет', date: '22.07.2023' },
  ],
];

for (let i = 0; i < cardContainers.length; i++) {
  const cardContainer = cardContainers[i];
  const currentCards = cards[i];

  currentCards.forEach((card) => {
    const { imageSrc, caption, date } = card;
    const createdCard = createCard(imageSrc, caption, date);
    cardContainer.appendChild(createdCard);
  });
}

// модальное окно
const modal = document.getElementById('modal');
const purchaseForm = document.getElementById('purchase-form');
const closeIcon = document.querySelector('.close');

function openModal(productTitle) {
  const modal = document.getElementById('modal');
  const modalContent = document.querySelector('.modal-content');
  const titleElement = modalContent.querySelector('.modal-product-title');
  titleElement.textContent = productTitle;
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

function handleKeyPress(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

closeIcon.addEventListener('click', closeModal);
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});
window.addEventListener('keydown', handleKeyPress);

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

purchaseForm.addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Поздравляем! Покупка выполнена успешно!');
  closeModal();
});

const buyButtons = document.getElementsByClassName('buy-btn');
for (let i = 0; i < buyButtons.length; i++) {
  buyButtons[i].addEventListener('click', (event) => {
    event.preventDefault(); 
    const productTitle = event.target.parentNode.querySelector('h3').textContent;
    openModal(productTitle);
  });
}
});

// скролл, бургер меню
function smoothScroll(event) {
  event.preventDefault();
  const targetId = this.getAttribute('href');
  const targetElement = document.querySelector(targetId);
  targetElement.scrollIntoView({ behavior: 'smooth' });
}

document.querySelectorAll('.menu__link').forEach((link) => {
  link.addEventListener('click', smoothScroll);
});

document.querySelectorAll('.footer__menu-link').forEach((link) => {
  link.addEventListener('click', smoothScroll);
});

const burgerMenu = document.querySelector('.burger-menu');
const menu = document.querySelector('.menu');
const toggleBlock = document.querySelector('.toggle');

burgerMenu.addEventListener('click', function() {
  this.classList.toggle('menu-open');
  menu.classList.toggle('menu-open');

  if (this.classList.contains('menu-open')) {
    toggleBlock.style.display = 'none';
  } else {
    toggleBlock.style.display = 'block';
  }
}); 

window.addEventListener('scroll', () => {
  const scrollBtn = document.querySelector('.scroll-to-top-btn');
  const scrollTrigger = 400; 

  if (window.scrollY > scrollTrigger) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
});

// смена темы
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const modalContent = document.getElementById('modal-content');
const headerTheme = document.getElementById('header');
const footerTheme = document.getElementById('footer');
const mainLink = document.getElementById('main__link');

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  modalContent.classList.toggle('dark-mode');
  headerTheme.classList.toggle('dark-mode');
  footerTheme.classList.toggle('dark-mode');
  mainLink.classList.toggle('dark-mode');
});




