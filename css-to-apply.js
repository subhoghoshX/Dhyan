export const youtube = {
  matches: ["*://*.youtube.com/*"],
  sections: {
    homePage: {
      label: "home feed",
      cssFilePath: 'css/youtube/home.css'
    },
    searchSuggestion: {
      label: "search suggestions",
      cssFilePath: 'css/youtube/search.css'
    },
    suggestionsAtVidEnd: {
      label: "video end cards",
      cssFilePath: 'css/youtube/end-cards.css'
    },
    relatedVideos: {
      label: "related videos",
      cssFilePath: 'css/youtube/related.css'
    },
  }
}

export const twitter = {
  matches: ["*://*.twitter.com/*"],
  sections: {
    trending: {
      label: "trending",
      cssFilePath: 'css/twitter/trending.css'
    },
  }
}

export const discord = {
  matches: ["*://discord.com/*"],
  sections: {
    activity: {
      label: "activity buttons",
      cssFilePath: 'css/discord/activity.css'
    },
  }
}

export const google = {
  matches: ["*://*.google.com/"],
  sections: {
    searchSuggestion: {
      label: "search suggestions",
      cssFilePath: 'css/google/trending-search.css'},
  }
}
