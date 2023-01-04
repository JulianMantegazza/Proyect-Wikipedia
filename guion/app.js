const url = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';

const formDOM = document.querySelector(".form");
const formInputDOM = document.querySelector(".form-input");
const resultsDOM = document.querySelector(".results");

formDOM.addEventListener('submit', (e) =>{
    e.preventDefault();
    const value = formInputDOM.value;
    if (!value) {
        resultsDOM.innerHTML = 
        '<div class="error">Please enter valid search term!</div>'
        return;
    };
    fetchPages(value);
});

const fetchPages = async (searchValue) => {
    resultsDOM.innerHTML = '<div class="loading"></div>';
    try{
        const response = await fetch(`${url}${searchValue}`);
        const data = await response.json();
        const results = data.query.search;

        if (results.length < 1) {
            resultsDOM.innerHTML = '<div class="error">¡No Matching Results! Please Try Again:</div>';
            return;
        };
        renderResults(results);
    } catch (error) {
        resultsDOM.innerHTML = '<div class="error">There was a Error...</div>';
    };
};

const renderResults = (list) => {
    const cardList = list
        .map((item) => {
            const { title, snippet, pageid } = item;
            return `<a href=http://en.wikipedia.org/?curid=${pageid} target="_blank">
            <h3>${title}</h3>
            <p>
                ${snippet}
            </p></a>`;
        })
        .join('');
    resultsDOM.innerHTML = `<div class="articles">
    ${cardList}
    </div>`;
};