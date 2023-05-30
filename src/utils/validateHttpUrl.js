/**
 * Returns string if url is valid or false (boolean) of invalid
 * www.example.com is not valid URL (missing scheme)
 * https://example.com is valid URL
 * http://example.com is also valid URL
 * @param {String} urlString The URL that will be checked for validation
 * @returns {Boolean | String} Returns false if urlString is not valid or returns either 'http:' or 'https:'
 * if url is valid.
 */
const isValidHttpUrl = function (urlString) {
  let url;

  try {
    url = new URL(urlString);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
};

export default isValidHttpUrl;
