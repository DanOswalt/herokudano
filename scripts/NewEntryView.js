(function(module){

  /*****
  * NewEntryView
  ***/

  var NewEntryView = {

// initNewProject : function() {
//   var self = this;
//   $('#new-project').on('keyup', 'input, textarea', self.createProjectFromForm);
// },
//
// handleJSONSelection : function() {
//   $('#project-json').on('focus', function() {
//     this.select();
//   });
// },
// createProjectFromForm : function() {
//   var project, html;
//
//   $('#project-preview').empty();
//   project = new Project({
//     title: $('#project-title').val(),
//     description: $('#project-description').val(),
//     details: $('#project-details').val(),
//     publishedBy: $('#project-publishedBy').val(),
//     publishedOn: new Date(),
//     url: $('#project-url').val(),
//     codeUrl: $('#project-codeUrl').val(),
//     screenshot: ''
//   });
//
//   html = BlogView.compileHandlebarsTemplate(project, '#project-template');
//   BlogView.attachHtmlToParent('#project-preview', html);
//   $('#project-json').val(JSON.stringify(project));
// },
//
// handleNewProjectSubmit : function() {
//   var self = this;
//
//   $('#new-project-submit').on('click', function(){
//     if(self.formIsNotEmpty()) {
//       var newProject = JSON.parse($('#project-json').val());
//       ProjectModule.data.push(newProject);
//       ProjectModule.saveToLocalStorage(ProjectModule.data);
//       self.clearInputFields();
//       $('#project-preview').empty();
//       BlogView.showSaveMessage('Saved!');
//     } else {
//       // $('.save-msg').show().html('<h2 class="msg">Form is empty!</h2>').fadeOut(800);
//       BlogView.showSaveMessage('Form is empty!');
//       console.log('form is empty!');
//     }
//   });
// },
//
// showSaveMessage : function(msg) {
//   $('.save-msg').show().html('<h2 class="msg">' + msg + '</h2>').fadeOut(800);
// },
//
// clearInputFields : function() {
//   $('#project-json').val('');
//   $('#new-project :input').val('');
// },
//
// formIsNotEmpty : function() {
//   var isNotEmpty = false;
//   $('#new-project :input').each(function(){
//     if($.trim($(this).val()) !== '') {
//       isNotEmpty = true;
//       return;
//     };
//   });
//   return isNotEmpty;
// }
  };

  module.NewEntryView = NewEntryView;

})(window);
