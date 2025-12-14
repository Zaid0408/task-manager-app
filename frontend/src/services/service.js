import { getRequest, postRequest, putRequest, patchRequest, deleteRequest } from './api'

// Project APIs
export async function getProjects() {
  const result = await getRequest('/projects/get_projects');
  return result;
}

export async function createProject(projectPayload) {
  const result = await postRequest('/projects/add_project',projectPayload);
  return result;
}

export async function getProjectById(projectId) {
  const result = await getRequest(`/projects/get_project_by_id/${projectId}`);
  return result;
}

export async function updateProject(projectId,projectPayload) {
    const result = await putRequest(`/projects/update_project/${projectId}`,projectPayload);
    return result;
}

export async function deleteProject(projectId) {
    const result = await deleteRequest(`/projects/delete_project/${projectId}`);
    return result;
}

// Task apis : 

export async function getTasks() {
    const result = await getRequest('/tasks/get_tasks');
    return result;
}

export async function getTaskById(taskId) {
    const result = await getRequest(`/tasks/get_task_by_id/${taskId}`);
    return result;
}

export async function getTasksByProjectId(projectId) {
    const result = await getRequest(`/tasks/get_task_by_project_id/${projectId}`);
    return result;
}

export async function createTask(taskPayload) {
    const result = await postRequest('/tasks/add_tasks',taskPayload);
    return result;
}

export async function updateTask(taskId, taskPayload) {
    const result = await putRequest(`/tasks/update_task/${taskId}`,taskPayload);
    return result;
}

export async function updateTaskStatus(taskId, taskPayload) {
    const result = await patchRequest(`/tasks/update_task_status/${taskId}`,taskPayload);
    return result;
}

export async function deleteTask(taskId) {
    const result = await deleteRequest(`/tasks/delete_task/${taskId}`);
    return result;
}

export async function addComment(taskId,commentPayload) {
    const result = await postRequest(`/tasks/add_comment/${taskId}`,commentPayload);
    return result;
}
