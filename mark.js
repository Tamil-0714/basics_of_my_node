document.addEventListener('DOMContentLoaded', () => {
    
    const preview = document.getElementById('preview');
  
    markdownInput.addEventListener('input', () => {
      const markdownContent = markdownInput.value;
      const htmlContent = marked(markdownContent);
      preview.innerHTML = htmlContent;
    });
  });
  