//Root loads blog
page('/', BlogModule.init, BlogView.init);

//redirect default sort and languages (all and name)
page('/projects', '/projects/all/name');

//
page('/projects/:language/:sort', ProjectModule.init, ProjectView.init);



// page('/new', function() {
//   NewBlogEntryController.init();
// });

page();
