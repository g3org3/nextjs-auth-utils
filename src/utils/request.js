const _url = require('./url');

export default fetch => (_config = {}, { debug = false } = {}) => {
  const logger = (...args) => {
    if (debug) console.log(...args);
  };
  const config = {
    ..._config,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const _request = async (ctx = {}, method, endpoint, _data) => {
    const fetchConfig = {
      ...config,
      method,
      body: _data ? JSON.stringify(_data) : undefined,
    };
    const url = _url(ctx, endpoint);
    logger(fetchConfig);
    logger(url);
    const res = await fetch(url, fetchConfig);
    logger(res.status);
    if (res.status > 299) {
      let message = '';
      try {
        const response = await res.json();
        message = response.message;
        logger(response);
      } catch (e) {
        message = res.statusText;
        logger(res.statusText);
      }
      throw Error(message);
    }

    const data = await res.json();
    logger(data);
    return data;
  };

  return {
    server: {
      get: (ctx, endpoint) => _request(ctx, 'GET', endpoint),
      post: (ctx, endpoint, data) => _request(ctx, 'POST', endpoint, data),
    },
    get: endpoint => _request({}, 'GET', endpoint),
    post: (endpoint, data) => _request({}, 'POST', endpoint, data),
  };
};
