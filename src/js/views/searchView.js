import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

export const clearResults = () => {
  elements.searchResultList.innerHTML = "";
  elements.searchResAndPages.innerHTML = "";
};

export const clearInput = () => {
  elements.searchInput.value = "";
};

export const highLightSelected = id => {
  const resultsArr = Array.from(document.querySelectorAll('.results__link'));
  resultsArr.forEach(el => {
    el.classList.remove('results__link--active');
  });
  document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
};

export const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(' ').reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);

    return `${newTitle.join(' ')} ...`;
  }

  return title;
}

// No thing will use it out side this module
const renderRecipe = (recipe) => {
  const markup = `
      <li>
        <a class="results__link" href="#${recipe.recipe_id}">
          <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
          </figure>
          <div class="results__data">
            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
          </div>
        </a>
      </li>
  `;

  elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};

const createButton = (pageNumber, type) => `
<button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? pageNumber - 1 : pageNumber + 1}">
  <span>Page ${type === 'prev' ? pageNumber - 1 : pageNumber + 1}</span>
  <svg class="search__icon">
    <use xlink:href="//www.aaaa.world/img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
  </svg>
</button>
`;

const renderButtons = (page, numOfResults, resPrePage) => {
  const pages = Math.ceil(numOfResults / resPrePage);
  let button;
  if (page === 1 && pages > 1) {
    // Render Only button to go to next page.
    button = createButton(page, 'next');
    
  } else if (page < pages) {
    // Render both buttons.
    button = `
      ${createButton(page, 'next')}
      ${createButton(page, 'prev')}
    `;
  } else if (page === pages && pages > 1) {
    // Render Only button to go to previous page.
    button = createButton(page, 'prev');
  }
  elements.searchResAndPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 2, resultPerPage = 10) => {
  // Get results of current pages.
  const start = (page - 1) * resultPerPage;
  const end = page * resultPerPage;

  recipes.slice(start, end).forEach(renderRecipe);

  // render pagination buttons
  renderButtons(page, recipes.length, resultPerPage);

};
