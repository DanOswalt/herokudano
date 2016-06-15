(function(module){

  /*****
  * ProjectModule
  ***/

  var ProjectModule = {

    /*******
     * init loads data either from localstorage or from file
     ***/

    init : function(context, next) {
      var self = ProjectModule;

      //check if projectdata state exists
      if(context.state.projectdata) {
        self.projectdata = context.state.projectdata;
        next();
      } else {

      //fetch the xhr header to compare etags
        self.fetchFromGithub('/github/users/DanOswalt/repos', 'HEAD')
            .done(function(response, status, xhr){
              var etag = xhr.getResponseHeader('Etag');
              var storedEtag = self.loadFromLocalStorage('projectetag');

              //if what is in local storage is the same, then fetch from local storage
              if(etag === storedEtag){
                context.state.projectdata = self.loadFromLocalStorage('projectdata');
                context.save();
                self.projectdata = context.state.projectdata;
                next();

              //if they don't match, or nothing stored, load from the data file
              } else {
                self.fetchFromGithub('/github/users/DanOswalt/repos', 'GET') //call to api
                    .done(function(response, status, xhr){
                      var repos = { data: response };
                      context.state.projectdata = repos.data;
                      context.save();
                      self.projectdata = context.state.projectdata;
                      self.saveToLocalStorage('projectdata', repos.data);
                      self.saveToLocalStorage('projectetag', etag);
                      next();
                    })
                    .fail(function(){ //if this fails, load up 'old' stuff from localstorage
                      context.state.projectdata = self.loadFromLocalStorage('projectdata');
                      context.save();
                      self.projectdata = context.state.projectdata;
                      next();
                    });
              };
            })
            .fail(function(){
              context.state.projectdata = [];
              context.save();
              self.projectdata = context.state.projectdata;
              next();
            });
      }
    },

    fetchFromGithub : function(url, type) {
      return $.ajax({
        url: url,
        type: type
      });
    },

    saveToLocalStorage : function(key, value) {
      console.log('save data');
      localStorage.setItem(key, JSON.stringify(value));
    },

    clearFromLocalStorage : function(key) {
      console.log('clear data');
      localStorage.removeItem(key);
    },

    loadFromLocalStorage : function(key) {
      console.log('load data');
      return JSON.parse(localStorage.getItem(key));
    }
  };

  module.ProjectModule = ProjectModule;

})(window);
