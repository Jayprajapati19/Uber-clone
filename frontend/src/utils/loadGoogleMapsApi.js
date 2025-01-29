export const loadGoogleMapsApi = (apiKey) => {
  return new Promise((resolve, reject) => {
    if (
      typeof window.google === "object" &&
      typeof window.google.maps === "object"
    ) {
      resolve(window.google.maps);
      return;
    }

    const existingScript = document.querySelector(
      `script[src="https://maps.gomaps.pro/maps/api/js?key=${
        import.meta.env.VITE_GOOGLE_MAPS_API
      }"]`
    );
    if (existingScript) {
      existingScript.onload = () => resolve(window.google.maps);
      existingScript.onerror = (error) => reject(error);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.gomaps.pro/maps/api/js?key=${
      import.meta.env.VITE_GOOGLE_MAPS_API
    }`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google.maps);
    script.onerror = (error) => reject(error);

    document.head.appendChild(script);
  });
};
