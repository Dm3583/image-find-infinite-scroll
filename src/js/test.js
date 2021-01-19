import template from '../hbsTemplates/testList.hbs'

const list = [
    "Mango",
    "Poly",
    "Ajax"
];

const root = document.querySelector('.gallery');

const markup = template(list);
root.insertAdjacentHTML('beforeend', markup);
console.log(markup);