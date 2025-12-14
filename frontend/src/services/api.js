import { getToken } from './auth';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8080';

const getCommonHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  
  // Only add Authorization header if token exists
  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

export async function getRequest(urlPath) {
  try {
    const url = `${API_BASE}${urlPath}`;
    const response = await fetch(url, { method: 'GET', headers: getCommonHeaders() });
    if(!response.ok){
      throw new Error('Failed to fetch resource for url: '+url);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('GET request failed error: ', error);
    return null;
  }
}
export async function postRequest(urlPath,payload) {
  const url = `${API_BASE}${urlPath}`;
  try {
    const response = await fetch(url, { method: 'POST', headers: getCommonHeaders(), body: JSON.stringify(payload) });
    if(!response.ok){
      throw new Error('Failed to add resource for url: '+url);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('POST request failed error: ', error);
    return null;
  }
}
export async function putRequest(urlPath,payload) {
  const url = `${API_BASE}${urlPath}`;
  try {
    const response = await fetch(url, { method: 'PUT', headers: getCommonHeaders(), body: JSON.stringify(payload) });
    if(!response.ok){
      throw new Error('Failed to update resource for url: '+url);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('PUT request failed error: ', error);
    return null;
  }
}
export async function patchRequest(urlPath,payload) {
  const url = `${API_BASE}${urlPath}`;
  try {
    const response = await fetch(url, { method: 'PATCH', headers: getCommonHeaders(), body: JSON.stringify(payload) });
    if(!response.ok){
      throw new Error('Failed to update resource for url: '+url);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('PATCH request failed error: ', error);
    return null;
  }
}
export async function deleteRequest(urlPath) {
  const url = `${API_BASE}${urlPath}`;
  try {
    const response = await fetch(url, { method: 'DELETE', headers: getCommonHeaders() });
    if(!response.ok){
      throw new Error('Failed to delete resource for url: '+url);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('DELETE request failed error: ', error);
    return null;
  }
}