import axios, { AxiosInstance } from 'axios'

// to start json server run command below
// json-server --watch data/db.json --port 8000
class Http {
	instance: AxiosInstance

	constructor() {
		this.instance = axios.create({
			baseURL: 'http://localhost:8000',
			timeout: 3000,
			headers: {
				'Content-Type': 'application/json',
			},
		})
	}
}

const http = new Http().instance

export default http
