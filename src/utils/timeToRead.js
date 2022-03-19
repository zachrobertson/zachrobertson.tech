export function calcNumberOfTimers(timeToRead) {
    let numTimers = 0;
    switch(true) {
        case 0 < timeToRead && timeToRead < 5:
            numTimers = 1;
            break;
        case 5 <= timeToRead && timeToRead < 10:
            numTimers = 2;
            break;
        case 10 <= timeToRead && timeToRead < 15:
            numTimers = 3;
            break;
        case 15 <= timeToRead:
            numTimers = 4;
            break;
        default:
            numTimers = 1;
            break;
    }
    return numTimers;
};