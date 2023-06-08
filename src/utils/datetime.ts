export function dateNowUnixTime() {
  const dateNow = new Date();
  return Math.floor(dateNow.getTime() / 1000);
}
export function dateNowToTimestamp() {
  const dateNow = new Date();
  return Math.floor(dateNow.getTime() / 1000);
}