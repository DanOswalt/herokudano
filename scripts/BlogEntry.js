(function(module) {

  /*****
  * BlogEntry
  ***/

  function BlogEntry(opts) {
    this.title = opts.title;
    this.publishedOn = opts.publishedOn;
    this.image = opts.image;
    this.body = opts.body;
  }

  module.BlogEntry = BlogEntry;

})(window);
