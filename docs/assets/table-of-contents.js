document.addEventListener('DOMContentLoaded', function () {
  const sidebarLinks = document.querySelectorAll('.page-link');
  const currentPath = window.location.pathname;

  sidebarLinks.forEach(link => {
    const href = link.getAttribute('href');
    const linkPath = new URL(href, window.location.origin).pathname;

    if (linkPath === currentPath) {
      // This is the active page link — add sublist
      const headers = document.querySelectorAll('main.content article h2, h3');

      if (headers.length > 0) {
        const sublist = document.createElement('ul');
        sublist.classList.add('sublist');

        headers.forEach(header => {
          if (!header.id) {
            header.id = header.textContent.toLowerCase().replace(/\s+/g, '-');
          }

          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = `#${header.id}`;
          a.textContent = header.textContent;
          li.appendChild(a);
          sublist.appendChild(li);
        });

        link.parentElement.appendChild(sublist);
      }
    }
  });
});
