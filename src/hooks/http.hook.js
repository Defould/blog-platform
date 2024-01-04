export const useHttp = () => {
  const request = async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {
    const response = await fetch(url, { method, body, headers });

    if (!response.ok) {
      const rb = response.body;
      const reader = rb.getReader();

      const stream = await new ReadableStream({
        start(controller) {
          function push() {
            reader.read().then(({ done, value }) => {
              if (done) {
                controller.close();
                return;
              }
              controller.enqueue(value);
              push();
            });
          }

          push();
        },
      });

      const res = await new Response(stream, { headers: { 'Content-Type': 'text/html' } }).text();

      throw new Error(res);
    }

    const data = response.ok ? await response.json() : null;
    return data;
  };

  return { request };
};
