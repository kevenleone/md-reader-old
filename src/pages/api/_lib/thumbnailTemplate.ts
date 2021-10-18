interface GetHtmlProps {
  title: string;
  thumbnail_bg?: string;
}

export function getThumbnailTemplate({
  thumbnail_bg = "#8257e5",
  title,
}: GetHtmlProps) {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      
      <title>Thumbnail</title>
    
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap" rel="stylesheet">
    
      <style>
        body {
          margin: 0;
          font-family: Roboto, sans-serif;
          color: #FFF;
          background: ${thumbnail_bg};
          background-image: 
            radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2%, transparent 0%), 
            radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.2) 2%, transparent 0%);
          background-size: 100px 100px;
          height: 100vh;
        }
    
        #wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
    
        svg {
          height: 40px;
          margin-top: 80px;
        }
    
        h1 {
          font-size: 62px;
          line-height: 80px;
    
          max-width: 80%;
        }
      </style>
    </head>
    <body>
      <div id="wrapper">
        <h1>${title}</h1>
    
        <svg width="541" height="100" viewBox="0 0 541 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M112.513 29.3613C107.97 29.3613 104.223 32.9039 104.223 37.3706V54.3132V71.2558H112.513V54.3132V37.3706H122.397H132.281V29.3613H122.397H112.513Z" fill="white"/>
          <path d="M181.705 50.2309V37.2929C181.705 32.9032 178.038 29.2837 173.415 29.2837H160.024H146.632C142.089 29.2837 138.342 32.8262 138.342 37.2929V50.2309V63.1689C138.342 67.5586 142.009 71.1782 146.632 71.1782H160.024H173.415C177.958 71.1782 181.705 67.6356 181.705 63.1689V50.2309ZM173.415 50.2309V63.1689H160.024H146.632V50.2309V37.2929H160.024H173.415V50.2309Z" fill="white"/>
          <path d="M198.284 29.3613C193.741 29.3613 189.995 32.9039 189.995 37.3706V50.3086V63.2466C189.995 67.6362 193.661 71.2558 198.284 71.2558L227.458 70.8707V63.2466H198.284V50.3086V37.3706H227.458V29.7464L198.284 29.3613Z" fill="white"/>
          <path d="M274.965 29.3613H263.725L247.305 46.2269H244.037V29.3613H235.747V50.2315V71.1788H244.037V54.2362H248.182H248.82L265.878 71.1788H277.276L255.356 49.3074L274.965 29.3613Z" fill="white"/>
          <path d="M287.318 63.1689V54.2355L322.391 53.8505V46.2263V37.2929C322.391 32.9032 318.724 29.2837 314.101 29.2837H300.709H287.318C282.775 29.2837 279.028 32.8262 279.028 37.2929V50.2309V63.1689C279.028 67.5586 282.695 71.1782 287.318 71.1782L322.391 70.7931V63.1689H287.318ZM287.318 37.2929H300.709H314.101V46.2263H304.854H287.318V37.2929Z" fill="white"/>
          <path d="M343.197 17.1182H340.008L334.907 23.2021V29.2861H328.61V37.2953L334.907 37.2183V63.1713C334.907 67.561 338.574 71.1805 343.197 71.1805L356.588 70.7955V63.1713H343.197V37.1413L357.784 36.9102V29.2861H343.197V17.1182Z" fill="white"/>
          <path d="M401.465 54.2355C401.465 49.8459 397.799 46.2263 393.175 46.2263H382.733H372.291V37.2929H401.465V29.6688L372.291 29.2837C367.748 29.2837 364.001 32.8262 364.001 37.2929V46.2263C364.001 50.616 367.668 54.2355 372.291 54.2355H382.733H393.175V63.1689H364.001V70.7931L393.175 71.1782C397.719 71.1782 401.465 67.6356 401.465 63.1689V54.2355Z" fill="white"/>
          <path d="M444.748 29.3613H431.357H417.966C413.422 29.3613 409.676 32.9039 409.676 37.3706V50.3086V63.2466C409.676 67.6362 413.342 71.2558 417.966 71.2558L453.038 70.8707V63.2466H417.966V54.3132L453.038 53.9281V46.3039V37.3706C453.038 32.9039 449.372 29.3613 444.748 29.3613ZM444.748 46.2269H417.966V37.2935H431.357H444.748V46.2269Z" fill="white"/>
          <path d="M496.401 29.3613L461.328 29.7464V37.3706H496.401V46.3039L461.328 46.689V54.3132V63.2466C461.328 67.6362 464.995 71.2558 469.618 71.2558H483.009H496.401C500.944 71.2558 504.691 67.7133 504.691 63.2466V50.3086V37.3706C504.611 32.9039 500.944 29.3613 496.401 29.3613ZM496.401 63.1695H483.009H469.618V54.2362H496.401V63.1695Z" fill="white"/>
          <path d="M525.415 37.1406L540.002 36.9096V29.2854H525.415V17.0405H522.226L517.125 23.1245V29.2084H510.828V37.2176L517.125 37.1406V63.0937C517.125 67.4833 520.791 71.1029 525.415 71.1029L538.806 70.7179V63.0937H525.415V37.1406Z" fill="white"/>
          <path d="M82.304 1.94578L68.833 0.0204849C68.4344 -0.0565269 68.0359 0.0974874 67.8764 0.251511L62.1373 7.49062C61.7387 7.95269 61.659 8.56879 61.8185 9.10788C61.9779 9.64696 61.4996 10.109 60.9416 10.032L56.2387 9.03086C55.5213 8.87684 54.7242 9.10789 54.246 9.72399L35.5938 32.8275C35.2749 33.2896 34.6372 33.4436 34.0793 33.2126L26.985 30.1321C26.3474 29.8241 25.63 29.9011 25.072 30.2861L21.485 32.6735C20.9271 33.0586 20.13 33.1356 19.4923 32.8275L17.7386 31.9804C16.6227 31.4413 15.2676 32.0574 14.9488 33.2126L13.6734 38.6804C13.3546 39.9896 13.9125 41.2989 15.1082 41.992L17.8183 43.6092L26.5068 48.769L30.7314 51.3104C31.9271 52.0035 33.4416 51.8495 34.4778 51.0023L41.572 44.9954C42.13 44.5333 43.0068 44.3793 43.6445 44.7644L45.7967 45.8426C46.5141 46.2276 47.3909 46.0736 47.9489 45.5345L51.5358 42.3C52.0938 41.7609 52.9706 41.6839 53.6083 41.992L58.9489 44.3793C59.746 44.7644 60.7025 44.5333 61.2605 43.8402L63.7315 40.7598L82.4634 17.5792C83.3402 16.501 82.7823 14.8838 81.3475 14.5757L77.2026 13.6516C76.3257 13.4975 75.9272 12.4194 76.5649 11.8033L83.0214 4.02509C83.6591 3.10095 83.2605 2.09981 82.304 1.94578Z" fill="#8257E6"/>
          <path d="M20.5287 48.6166C20.1301 48.3856 19.7316 48.7706 19.891 49.1557L21.8837 54.2385C22.0432 54.6235 22.0431 55.0086 21.9634 55.3937L20.2098 62.0167C20.1301 62.4787 20.2895 62.9408 20.6084 63.1718L25.6301 66.9454C26.1084 67.2535 26.7461 67.2535 27.1446 66.8685L32.4055 62.4017C32.7243 62.1707 33.1229 62.0167 33.4417 61.9397L39.42 61.3236C39.8186 61.2466 39.978 60.7075 39.5794 60.4764L20.5287 48.6166Z" fill="#8257E6"/>
          <path d="M18.7754 65.7112C18.4565 65.4802 17.9783 65.4032 17.5797 65.5572L13.3551 67.5595C13.116 67.6365 12.9565 67.8675 12.7971 68.0986L3.78984 89.5849C3.78984 89.6619 3.78984 89.6619 3.78984 89.7389C3.86955 89.8159 3.94926 89.8929 4.10868 89.8929L6.18115 89.1228C6.26087 89.1228 6.34057 89.1228 6.42028 89.1228C6.49999 89.1998 6.5797 89.3539 6.49999 89.4309L0.0434482 99.6735C-0.115972 99.9045 0.202876 100.136 0.362297 99.9045L23.7174 77.263C23.9566 77.032 24.0363 76.8009 24.116 76.4929L24.5942 70.6399C24.5942 70.2549 24.4348 69.9468 24.1957 69.7158L18.7754 65.7112Z" fill="#8257E6"/>
        </svg>
      </div>
    </body>
    </html>`;
}
