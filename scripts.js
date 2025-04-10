document.addEventListener('DOMContentLoaded', () => {
  // Function to convert Arabic numerals to Persian numerals
  function toPersianNumber(num) {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().split('').map(digit => persianDigits[digit]).join('');
  }

  // Tooltip functionality
  const tooltipTriggers = document.querySelectorAll('.tooltip-trigger');
  tooltipTriggers.forEach(trigger => {
    let timeoutId = null;

    trigger.addEventListener('click', (e) => {
      if (trigger.querySelector('.tooltip')) return;

      const tooltip = document.createElement('div');
      tooltip.classList.add('tooltip');
      tooltip.textContent = trigger.getAttribute('data-tooltip');
      trigger.appendChild(tooltip);

      tooltip.offsetWidth;
      tooltip.classList.add('active');

      timeoutId = setTimeout(() => {
        tooltip.classList.remove('active');
        setTimeout(() => tooltip.remove(), 300);
        timeoutId = null;
      }, 3000);

      e.stopPropagation();
    });

    document.addEventListener('click', (e) => {
      if (!trigger.contains(e.target)) {
        const tooltip = trigger.querySelector('.tooltip');
        if (tooltip) {
          tooltip.classList.remove('active');
          setTimeout(() => tooltip.remove(), 300);
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
        }
      }
    });
  });

  // Pagination functionality
  const cards = document.querySelectorAll('.news-card');
  const cardsPerPage = 10;
  const totalPages = Math.ceil(cards.length / cardsPerPage);
  const pagination = document.querySelector('.pagination');
  let currentPage = 1;

  function showPage(page) {
    console.log(`Showing page ${page}`);
    cards.forEach((card, index) => {
      const start = (page - 1) * cardsPerPage;
      const end = page * cardsPerPage;
      if (index >= start && index < end) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    const links = pagination.querySelectorAll('a');
    links.forEach(link => {
      link.classList.remove('active');
      if (parseInt(link.getAttribute('data-page')) === page) {
        link.classList.add('active');
      }
    });
  }

  // Generate pagination links with Persian numbers
  for (let i = 1; i <= totalPages; i++) {
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = toPersianNumber(i); // Convert to Persian number
    link.setAttribute('data-page', i); // Store page number for reference
    link.addEventListener('click', (e) => {
      e.preventDefault();
      currentPage = parseInt(link.getAttribute('data-page'));
      showPage(currentPage);
    });
    pagination.appendChild(link);
  }

  showPage(currentPage);
});