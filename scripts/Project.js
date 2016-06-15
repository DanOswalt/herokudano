(function(module) {

  /*****
  * Project
  ***/

  function Project(opts) {
    this.name = opts.name;
    this.html_url = opts.html_url;
    this.description = opts.description;
    this.updated_at = opts.updated_at;
  }

  module.Project = Project;

})(window);
