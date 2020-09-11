
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

export { getTimeFrom };