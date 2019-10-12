export default class Dataworker {

  api(path, method = 'GET', body = null) {
      const url = 'http://localhost:5000/api' + path;
    
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      };
  
      if (body !== null) {
        options.body = JSON.stringify(body);
      }
  
      return fetch(url, options);
    }

    // Get all courses
    async getCourses() {
        const response = await this.api(`/courses`, 'GET');

        if (response.status === 200) {
          return response.json().then(data => data);
        }
        else if (response.status === 401) {
          return null;
        }
        else {
          throw new Error();
        }
    }

    // Get a specific course
    async getCourse(id) {
      const response = await this.api(`/courses/${id}`, 'GET');

      if (response.status === 200) {
        return response.json().then(data => data);
      }
      else if (response.status === 401) {
        return null;
      }
      else {
        throw new Error();
      }
  }
}