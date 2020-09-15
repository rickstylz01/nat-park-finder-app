'use strict';
const searchUrl = "https://developer.nps.gov/api/v1/parks";
let apiKey = "cVW46Hkd5mQoL0W3rVbxYBd9WM5X7Bemsul64SNQ";



//setting ingredients to create html string
function getNationalPark(query, maxResults=10) {
  const params = {
    key: apiKey,
    resourceEndpoint: "parks",
    maxResults,
    stateCode: query 
  }
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const stateName = $('#nameOfState').val();
    const maxResults = $('#max-results').val();
    getNationalPark(stateName, maxResults);
  });
}

$(watchForm);

// The user must be able to search for parks in one or more states.
// The user must be able to set the max number of results, with a default of 10.
// The search must trigger a call to NPS's API.
// The parks in the given state must be displayed on the page.Include at least:
// Full name
// Description
// Website URL
// The user must be able to make multiple searches and see only the results for the current search.