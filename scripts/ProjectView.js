(function(module){

  /***
   * ProjectView
   **/

  var ProjectView = {

    init : function(context) {
      var self = ProjectView;
      var $projectModule = $('#project-module');

      $('.module-view').hide();
      $('.view').removeClass('active');
      $('#project-module').show();
      $('#projects-link').addClass('active');

      $projectModule.empty();

      Handlebars.registerHelper('daysAgo', function() {
        return parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago';
      });

      self.getTemplate('project-template')
          .done(function(template){
            $projectModule.append(template);
            self.loadProjects(context.state.projectdata);
          });

    },

    getTemplate : function(templateId){
      return $.ajax({
        url: 'templates/' + templateId + '.hbs'
      });
    },

    compileHandlebarsTemplate : function(obj, templateElementId) {
      var appTemplate = $(templateElementId).html();
      console.log(appTemplate);
      var compileTemplate = Handlebars.compile(appTemplate);
      return compileTemplate(obj);
    },

    loadProjects : function(data) {
      var self = this;

      data.sort(function(a,b) {
        return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
      });

      data.forEach(function(data) {
        var project = new Project(data);
        console.log(project);
        var html = self.compileHandlebarsTemplate(project, '#project-template');
        self.attachHtmlToParent('#project-module', html);

      });

      $('#project-template').hide();

    },

    attachHtmlToParent : function(parentSelector, html) {
      $(parentSelector).append(html);
    },
  };

  module.ProjectView = ProjectView;

})(window);
