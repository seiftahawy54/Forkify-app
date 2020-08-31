import axios from 'axios';

/*
https://forkify-api.herokuapp.com
https://forkify-api.herokuapp.com/api/search?q=pizza
https://forkify-api.herokuapp.com/api/get

fetch("https://us-restaurant-menus.p.rapidapi.com/menuitems/search?page=1", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
		"x-rapidapi-key": "SIGN-UP-FOR-KEY"
	}
})

const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);

const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);

*/


export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
      this.result = res.data.recipes;
      // console.log(this.result);
    } catch (err) {
      alert(err);
    }
  }
}