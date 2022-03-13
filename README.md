# CRUD App

## Tech Used
* Vite
* TypeScript
* React
* React Router (v5)
* SASS/SCSS
* Google Firebase Firestore Database v8.5

## Future Revision Ides:
* Complete Mobile Responsive Layout 🎨
* Add a real full-text 🔎search because **Firebase DOESN'T DO THAT?!?!?**
  * Current search solution mirrors that of the Home `.get()` and parses the entirety of **every** record/doc in the collection - this obviously _will not scale_
  * Search Solutions Ideas
    * Google literally suggest using a 3rd party ala Algolia/Elastisearch[presumably on AWS] \(aka, spend money💰💸);
    * Tokenize each word to a number value and combine `.where()` clauses
      * https://www.reddit.com/r/Firebase/comments/hqogmz/whats_up_with_fulltext_search_in_firestore_why/fy0ky8p/
    * SubIndex every possible permutation of the title
      * https://medium.com/@ken11zer01/firebase-firestore-text-search-and-pagination-91a0df8131ef
    * An odd idea relating to charCodes that probably doesn't work
      * https://www.reddit.com/r/Firebase/comments/gv9qyn/firestore_search_functionality_algolia/fsq7qik/