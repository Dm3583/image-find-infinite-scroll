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
            fetchResults();
        }
        observer.unobserve(entry.target)
        observer.observe(document.querySelector('li:last-child'))
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

function fetchResults() {

    apiService.fetchForQuery().then(data => {
        renderMarkup(cardTemplate, data.hits);

        console.log(refs.gallery.childElementCount);
        if (data.totalHits > refs.gallery.childElementCount) {
            observer.observe(document.querySelector('li:last-child'))
        } else {
            observer.unobserve(document.querySelector('li:last-child'))
            return;
        };

    }).catch(error => console.log("ERROR " + error));
};

function search(e) {

    e.preventDefault()
    searchBtn.disable();
    const input = e.currentTarget.elements.query;
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

searchBtn.enable();

refs.searchForm.addEventListener('submit', search);










// let ul = document.querySelector('ul')
// let n = 1

// функция создания элемента списка

// function createLi() {
//     li = document.createElement('li')
//     li.innerHTML = `${++n} item`
//     ul.append(li)
// }

// для того, чтобы все время наблюдать за последним элементом списка
// мы используем нечто вроде замыкания
// прекращаем наблюдать за целевым элементом после создания очередного li
// и начинаем наблюдать за этим новым (последним) элементом

// let observer = new IntersectionObserver((entries, observer) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             createLi()
//         }
//         observer.unobserve(entry.target)
//         observer.observe(document.querySelector('li:last-child'))
//     })
// }, {
//     threshold: 1
// });

// observer.observe(document.querySelector('li'))















