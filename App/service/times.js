export default {
  format(dateUtcString) {
    const fullDate = new Date(dateUtcString);
    const offset = fullDate.getTimezoneOffset();
    const localOffset = fullDate.getTime() - (offset * 60000);
    const localDate = new Date(localOffset);
    return localDate.toLocaleString();
  },
  addDays(dateString, days) {
    const date = new Date(dateString);
    const dateTime = date.getTime();
    const endTime = dateTime + (days * 24/* h */ * 60/* m */ * 60/* s */ * 1000/* ms */);
    return new Date(endTime);
  },
  endAdDate(createdOn) {
    return this.addDays(createdOn, 5);
  },
};
