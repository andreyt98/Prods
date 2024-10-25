import { apiUrl, API_KEY, CACHENAME } from "./api.config";

export const getReviews = async (mediaType, id) => {
  if (!id) throw new Error("id undefined");
  const url = `${apiUrl}${mediaType}/${id}/reviews?api_key=${API_KEY}`;
  const validTime = Date.now() + 2629800000; //1month

  const fetchNormal = async () => {
    try {
      const data = await fetch(url);
      const json = await data.json();

      const responseClone = new Response(JSON.stringify(json), {
        headers: { "Content-Type": "application/json" },
      });

      const cache = await caches.open(CACHENAME);
      await cache.put(`reviews-${id}`, responseClone);
      await cache.put(`reviews-${id}-expiration`, new Response(JSON.stringify({ headers: { "Content-Type": "application/json" }, validTime })));

      return json;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  try {
    const response = await caches.match(`reviews-${id}`);
    const expirationResponse = await caches.match(`reviews-${id}-expiration`);

    if (response) {
      const json = await response.json();
      const expirationDate = await expirationResponse.json();

      if (Date.now() > expirationDate.validTime) {
        const cache = await caches.open(CACHENAME);
        await cache.delete(`reviews-${id}`);
        await cache.delete(`reviews-${id}-expiration`);
        return fetchNormal();
      }
            console.log("desde cache reviews: ", json);

      return json;
    } else {
      return fetchNormal();
    }
  } catch (e) {
    return fetchNormal();
  }
};
