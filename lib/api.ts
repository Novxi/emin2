
export const apiFetch = async (resource: string | Request, config: RequestInit = {}) => {
  const url = typeof resource === 'string' ? resource : resource.url;
  
  if (url.startsWith('/api/')) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`
      };
    }
  }
  
  return fetch(resource, config);
};
