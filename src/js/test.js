import template from '../hbsTemplates/testList.hbs';
import ApiService from './apiService';
import Button from './button'

const apiService = new ApiService();

const searchBtn = new Button({
    selector: '.searchBtn',
    label: 'Search',
    labelOnStateChange: 'Searching....'
});

console.log(searchBtn);

// searchBtn.hide();
// searchBtn.enable()
// searchBtn.show();
// searchBtn.hide();
// searchBtn.show();
searchBtn.disable();
searchBtn.enable()

const root = document.querySelector('.gallery');



apiService.query = 'parrot';

apiService.fetchForQuery().then(data => {
    console.log(data.hits);
    const markup = template(data.hits);
    root.insertAdjacentHTML('beforeend', markup);
});



apiService.fetchForQuery().then(data => {
    console.log(data.hits);
    const markup = template(data.hits);
    root.insertAdjacentHTML('beforeend', markup);
});

apiService.fetchForQuery().then(data => {
    console.log(data.hits);
    const markup = template(data.hits);
    root.insertAdjacentHTML('beforeend', markup);
});




