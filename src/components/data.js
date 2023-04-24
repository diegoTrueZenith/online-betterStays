// ============= FETCHING DATA FROM GUESTY ============= //

let data;
async function fetchData() {
  try {
    fetch('https://api-token-diegotruezenith.vercel.app/api/guestyProperties')
    .then(response => response.json())
    .then(response => console.log(response.response.results))
    .then(response => data = response.response.results);

  } catch (error) {
    console.error(error);
  }
}

export async function getData() {
  if (!data) {
    await fetchData();
  }
  return data;
}



// ============= FETCHING CALENDAR FROM GUESTY ============= //

let calendar;
async function fetchCalendar(id) {
  try {
    const response = await fetch('https://api-token-diegotruezenith.vercel.app/api/guestyCalendar',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        propertyID: id,
      })
    });
    calendar = await response.json();
  } catch (error) {
    console.error(error);
  }
}


export async function getCalendar(id) {
  if (!calendar) {
    await fetchCalendar(id);
  }
  return calendar;
}



