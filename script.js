// Demo data for upcoming and past shows
const upcoming = [
  {
    date: "08/07/26",
    band: "Outside Lands",
    venue: "Golden Gate Park",

  },
  {
    date: "05/30/26",
    band: "Pitbull",
    venue: "Hollywood Bowl",
    
  },
  {
    date: "04/06/25",
    band: "FKA Twigs",
    venue: "The Greek Theatre",
   
  }
];

const past = [
  {
    date: "03/07/26",
    band: "Aimee Mann",
    venue: "The United Theater on Broadway",

  },
  {
    date: "02/17/26",
    band: "JJerome87",
    venue: "Sid The Cat Auditorium",
    
  },
  {
    date: "12/12/25",
    band: "AG Cook",
    venue: "Hollywood Palladium",
   
  },
  {
    date: "10/09/25",
    band: "Haim",
    venue: "Kia Forum",
   
  },
  {
    date: "10/18/25",
    band: "Lorde",
    venue: "Kia Forum",
   
  }
];

function daysUntil(dateStr) {
  // dateStr: MM/DD/YY
  const [mm, dd, yy] = dateStr.split('/');
  const eventDate = new Date(`20${yy}-${mm}-${dd}T00:00:00`);
  const now = new Date();
  // Zero out time for today
  now.setHours(0,0,0,0);
  const diff = Math.round((eventDate - now) / (1000 * 60 * 60 * 24));
  return diff;
}

function createBlock(row, idx, type) {
  const block = document.createElement('div');
  block.className = 'block';
  block.tabIndex = 0;
  block.setAttribute('data-idx', idx);
  block.setAttribute('data-type', type);

  // Date bubble
  const dateDiv = document.createElement('div');
  dateDiv.className = 'days';
  // Helper to format date as MM/DD/YY
  function formatDate2Digit(dateStr) {
    const [mm, dd, yy] = dateStr.split('/');
    return `${mm}/${dd}/${yy.length === 2 ? yy : yy.slice(-2)}`;
  }
  if (type === 'upcoming') {
    const days = daysUntil(row.date);
    if (days === 0) {
      dateDiv.textContent = 'TODAY';
    } else if (days === 1) {
      dateDiv.innerHTML = `<span class="days-num">1</span><span class="days-label">DAYS</span>`;
    } else if (days > 1) {
      dateDiv.innerHTML = `<span class="days-num">${days}</span><span class="days-label">DAYS</span>`;
    } else {
      dateDiv.textContent = formatDate2Digit(row.date);
    }
  } else {
    dateDiv.innerHTML = `<span class="past-date-label">${formatDate2Digit(row.date)}</span>`;
  }
  block.appendChild(dateDiv);

  // Band name
  const bandDiv = document.createElement('div');
  bandDiv.className = 'band';
  bandDiv.textContent = row.band;
  block.appendChild(bandDiv);

  // Venue
  const venueDiv = document.createElement('div');
  venueDiv.className = 'venue';
  venueDiv.textContent = row.venue;
  block.appendChild(venueDiv);


  return block;
}


function parseDate(dateStr) {
  // MM/DD/YY to Date
  const [mm, dd, yy] = dateStr.split('/');
  return new Date(`20${yy}-${mm}-${dd}T00:00:00`);
}

function renderList() {
  const upcomingBlocks = document.getElementById('upcoming-list');
  const pastBlocks = document.getElementById('past-list');
  upcomingBlocks.innerHTML = '';
  pastBlocks.innerHTML = '';
  // Sort upcoming by soonest date
  const sortedUpcoming = [...upcoming].sort((a, b) => parseDate(a.date) - parseDate(b.date));
  // Sort past by most recent date
  const sortedPast = [...past].sort((a, b) => parseDate(b.date) - parseDate(a.date));
  sortedUpcoming.forEach((row, idx) => {
    upcomingBlocks.appendChild(createBlock(row, idx, 'upcoming'));
  });
  sortedPast.forEach((row, idx) => {
    pastBlocks.appendChild(createBlock(row, idx, 'past'));
  });
}

// Add block button logic
window.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('add-block-btn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      window.location.href = 'star.html';
    });
  }
});


document.addEventListener('DOMContentLoaded', () => {
  // Check for new show in localStorage
  const newShowStr = localStorage.getItem('newShow');
  if (newShowStr) {
    try {
      const newShow = JSON.parse(newShowStr);
      if (newShow && newShow.band && newShow.venue && newShow.date) {
        // Determine if upcoming or past
        const showDate = parseDate(newShow.date);
        const now = new Date();
        now.setHours(0,0,0,0);
        if (showDate >= now) {
          upcoming.push(newShow);
        } else {
          past.push(newShow);
        }
      }
    } catch (e) {}
    localStorage.removeItem('newShow');
  }
  renderList();
});
