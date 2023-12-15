document.getElementById("saveProfileBtn").addEventListener("click", function () {
    // Replace this array with the LinkedIn profile URLs you want to save
    const profileUrls = [
      "https://www.linkedin.com/in/ACwAAANumBsBo_bC5qa05OJPlHivQCu4qGu7ato",
      "https://www.linkedin.com/in/ACwAAAbwEXYBUtlx2prN622F_dJqMx9AauHO3Qk"
    ];
  
    // Send a message to the background script to save the profile data
    chrome.runtime.sendMessage({ action: "saveProfileData", data: profileUrls });
  });
  