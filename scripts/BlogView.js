(function(module){

  /***
   * BlogView
   **/

  var BlogView = {

    init : function(context) {
      var self = BlogView;
      var $blogModule = $('#blog-module');

      $('.module-view').hide();
      $('.view').removeClass('active');
      $('#blog-module').show();
      $('#blog-link').addClass('active');

      $blogModule.empty();

      Handlebars.registerHelper('daysAgo', function() {
        return parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago';
      });

      self.getTemplate('blog-entry-template')
          .done(function(template){
            $blogModule.append(template);
            self.loadBlogEntries(context.state.blogdata);
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

    loadBlogEntries : function(data) {
      var self = this;

      data.sort(function(a,b) {
        return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
      });

      data.forEach(function(data) {
        var blogEntry = new BlogEntry(data);
        var html = self.compileHandlebarsTemplate(blogEntry, '#blog-entry-template');
        self.attachHtmlToParent('#blog-module', html);

      });

      $('#blog-entry-template').hide();
    },

    attachHtmlToParent : function(parentSelector, html) {
      $(parentSelector).append(html);
    }
  };

  module.BlogView = BlogView;

})(window);
