
const getTimeFrom = dt => {
    const date = Date.now();
    const difference = date - dt;

    if(difference < 60000) {
        return `${Math.round(difference/1000)}s`;
    }

    if(difference < 3600000) {
        return `${Math.round(difference/60000)}m`;
    }

    if(difference < 86400000) {
        return `${Math.round(difference/3600000)}h`;
    }

    return `${Math.round(difference/86400000)}d`;
}

const getFormattedDate = dt => {
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const days = ['sun', 'mon', 'tue', 'wed', 'thur', 'fri', 'sat'];
    const date = new Date(dt);
    const day = days[date.getDay()];
    const dte = date.getDate();
    const month = months[date.getMonth()];
    let hour = date.getHours();
    let minutes = date.getMinutes();

    String(hour).length == 1 ? hour = '0' + String(hour) : hour = hour;
    String(minutes).length == 1 ? minutes = '0' + String(minutes) : minutes = minutes;
    
    return `${day} ${dte} ${month}. ${hour}:${minutes}`;
}

export { getTimeFrom, getFormattedDate };