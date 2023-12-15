chrome.runtime.onInstalled.addListener(function () {
    console.log("LinkedIn Profile Saver Extension Installed");
  });
  
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "saveProfileData") {
      // Save the profile data to local storage
      chrome.storage.local.set({ profileData: request.data }, function () {
        console.log("Profile data saved:", request.data);
      });
    }
  });
  