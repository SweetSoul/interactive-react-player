# React Player with interactive modals and customs controls
[![DemoLink](https://img.shields.io/badge/DEMO-online-brightgreen)](https://react-live-video-player.vercel.app/)
<br/>
This project is a use case! I've implemented custom controls and there is a feature for adding questions when the player reaches given timeframe.
<br/>
I've used 
* [ReactJS](https://reactjs.org) 
* [ChakraUI](https://chakra-ui.com/)
* [React Player](https://github.com/cookpete/react-player)
<br/>
If you want to test it locally clone the repository, enter it and run:
`npm start`
<br/>
Then access [localhost](http://localhost:3000) as you would in create-react-app developments.
<br/>
Most of the project is in English, but some parts are in pt-br.
<br/>
## How to use
<br/>
The usage is very simple, just follow the steps below.

![Steps](https://sweetsoul.sirv.com/Images/Github/CustomReactPlayer/demo.png)

1. Video URL (Paste any video URL accepted in [React Player](https://github.com/cookpete/react-player)
2. Checkbox to set the LiveMode (It's a Live?)
3. Use logo? (If unchecked removes the logo from the top right corner)
4. If Use logo is true, the shown logo will be the link in this input or if empty, the chakra UI logo.
5. Primary color to match the volume and time sliders, as well the `box-shadow` color when liveMode is ON.
6. Secondary color to use in text inside LiveMode Badge
7. Ask a question at certain given time. Input 1= Question to be asked >> Input 2= Time in seconds to be displayed.
8. Add new question inputs
<br/>
P.S.: The question in sending the answer to console for now.
