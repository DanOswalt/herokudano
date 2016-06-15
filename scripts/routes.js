//Root loads blog
page('/', BlogModule.init, BlogView.init);

page('/projects', ProjectModule.init, ProjectView.init);

page('/new', function() {
  NewBlogEntryController.init();
});

page();
