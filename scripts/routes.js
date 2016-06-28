//Root loads blog
page('/', BlogModule.init, BlogView.init);

//redirect default sort and languages (all and recent)
page('/projects', '/projects/all/recent');

//load projects in sortAndFilter by the parameters in route
page('/projects/:language/:sort', ProjectModule.init, ProjectModule.sortAndFilter, ProjectView.init);

page();
