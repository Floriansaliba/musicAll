import axios from 'axios';

export default class Search {
  search = async (req, res) => {
    const searchTerm = req.query.search;
    const options = {
      method: 'GET',
      url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
      params: { q: searchTerm },
      headers: {
        'X-RapidAPI-Key': '5bccd25edamsh6f47ed6538d7452p129af2jsn18f20d6b170a',
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data.data);
      res.render('home', { results: response.data.data });
    } catch (error) {
      console.error(error);
    }
  };
}
