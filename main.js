fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max&timezone=Europe%2FMoscow&forecast_days=14')
  .then(response => response.json())
  .then(data => {
    const formattedDate = data.daily.time.map(el => {
      const date = new Date(el);
      const mounth = date.getMonth() + 1;
      const day = date.getDate().toString().padStart(2, 0);
      return `${day}.${mounth}`;
    });
    let temperature = data.daily.temperature_2m_max.map(el => {
      return el > 0 ? `+${el.toFixed()}` : `${el.toFixed()}`;
    });
    addingDataTable(formattedDate, temperature);
  });
  
function addingDataTable(date, temp) {
  const td = document.querySelectorAll('td:first-child');
  const td2 = document.querySelectorAll('td:nth-child(2)');
  const td3 = document.querySelectorAll('td:last-child');

  for (let i = 0; i < td.length; i++) {
    td[i].textContent = date[i];
    td2[i].textContent = daysOfWeek()[i];
    td3[i].textContent = temp[i];

    if (daysOfWeek()[i] === 'СБ') {
      td2[i].style.color = '#eba5a5'
    } else if (daysOfWeek()[i] === 'ВС') {
      td2[i].style.color = '#eba5a5'
    }
  } 
}

function daysOfWeek() {
  const day = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
  const currentDay = new Date().getDay();
  let count = 0;
  let arr = [];

  for (let i = currentDay; i < 11; i++) {
    arr.push(day[i]);
    if (count++ === 11) break;
    if (i === day.length - 1) {
      i = -1;
    }
  }
  return arr;
}