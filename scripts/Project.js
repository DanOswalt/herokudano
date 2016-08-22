(function(module) {

  /*****
  * Project
  ***/

  function Project(opts) {
    this.name = opts.name;
    this.github_url = opts.github_url;
    this.project_url = opts.project_url;
    this.description = opts.description;
  }

  module.Project = Project;

})(window);
