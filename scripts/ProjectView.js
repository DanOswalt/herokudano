(function(module){

  /***
   * ProjectView
   **/

  var ProjectView = {

    init : function(context, next) {
      var self = ProjectView;
      var $projectModule = $('#project-module');

      $('.module-view').hide();
      $('.view').removeClass('active');
      $('#project-view').show();
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
      var compileTemplate = Handlebars.compile(appTemplate);
      return compileTemplate(obj);
    },

    attachHtmlToParent : function(parentSelector, html) {
      $(parentSelector).append(html);
    },

    loadProjects : function(data) {
      var self = this;

      // data.sort(function(a,b) {
      //   return (new Date(b.updated_at)) - (new Date(a.updated_at));
      // });

      data.forEach(function(data) {
        var project = new Project(data);
        var html = self.compileHandlebarsTemplate(project, '#project-template');
        self.attachHtmlToParent('#project-module', html);

      });

      $('#project-template').hide();

    },

    getLanguages : function() {
      self.data
        .map(function(project){
          return project.language;
        })
        .reduce(function(languages, language){
          if(languages.indexOf(language) === -1){
            languages.push[language];
          }
          return language;
        }, []);
    },

    populateFilter : function() {
      var options,
        template = Handlebars.compile($('#option-template').text());

      options = self.getLanguages().map(function(language) {
        return template({val: language});
      });

      // if ($('#author-filter option').length < 2) { // Prevent duplication
      //   $('#author-filter').append(options);
      // };
    }

  };

  module.ProjectView = ProjectView;

})(window);
