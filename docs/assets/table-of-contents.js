document.addEventListener('DOMContentLoaded', function () {
  const sidebarLinks = document.querySelectorAll('.page-link');
  const currentPath = window.location.pathname;
  const menuItems = document.querySelectorAll('.has-submenu');
  const sidebar = document.querySelector('aside.sidebar');

  menuItems.forEach(menuItem => {
    const path = menuItem.getAttribute('data-path');
    if (currentPath.startsWith(path)) {
      menuItem.classList.add('open');
    } else {
      menuItem.classList.remove('open');
    }
  });

  sidebarLinks.forEach(link => {
    const href = link.getAttribute('href');
    const linkPath = new URL(href, window.location.origin).pathname;

    if (linkPath === currentPath) {
      const headers = document.querySelectorAll('main.content article h3, h4');

      if (headers.length > 0) {
        const sublist = document.createElement('ul');
        sublist.classList.add('sublist');

        headers.forEach(header => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          
          if (!header.id) {
            header.id = header.textContent.toLowerCase().replace(/\s+/g, '-');
          }
          a.href = `#${header.id}`;
          a.textContent = header.textContent;

          li.appendChild(a);
          sublist.appendChild(li);
        });

        link.parentElement.appendChild(sublist);
      }

      let elementToScroll = null;
      const parentSubMenu = link.closest('ul.submenu');
      
      if (parentSubMenu) {
        elementToScroll = parentSubMenu.closest('li.has-submenu');
      } else {
        elementToScroll = link.closest('li');
      }
      
      if (elementToScroll) {
        elementToScroll.scrollIntoView({ behavior: 'smooth', block: 'start' });  // start, nearest
      }
    }
  });

  if (sidebar) {
    sidebar.classList.add('loaded');
  }  
});
