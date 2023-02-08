export const getEvents = () => {
  return fetch("http://localhost:8000/events", {
    headers: {
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
  }).then((response) => response.json());
};

export const createEvent = (event) => {
  return fetch("http://localhost:8000/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
    body: JSON.stringify(event),
  }).then((res) => res.json());
};

export const getGames = () => {
  return fetch("http://localhost:8000/games", {
    headers: {
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
  }).then((response) => response.json());
};

export const getEventById = (eventId) => {
  return fetch(`http://localhost:8000/events/${eventId}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
  }).then((response) => response.json());
};

export const updateEvent = (event) => {
  return fetch(`http://localhost:8000/events/${event.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
    body: JSON.stringify(event),
  });
};
export const deleteEvent = (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this event?"
  );
  if (!confirmed) return;
  fetch(`http://localhost:8000/events/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
  });
};

export const leaveEvent = (id) => {
  return fetch(`http://localhost:8000/events/${id}/leave`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
  });
};

export const joinEvent = (id) => {
  return fetch(`http://localhost:8000/events/${id}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
    body: JSON.stringify(id),
  }).then((response) => response.json());
};
