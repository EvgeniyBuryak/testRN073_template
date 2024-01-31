const getHours = () => new Date().getHours();

const getTimesOfDay = () => {
    const hour = getHours();
    // night, morning, afternoon, evening
    if(0 <= hour && 6 >= hour) {
        return "Доброй ночи"
    } else if(6 <= hour && 12 >= hour) {
        return "Доброе утро"
    } else if(12 <= hour && 18 >= hour) {
        return "Добрый день"
    } else if(18 <= hour && 24 >= hour) {
        return "Добрый вечер"
    }
};

export { getTimesOfDay, getHours }
