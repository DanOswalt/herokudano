(function(module){

  /*****
  * App
  ***/

  var App = {

    /*******
     * init loads data either from localstorage or from file
     ***/

    load : function(context, next) {
      var self = App;
      context.moduleName = context.params.module;
      var name = context.params.module;
      var dataKey = name + 'data';
      var etagKey = name + 'etag';
      context.dataKey = dataKey;
      console.log('module:', context.moduleName);

      //check if blogdata state exists
      if(context.state[dataKey]) {
        self.data = context.state[dataKey];
        next();
      } else {

      //fetch the xhr header to compare etags
        self.fetchFromFile('data/' + dataKey + '.json', 'HEAD')
            .done(function(response, status, xhr){
              var etag = xhr.getResponseHeader('Etag');
              var storedEtag = self.loadFromLocalStorage(etagKey);

              //if what is in local storage is the same, then fetch from local storage
              if(etag === storedEtag){
                context.state[dataKey] = self.loadFromLocalStorage(dataKey);
                context.save();
                self[dataKey] = context.state[dataKey];
                next();

              //if they don't match, or nothing stored, load from the data file
              } else {
                self.fetchFromFile('data/' + dataKey + '.json', 'GET')
                    .done(function(response, status, xhr){
                      context.state[dataKey] = response.data;
                      context.save();
                      self[dataKey] = context.state[dataKey];
                      self.saveToLocalStorage(dataKey, response.data);
                      self.saveToLocalStorage(etagKey, etag);
                      next();
                    })
                    .fail(function(){
                      context.state[dataKey] = self.loadFromLocalStorage(dataKey);
                      context.save();
                      self[dataKey] = context.state[dataKey];
                      next();
                    });
              };
            })
            .fail(function(){
              context.state[dataKey] = self.loadFromLocalStorage(dataKey);
              context.save();
              self[dataKey] = context.state[dataKey];
              next();
            });
      }
    },

    fetchFromFile : function(file, type) {
      return $.ajax({
        url: file,
        type: type
      });
    },

    saveToLocalStorage : function(key, value) {
      console.log('save: ' + key);
      localStorage.setItem(key, JSON.stringify(value));
    },

    clearFromLocalStorage : function(key) {
      console.log('clear: ' + key);
      localStorage.removeItem(key);
    },

    loadFromLocalStorage : function(key) {
      console.log('load: ' + key);
      return JSON.parse(localStorage.getItem(key));
    }
  };

  module.App = App;

})(window);
