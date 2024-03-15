export const youtube = {
  matches: ["*://*.youtube.com/*"],
  sections: {
    homePage: 'css/youtube/home.css',
    searchSuggestion: 'css/youtube/search.css',
    suggestionsAtVidEnd: 'css/youtube/end-cards.css',
    relatedVideos: 'css/youtube/related.css',
  }
}

export const twitter = {
  matches: ["*://*.twitter.com/*"],
  sections: {
    trending: 'css/twitter/trending.css',
  }
}

export const discord = {
  matches: ["*://discord.com/*"],
  sections: {
    activity: 'css/discord/activity.css',
  }
}

export const google = {
  matches: ["*://*.google.com/"],
  sections: {
    searchSuggestion: 'css/google/trending-search.css',
  }
}
