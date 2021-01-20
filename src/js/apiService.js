const BASE_URL = 'https://pixabay.com/api/';
const KEY_API = '19762883-8865d0dea9f1f7e21a434f769';

export default class ApiService {
    constructor() {
        this._query = '';
        this._page = 1;
        this._objPerPage = 3;
    }
    fetchForQuery() {
        return fetch(`${BASE_URL}?key=${KEY_API}&q=${this._query}&image_type=photo&page=${this.page}&per_page=${this.objPerPage}`)
            .then(this.status)
            .then(res => res.json())
            .then(data => {
                this.incrementPage();
                console.log(data);
                return data;
            })
    };

    status(response) {
        if (response.ok) {
            return response;
        }
        return response.json().then(res => Promise.reject(res.message));
    };

    incrementPage() {
        this.page += 1;
    };

    resetPage() {
        this.page = 1;
    };

    get query() {
        return this._query;
    };

    set query(newQuery) {
        this._query = newQuery;
    };

    get page() {
        return this._page;
    };

    set page(newPage) {
        this._page = newPage;
    };

    get objPerPage() {
        return this._objPerPage;
    };

    set objPerPage(newAmount) {
        this._objPerPage = newAmount;
    };
}