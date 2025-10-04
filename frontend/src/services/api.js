

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8080';

const commonHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

export async function getRequest(urlPath) {
  try {
    const url = `${API_BASE}${urlPath}`;
    const response = await fetch(url,{method:'GET',headers:commonHeaders});
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
    const response = await fetch(url,{method:'POST',headers:commonHeaders , body: JSON.stringify(payload)});
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
    const response = await fetch(url,{method:'PUT',headers:commonHeaders , body: JSON.stringify(payload)});
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
    const response = await fetch(url,{method:'PATCH',headers:commonHeaders ,body: JSON.stringify(payload)});
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
    const response = await fetch(url,{method:'DELETE',headers:commonHeaders});
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