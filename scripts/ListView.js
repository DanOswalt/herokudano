(function(module){

  /***
   * ListView
   **/

  var ListView = {

    show : function(context) {
      var self = ListView;
      self.moduleName = context.moduleName;
      self.linkName = self.moduleName + '-link';
      self.templateName = self.moduleName + '-template';
      self.dataKey = context.dataKey;
      self.entryType = context.moduleName === 'blog' ? BlogEntry : Project;

      var $moduleName = $('#' + self.moduleName + '-module');
      var $linkName = $('#' + self.linkName);

      $('.module-view').hide();
      $('.view').removeClass('active');
      $moduleName.empty().show();
      $linkName.addClass('active');

      Handlebars.registerHelper('daysAgo', function() {
        return parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago';
      });

      self.getTemplate(self.templateName)
          .done(function(template){
            $moduleName.append(template);
            self.loadEntries(context.state[self.dataKey]);
          });
    },

    getTemplate : function(templateName){
      return $.ajax({
        url: 'templates/' + templateName + '.hbs'
      });
    },

    compileHandlebarsTemplate : function(obj, templateElementId) {
      var appTemplate = $(templateElementId).html();
      var compileTemplate = Handlebars.compile(appTemplate);
      return compileTemplate(obj);
    },

    loadEntries : function(data) {
      var self = this;

      data.sort(function(a,b) {
        return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
      });

      data.forEach(function(data) {
        var entry = new self.entryType(data); //how pass data type?
        var html = self.compileHandlebarsTemplate(entry, '#' + self.templateName);
        self.attachHtmlToParent('#' + self.moduleName + '-module', html);

      });

      $('#' + self.templateName).hide();
    },

    attachHtmlToParent : function(parentSelector, html) {
      $(parentSelector).append(html);
    }
  };

  module.ListView = ListView;

})(window);
