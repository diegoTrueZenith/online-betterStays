// ============= FETCHING DATA FROM GUESTY ============= //

let data;
async function fetchData() {
  try {
    const response = await fetch('http://localhost:3000/api/guestyProperties');
    data = await response.json();
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
    const response = await fetch('http://localhost:3000/api/guestyCalendar',{
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



