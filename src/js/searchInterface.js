import cardTemplate from '../hbsTemplates/card.hbs';
import ApiService from './apiService';
import Button from './button';
import refs from './refs';
import * as basicLightbox from 'basiclightbox';

const apiService = new ApiService();
console.log(basicLightbox)
const searchBtn = new Button({
    selector: '.searchBtn',
    label: 'Search',
    labelOnStateChange: 'Searching....'
});

const observer = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log("entry ", entry.target);
            observer.unobserve(entry.target);
            fetchResults();
            return;
        };
    });
}, {
    threshold: 0.01
});

function isEmptyString(inp) {

    return (!inp || inp.match(/\s+/) && !inp.match(/\s+\w+/));
};

function renderMarkup(template, data) {

    const markup = template(data);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
};

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
        console.log(amount > refs.gallery.childElementCount
            && refs.gallery.childElementCount !== 0);
        observer.observe(document.querySelector('li:last-child'));
    } else {
        observer.disconnect(document.querySelector('li:last-child'));
        console.log("THAT IS ALL");
        return;
    };
};

function setItemsPerQuery() {
    const width = document.documentElement.scrollWidth;
    apiService.objPerPage = (width >= 1600) ? 5 : (width >= 1200) ? 4 : (width >= 992) ? 3 : 4;
};

function fetchResults() {
    setItemsPerQuery();
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
    apiService.resetPage();
    clear(refs.gallery);

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


function showLargeImg(e) {
    if (e.target.tagName !== "IMG") {
        return;
    }
    const instance = basicLightbox.create(`<img src='${e.target.dataset.largeImg}' width="800" height="600">`);
    instance.show();
};


searchBtn.enable();

refs.searchForm.addEventListener('submit', search);

refs.gallery.addEventListener('click', showLargeImg);

















