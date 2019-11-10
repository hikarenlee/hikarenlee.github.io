$(document).ready(function() {
  var targetPage;
  var targetPageLoaded;

  $('a.dynamicLoad').on('click', function(event){
    // stop the link from firing
    event.preventDefault();

    // assign vars
    targetPage = $(event.target).closest('a').attr('href');

    // will come back from the ajax call as TRUE if succeeded or FALSE if failed
    loadPage(targetPage, 1);
  });
});

async function loadPage (targetPage, attempts) {
  try {
    let targetPageLoaded = await getPage(targetPage);
    if (targetPageLoaded) return;

    // failed once
    if (attempts === 1) loadPage(targetPage, 2);
    else { // failed twice
      // redirect to selected page
      location.assign(targetPage+'#dynamicLoadFailed');
    }
  } catch(err) {
    console.log(err);
    location.assign(targetPage+'#asyncError');
  }
}

function getPage (pageName) {
  // retrieve page from server
  $.ajax({
    url: pageName,
    success: function(response) {
      window.openPage = pageName;
      // TODO: Add support for deep-linking?

      // renders the new content
      renderPage(response);
      return true;
    },
    error: function(xhr, status, error) {
      console.log(xhr, status, error);
      return false;
    },
    type: 'GET'
  });
}

function renderPage (pageHTML) {
  // minimize nav
  // create content section
  // populate content section

}
