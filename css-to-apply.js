const ytHome = `
/* Hide home page crap */
ytd-browse[page-subtype="home"] {
  display: none !important;
}
`

const ytSearchSuggestion = `
/* Hide search suggestions */
.sbsb_a {
  display: none;
}
`

const ytVidEndGrid = `
/* Hide recommendations grid at video end */
ytd-watch-flexy #primary #player div.html5-endscreen {
  display: none !important;
}
ytd-watch-flexy #player-full-bleed-container div.html5-endscreen {
  display: none !important;
}
`

const ytRelatedVideos = `
/* Hide related videos recommendations in video watching page */
ytd-watch-flexy #secondary #related {
  display: none !important;
}
ytd-watch-flexy #primary #related {
  display: none !important;
}
`

export const youtube = {
  homePage: ytHome,
  searchSuggestion: ytSearchSuggestion,
  suggestionsAtVidEnd: ytVidEndGrid,
  relatedVideos: ytRelatedVideos,
}

const twTrending = `
div[aria-label="Trending"] > div > div:has(div[aria-label="Timeline: Trending now"]) {
  display: none !important;
}
`

export const twitter = {
  trending: twTrending,
}

const discordActivity = `
button[aria-label="Start an Activity"] {
  display: none !important;
}
`

export const discord = {
  activity: discordActivity,
}

const googleSearchSuggestions = `
div.UUbT9 {
  display: none !important;
}

div.RNNXgb {
  border-bottom-left-radius: 24px !important;
  border-bottom-right-radius: 24px !important;
}
`

export const google = {
  searchSuggestion: googleSearchSuggestions,
}
