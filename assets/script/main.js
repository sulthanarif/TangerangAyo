const dateElement = document.querySelector('.date p');
const timeElement = document.querySelector('.time p');

function updateDateAndTime() {
    const date = new Date();
  
    // Update date
    const formattedDate = formatDate(date);
    dateElement.textContent = formattedDate;

    // Update time
    const formattedTime = formatTime(date);
    timeElement.textContent = formattedTime;
}

function formatDate(date) {
    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const monthNames = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const month = monthNames[monthIndex];
    const day = String(date.getDate()).padStart(2, '0');
    return `${day} ${month} ${year}`;
}

function formatTime(date) {
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    return `${hour}:${minute} WIB`;
}

updateDateAndTime(); // Call the function to update the date and time initially
setInterval(updateDateAndTime, 1000); // Update the date and time every second

// import docoment by id
 