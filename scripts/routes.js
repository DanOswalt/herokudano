//Root redirects to blog
page('/', '/blog');

page('/:module', App.load, ListView.show);

page();
