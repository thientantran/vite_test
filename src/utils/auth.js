export const LocalStorageEventTartget = new EventTarget();
export const saveAccessTokenToLS = (access_token) => {
  localStorage.setItem("access_token", access_token);
};

export const clearLS = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("profile");
  //tao 1 event khi clear LocalStorage,
  const clearLSEvent = new Event("clearLS");
  // xuat ra cai event
  LocalStorageEventTartget.dispatchEvent(clearLSEvent);
};

export const getAccessTokenFromLS = () =>
  localStorage.getItem("access_token") || "";

export const getProfileFromLS = () => {
  const result = localStorage.getItem("profile");
  return result ? JSON.parse(result) : null;
};

export const setProfileToLS = (profile) => {
  localStorage.setItem("profile", JSON.stringify(profile));
};
