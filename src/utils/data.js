export const setDrugs = drugs => {
  return localStorage.setItem("drugs", JSON.stringify(drugs));
};

export function getDrugs() {
  return JSON.parse(localStorage.getItem("drugs"));
}

export function removeDrugs() {
  localStorage.removeItem("drugs");
}
