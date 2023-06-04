class API {
    API_PROTOCOL = "http";
    API_DOMAIN = "3.104.17.38";
    API_PORT = 8000;

    get API_BASE_URL() {
        return `${this.API_PROTOCOL}://${this.API_DOMAIN}${this.API_PORT ? ':' + this.API_PORT : ""}`;
    }

    get = async (url) => {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await response.json();
    }

    post = async (url, body) => {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        });
        return await response.json();
    }

    put = async (url, body) => {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        });
        return await response.json();
    }

    delete = async (url) => {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await response;
    }
}

class PATH {
    constructor(string) {
        this.value = string;
    }

    get REVIEWS() { return new PATH(this.value + "/reviews") }
    get TAGS() { return new PATH(this.value + "/tags") }

    get url() { return this.value + '/'; }

    of = (string) => { return new PATH(this.value + '/' + string) }
}

const api = new API;
const path = new PATH(api.API_BASE_URL);

export { api, path };
