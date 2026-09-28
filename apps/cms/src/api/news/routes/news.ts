export default {
  routes: [
    {
      method: 'GET',
      path: '/news',
      handler: 'news.find',
    },
    {
      method: 'GET',
      path: '/news/:slug',
      handler: 'news.findBySlug',
    },
    {
      method: 'POST',
      path: '/news',
      handler: 'news.create',
    },
    {
      method: 'PUT',
      path: '/news/:documentId',
      handler: 'news.update',
    },
    {
      method: 'DELETE',
      path: '/news/:documentId',
      handler: 'news.delete',
    },
  ],
};
