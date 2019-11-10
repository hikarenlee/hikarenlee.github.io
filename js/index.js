$(document).ready(function() {
  var targetPage;
  var targetPageLoaded;

  $('a.dynamicLoad').on('click', function(event){
    // stop the link from firing
    event.preventDefault();

    // assign vars
    targetPage = $(event.target).closest('a').attr('href');

    // will come back from the ajax call as TRUE if succeeded or FALSE if failed
    getPage(targetPage, 1);
  });
});

function getPage (pageName, attempts) {
  // retrieve page from server
  $.ajax({
    url: pageName,
    success: function(response) {
      window.openPage = pageName;
      // renders the new content
      renderPage(response);

      // TODO: Add support for deep-linking?

    },
    error: function(xhr, status, error) {
      console.log(xhr, status, error);
      if (attempts === 1) getPage(pageName, 2); // try again
      else location.assign(targetPage+'#dynamicLoadFailed'); // failed twice - redirect to selected page
    },
    type: 'GET'
  });
}

function renderPage (pageHTML) {
  // minimize nav
  // create content section
  // populate content section

}
