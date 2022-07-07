# ScandiWeb-testTask

ScandiWeb test task taking into account feedback.

Explanation of some features of the task that I did after the feedback.

- >Attribute selection can be hide and shown only on clicking add to cart icon. It will be better.

I don't understand this point fully because how person can select attributes if he sees him only clicking add to cart icon.
That's why I removed them fully and when you click add to cart you add with defaults attributes. I did how you recommend in React FAQ.

- >Product cards should go per grid always

For all categories I used `display:grid`. If I understood you correctly I removed `justify-content:center` to make grid more clearly.

- >Nav bar categories should not be hardcoded.

I did the same as with currencies. If they can't be hardcoded now they come from endpoint.

- >Avoid interacting with DOM elements through document API

I removed everywhere document API and replaced with `ref`. I left it only in `addPading` function in `lib/functions.ts`. 
To get a width of the scroll it's the only way and the same with `document.body` it's the only way to refer to it.

Tech stack:
- React
- Typescript
- Redux
- Styled-components
- @tilework/opus

Link to app: https://stellular-travesseiro-7f8550.netlify.app/
