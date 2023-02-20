

document.addEventListener("DOMContentLoaded", function() {








    var quill = new Quill('.quill-editor', {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ 'header': 1 }, { 'header': 2 }],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'script': 'sub' }, { 'script': 'super' }],
          [{ 'indent': '-1' }, { 'indent': '+1' }],
          [{ 'direction': 'rtl' }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'color': [] }, { 'background': [] }],
        //   [{ 'font': [] }],
          [{ 'align': [] }],
          ['clean']
        ],
        color: false
      },
      theme: 'snow'
    });
  

  // Select all toolbar elements
  var toolbarElements = document.querySelectorAll('.ql-toolbar button, .ql-toolbar select');

  // Loop through toolbar elements and modify their style
  for (var i = 0; i < toolbarElements.length; i++) {
    // toolbarElements[i].style.color = 'red !important'; // Change color to red
    // toolbarElements[i].style.backgroundColor = 'black'; // Change background color to yellow
  }










    
    var turndownService = new TurndownService({
      headingStyle: "atx",
      bulletListMarker: "-"
    });
  
    // Add a custom rule to convert inline styles to Markdown
    turndownService.addRule("style", {
      filter: function(node) {
        return (
          node.nodeName === "SPAN" &&
          (node.style.color || node.style.backgroundColor)
        );
      },
      replacement: function(content, node) {
        var styles = [];
        if (node.style.color) {
          styles.push("color:" + node.style.color);
        }
        if (node.style.backgroundColor) {
          styles.push("background-color:" + node.style.backgroundColor);
        }
        return "<span style=\"" + styles.join(";") + "\">" + content + "</span>";
      }
    });
  
    // Add a custom rule to convert Quill color to Markdown
    turndownService.addRule("color", {
      filter: function(node) {
        return node.nodeName === "SPAN" && node.style.color;
      },
      replacement: function(content, node) {
        return "{color=" + node.style.color + "}" + content + "{color}";
      }
    });
  
    var editor = document.querySelector(".ql-editor");
    var preview = document.querySelector("#preview");
  




    var timeoutID;

    editor.addEventListener("keydown", function() {
      clearTimeout(timeoutID);
    });
    
    editor.addEventListener("keyup", function() {
      var html = editor.innerHTML;
      var markdown = turndownService.turndown(html);
    //   preview.innerHTML = markdown;
    });




    editor.addEventListener("input", function() {
        clearTimeout(timeoutID);
        timeoutID = setTimeout(function() {
          var html = editor.innerHTML;
          var markdown = turndownService.turndown(html);
      
          var paragraphs = editor.getElementsByTagName('p');
          if (paragraphs.length > 0) {
            var str = '';
            for (var i = 0; i < paragraphs.length; i++) {
              var paragraphMarkdown = turndownService.turndown(paragraphs[i].outerHTML);
              if (paragraphs[i].textContent.trim() === '') {
                str += '<br>';
              } else {
                str += '<p>' + paragraphMarkdown + '</p>';
              }
            }
            preview.innerHTML = str;
          } else {
            preview.innerHTML = '<p>' + markdown + '</p>';
          }
        }, 0);
      });
      


    const emailLink = document.querySelector('.email');
    const previewDiv = document.querySelector('#preview');
    
    emailLink.addEventListener('click', () => {
      const emailText = previewDiv.innerText;
      navigator.clipboard.writeText(emailText)
        .then(() => {
          let tooltip = document.querySelector('.tooltip');
          if (!tooltip) {
            // tooltip = document.createElement('div');
            // tooltip.classList.add('tooltip');
            tooltip.innerText = 'Email copied to clipboard';
            // emailLink.parentNode.insertBefore(tooltip, emailLink.nextSibling);
          }
          setTimeout(() => {  tooltip.style.opacity = 1; }, 25);
          setTimeout(() => {
            tooltip.style.opacity = 0;
          }, 2000);
        })
        .catch((error) => {
          console.error(`Error copying email to clipboard: ${error}`);
        });

// 


        const downloadButton = document.querySelector('#download-preview');
        const previewDownloadDiv = document.getElementById('preview');
        
        downloadButton.addEventListener('click', (event) => {
          console.log('Download button clicked'); // Add this line
          event.preventDefault();
          const content = previewDownloadDiv.innerText;
          const blob = new Blob([content], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.download = 'README.md';
          a.href = url;
          document.body.appendChild(a);
          a.click();
          setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }, 0);
        });


        // 
        
          });
          


    















 






  });
  
