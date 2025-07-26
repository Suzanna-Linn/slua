(function () {
  document.querySelectorAll('.page-link').forEach(link => {
    link.addEventListener('click', async function (e) {
      e.preventDefault();
  
      const url = this.getAttribute('href');
      const content = document.getElementById('content');
  

  
      window.scrollTo(0, 0);
  
      document.querySelectorAll('.sublist').forEach(ul => ul.remove());
  
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      const headers = tempDiv.querySelectorAll('h3, h4');
  
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
  
        this.parentElement.appendChild(sublist);
      }
    });
  });
})();
