import cardTemplate from '../hbsTemplates/card.hbs';
import ApiService from './apiService';
import Button from './button';
import refs from './refs';

const apiService = new ApiService();

const searchBtn = new Button({
    selector: '.searchBtn',
    label: 'Search',
    labelOnStateChange: 'Searching....'
});

let observer = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log("entry ", entry.target);
            observer.unobserve(entry.target);
            fetchResults();
            return;
        }
    })
}, {
    threshold: 1
});

function isEmptyString(inp) {
    console.log(inp);
    let res = (!inp ||
        inp.match(/\s+/) &&
        !inp.match(/\s+\w+/)) ?
        true : false;
    console.log(res);
    return res;
};

function renderMarkup(template, data) {
    const markup = template(data);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function clear(element) {
    element.innerHTML = "";
    if (element.value) {
        element.value = "";
    };
};


function scrollDown(amount) {
    if (amount > refs.gallery.childElementCount
        && refs.gallery.childElementCount !== 0) {
        console.log("object ", document.querySelector('li:last-child'));
        observer.observe(document.querySelector('li:last-child'));
    } else {
        observer.unobserve(document.querySelector('li:last-child'));
        return;
    };
}

function fetchResults() {

    apiService.fetchForQuery().then(data => {
        renderMarkup(cardTemplate, data.hits);
        scrollDown(data.totalHits);
    })
        .catch(error => console.log("ERROR " + error));
};

function search(e) {

    e.preventDefault()
    searchBtn.disable();
    const input = e.currentTarget.elements.query;
    clear(refs.gallery);
    observer.disconnect(refs.gallery);

    if (isEmptyString(input.value)) {
        clear(input);
        searchBtn.enable();
        return;
    };

    apiService.query = input.value;
    clear(input);

    fetchResults();
    searchBtn.enable();
};

searchBtn.enable();

refs.searchForm.addEventListener('submit', search);

















