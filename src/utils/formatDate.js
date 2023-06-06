/**
 * Takes in a new Date string and returns formatted string 'MM/DD/YYYY, hh:mm am/pm'
 * @param {String} dateString Date string to be formatted
 * @returns {String} A formatted date string
 */
const formatDate = dateString => {
  const date = new Date(dateString);

  const options = {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: 'true',
  };

  return new Intl.DateTimeFormat('en-us', options).format(date);
};

export default formatDate;
