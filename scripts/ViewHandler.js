(function(module){
  /***
   * ViewHandler
   **/

  var ViewHandler = {

    init : function() {
      var self = this;
      self.initNewProject();
      self.handleTabClicks();
      self.handleNewProjectSubmit();
      self.handleJSONSelection();
      self.getTemplate('project-template').then(function(template){
        Handlebars.registerHelper('daysAgo', function() {
          return parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago';
        });
        if($('#projects-module').length) {
          $('#projects-module').append(template);
        } else {
          $('#projects-preview').append(template);
        }
        self.getTemplate('footer-template').then(function(template){
          $('#site-footer').append(template);
          ProjectModule.init();
        }).then(function(){
          $('#project-template').hide();
          $('#footer-template').remove();
        });
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

    loadProjects : function() {
      var self = this;

      ProjectModule.data.sort(function(a,b) {
        return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
      });
      ProjectModule.data.forEach(function(projectData) {
        var project = new Project(projectData);
        var html = self.compileHandlebarsTemplate(project, '#project-template');
        if($('#projects-module').length) {
          console.log('load to projects module');
          self.attachHtmlToParent('#projects-module', html);
        } else {
          console.log('load to projects preview');
          self.attachHtmlToParent('#project-preview', html);
        }
      });
      $('#project-template').remove();

    },

    loadFooterFun : function(footerData) {
      var html = ViewHandler.compileHandlebarsTemplate(footerData, '#footer-template');
      ViewHandler.attachHtmlToParent('#site-footer', html);
      // $('#footer-template').remove();
    },

    handleTabClicks : function() {
      $('#nav-links').on('click', 'li.tab', function(e){
        e.preventDefault();
        var dataContent = $(this).attr('data-content');
        $('.tab-view').fadeOut('fast');
        $('#' + dataContent).fadeIn('fast');
      });
    },

    initNewProject : function() {
      var self = this;
      $('#new-project').on('keyup', 'input, textarea', self.createProjectFromForm);
    },

    handleJSONSelection : function() {
      $('#project-json').on('focus', function() {
        this.select();
      });
    },

    attachHtmlToParent : function(parentSelector, html) {
      $(parentSelector).append(html);
    },

    createProjectFromForm : function() {
      var project, html;

      $('#project-preview').empty();
      project = new Project({
        title: $('#project-title').val(),
        description: $('#project-description').val(),
        details: $('#project-details').val(),
        publishedBy: $('#project-publishedBy').val(),
        publishedOn: new Date(),
        url: $('#project-url').val(),
        codeUrl: $('#project-codeUrl').val(),
        screenshot: ''
      });

      html = ViewHandler.compileHandlebarsTemplate(project, '#project-template');
      ViewHandler.attachHtmlToParent('#project-preview', html);
      $('#project-json').val(JSON.stringify(project));
    },

    handleNewProjectSubmit : function() {
      var self = this;

      $('#new-project-submit').on('click', function(){
        if(self.formIsNotEmpty()) {
          var newProject = JSON.parse($('#project-json').val());
          ProjectModule.data.push(newProject);
          ProjectModule.saveToLocalStorage(ProjectModule.data);
          self.clearInputFields();
          $('#project-preview').empty();
          ViewHandler.showSaveMessage('Saved!');
        } else {
          // $('.save-msg').show().html('<h2 class="msg">Form is empty!</h2>').fadeOut(800);
          ViewHandler.showSaveMessage('Form is empty!');
          console.log('form is empty!');
        }
      });
    },

    showSaveMessage : function(msg) {
      $('.save-msg').show().html('<h2 class="msg">' + msg + '</h2>').fadeOut(800);
    },

    clearInputFields : function() {
      $('#project-json').val('');
      $('#new-project :input').val('');
    },

    formIsNotEmpty : function() {
      var isNotEmpty = false;
      $('#new-project :input').each(function(){
        if($.trim($(this).val()) !== '') {
          isNotEmpty = true;
          return;
        };
      });
      return isNotEmpty;
    }
  };

  module.ViewHandler = ViewHandler;

})(window);
