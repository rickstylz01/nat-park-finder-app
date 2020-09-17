'use strict';
const searchUrl = "https://developer.nps.gov/api/v1/parks";




function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function generateRequestUrl(stateNames, maxResults) {
  let params = {
    api_key: apiKey,
    limit: maxResults
  }

  let queryString = formatQueryParams(params);
  let url = searchUrl + '?' + queryString + "&stateCode=";
  let statesNamesWithComma = "";
  stateNames.forEach(state => {
    let indexOfLastElementInArray = stateNames.length - 1;
    let isLastState = stateNames.indexOf(state) == indexOfLastElementInArray; 
    if (isLastState) {
      statesNamesWithComma += state;
    } else {
      statesNamesWithComma += state + ",";
    }
  })
  return url + statesNamesWithComma;
}

function getNationalPark(stateNames, maxResults=10) {
  let requestUrl = generateRequestUrl(stateNames, maxResults);
  fetch(requestUrl)
    .then(response => response.json())
    .then(responseJson => displayToDom(responseJson))
}

function generateHtmlString(parkData) {
  return `
    <li><a href="${parkData.url}">"${parkData.fullName}</a>
    <p>"${parkData.description}</p></li>
  `
}

function appendToList(repoHtmlString) {
  $('#results-list').append(repoHtmlString);
}

function displayToDom(responseJson) {
  
  let parkDataArray = responseJson.data;
  parkDataArray.forEach(parkData => {
    let listItem = generateHtmlString(parkData);
    appendToList(listItem);
  })
  $('.results').removeClass('hidden');
}

function watchForm() {
  $('#submit-button').click(event => {
    event.preventDefault();
    const stateName = $('#nameOfState').val();
    const maxResults = $('#max-results').val();
    $('#results-list').empty();
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
