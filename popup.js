document.getElementById("openProfileBtn").addEventListener("click", function () {
    // Load the LinkedIn profile URLs from the JSON file
    fetch('linkedin_urls.json')
      .then(response => response.json())
      .then(data => {
        const linkedinUrls = data.linkedinUrls;
  
        // Validate each LinkedIn profile URL using a simple regex
        const validUrls = linkedinUrls.filter(profileUrl => {
          const urlRegex = /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
          return urlRegex.test(profileUrl);
        });
  
        // Check if any URLs are invalid
        if (validUrls.length !== linkedinUrls.length) {
          console.error("Some LinkedIn profile URLs are invalid");
          displayErrorMessage("Some LinkedIn profile URLs are invalid");
          return;
        }
  
        // Create a folder for saving the files
        const folderName = 'LinkedInProfiles';
        chrome.downloads.download({
          url: '', // No need for a placeholder URL
          filename: folderName,
          conflictAction: 'overwrite',
          saveAs: false,
        }, function (downloadId) {
          if (chrome.runtime.lastError) {
            console.error('Error creating folder:', chrome.runtime.lastError);
            displayErrorMessage('Error creating folder');
            return;
          }
  
          // Iterate through each valid LinkedIn profile URL and initiate the download
          validUrls.forEach(profileUrl => {
            // Save the profile URL to a text file in the folder
            const data = `LinkedIn Profile URL: ${profileUrl}`;
            const blob = new Blob([data], { type: 'text/plain' });
  
            // Use chrome.downloads.download to save the file in the folder
            chrome.downloads.download({
              url: URL.createObjectURL(blob),
              filename: `${folderName}/${getFileName(profileUrl)}`,
              conflictAction: 'overwrite',
              saveAs: false
            }, function (downloadId) {
            
              console.log("File download initiated with ID:", downloadId);
            });
          });
        });
      })
      .catch(error => {
        console.error('Error loading LinkedIn profile URLs:', error);
        displayErrorMessage('Error loading LinkedIn profile URLs');
      });
  });
  
  function displayErrorMessage(message) {
    // Display an error message in the popup
    const errorMessageContainer = document.getElementById("errorMessage");
    errorMessageContainer.textContent = message;
  
    // Clear the error message after a short delay
    setTimeout(() => {
      errorMessageContainer.textContent = '';
    }, 3000); // 3000 milliseconds (3 seconds)
  }
  
  function getFileName(url) {
    // Extract the last part of the URL as the filename
    const parts = url.split('/');
    return parts[parts.length - 1] + '.txt';
  }
  