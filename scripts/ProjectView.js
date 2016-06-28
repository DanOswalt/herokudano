(function(module){

  /***
   * ProjectView
   **/

  var ProjectView = {

    init : function(context, next) {
      var self = ProjectView;
      var $projectModule = $('#project-module');

      console.log('View for Language:', context.params.language);
      console.log('View for Sort:', context.params.sort);
      console.log('View for Data:', context.state.projectdata);

      $('.module-view').hide();
      $('.view').removeClass('active');
      $('#project-view').show();
      $('#project-module').show();
      $('#projects-link').addClass('active');

      self.populateFilter(context.state.projectdata);

      Handlebars.registerHelper('daysAgo', function() {
        return parseInt((new Date() - new Date(this.updated_at))/60/60/24/1000) + ' days ago';
      });

      self.getTemplate('project-template')
          .done(function(data, status, xhr){
            console.log('data', data);
            console.log('status', status);
            console.log('xhr', xhr);
            $projectModule.empty().append(data);
            self.loadProjects(context.state.filtereddata);
          })
          .fail(function(data, status, xhr){
            console.log('data', data);
            console.log('status', status);
            console.log('xhr', xhr);
          });

      //set event handlers for filter button
      $('#filter-btn').on('click', function(){
        var language = $('#language-choice').val();
        var sort = $('#sort-choice').val();
        page('/projects/' + language + '/' + sort);
      });

    },

    getTemplate : function(templateId){
      return $.ajax({
        url: '/templates/' + templateId + '.hbs'
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

      data.forEach(function(data) {
        var project = new Project(data);
        var html = self.compileHandlebarsTemplate(project, '#project-template');
        self.attachHtmlToParent('#project-module', html);
      });

      $('#project-template').hide();
    },

    getLanguages : function(data) {
      return data.map(function(project){
        return project.language;
      })
      .reduce(function(languages, language){
        if(languages.indexOf(language) === -1){
          languages.push(language);
        }
        return languages;
      }, []);
    },

    populateFilter : function(data) {
      var options,
        template = Handlebars.compile($('#options-template').text());

      options = this.getLanguages(data).map(function(language) {
        return template({val: language});
      });

      if ($('#language-choice option').length < 2) {
        $('#language-choice').append(options);
      };
    }

  };

  module.ProjectView = ProjectView;

})(window);
