/**
 * Fetch a Hypertext Application Language (HAL) root Resource Object _link href.
 *
 * https://tools.ietf.org/html/draft-kelly-json-hal-08
 *
 * @param halRootDocumentPath path to HAL API root Resource Object
 * @param halRootDocumentRelationship a root relationship which we expect would appear as a _link entry in the root
 * Resource Object response
 * @returns the expected href OR null if not found
 */
export default function fetchHalRootObjectLink(
  halRootDocumentPath,
  halRootDocumentRelationship
) {
  if (
    halRootDocumentPath &&
    typeof halRootDocumentPath === 'string' &&
    halRootDocumentRelationship &&
    typeof halRootDocumentRelationship === 'string'
  ) {
    fetch(halRootDocumentPath, {
      headers: { 'Content-Type': 'application/hal+json' }
    })
      .then(function(response) {
        if (response.status !== 200) {
          console.log(
            'Looks like there was a problem. Status Code: ' + response.status
          );
          return null;
        }

        return response.json();
      })
      .then(function(data) {
        if (data._links !== undefined) {
          let url = data._links[halRootDocumentRelationship].href;
          console.log(url);
          return fetch(url);
        } else {
          //return Promise.resolve(null);
          return fetch(halRootDocumentPath);
        }
      })
      .catch(function(error) {
        console.log(
          'There has been a problem with your fetch operation: ',
          error.message
        );
      });
  } else {
    throw new Error('fetchHalRootObjectLink(): Invalid arg.');
  }
}
