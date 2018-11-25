import 'isomorphic-fetch';

import createRequest from '../utils/request';

export default createRequest(fetch)();
