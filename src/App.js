import './App.css';
import React, { useState } from 'react'; // Make sure to import useState
import Quilljs from './Editor/main.js';
import Background from './Background/Background';
import { Box, ThemeProvider } from '@mui/material';
import { FullScreen, useFullScreenHandle } from "react-full-screen"
import Themes from './Themes/Themes.js';

function App() {
  const handle = useFullScreenHandle();

  //opacity slider
  const [opacity, setOpacity] = useState(90);  //100 is default opacity

  const [background, setBackground] = useState('/videos/deep-space.mp4'); // Default background

  const [editorBgColor, setEditorBgColor] = useState('#20122b'); // Default Quill Editor Background Color

  const [editorOuterColor, setEditorOuterColor] = useState('darkblue'); // Default Outer Box Color

  const [editorInnerColor, setEditorInnerColor] = useState('#20122b'); // Default Inner Box Color

  //function to update the editor's background depending on the theme
  const changeEditorTheme = (theme) => {

    const themeBackgrounds = {
        space: '/videos/deep-space.mp4',
        warm: '/videos/fireplace.mp4',
        rain: '/videos/rainy-window.mp4',
        cafe: '/images/cafe.jpg',
    };
    //update the background video
    setBackground(themeBackgrounds[theme] || '/videos/deep-space.mp4');

    //map the themes with the respective colors
    const themeColors = {
      space: '#20122b',
      warm: 'darkred',
      rain: 'lightblue',
      cafe: '#A28C6B',
    };
    //update the background color
    setEditorBgColor(themeColors[theme] || '#20122b');

    const themeOuter = {
      space: 'darkblue',
      warm: 'black',
      rain: 'steelblue',
      cafe: 'tan',
    };
    //update the outer box of the theme
    setEditorOuterColor(themeOuter[theme] || 'darkblue');

    const themeInner = {
      space: '#20122b',
      warm: 'darkred',
      rain: 'lightblue',
      cafe: '#A28C6B',
    };
    //update the inner box of the theme
    setEditorInnerColor(themeInner[theme] || '#20122b');
  };

  return (
    <FullScreen handle={handle}>
    <div className="App">
      <Background src={background} />
      <header className="App-header" style={{ opacity: opacity / 100}}> 
      <ThemeProvider
          theme={{
              palette: {
                  primary: {
                      //main: '#65B6EF',
                      main: '#EEEEEE',
                      border: '#000000',
                  },
              },
          }} 
          >
          {/*first box is for the outer border surrounding the editor */}
          <Box
              sx={{
              //width: "50%",
              height: "100%",
              margin: 1,
              borderRadius: 2,
              border: '3px solid primary.border',
              bgcolor: editorOuterColor,
              padding: 3,
            //   opacity: .95,
              }}
          >
              {/*second box contains the actual editor */}
              <Box sx={{ 
              bgcolor: editorInnerColor,
              }}>
                <Quilljs editorBgColor={ editorBgColor } />
              </Box>
          </Box>
        </ThemeProvider>
        </header>
        <button id="fullscreentoggle" onClick={!handle.active ? handle.enter : handle.exit}>
          Toggle fullscreen (temp button)
        </button>
        {/* opacity slider*/}
        <div style={{ position: 'fixed', left: '5%', top: '10%', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
            <input
                type="range"
                min="0"
                max="100"
                value={opacity}
                onChange={(e) => setOpacity(e.target.value)}
                style={{ '--value': opacity, marginBottom: '10px' }}
            />
            <span>Adjust Editor Opacity</span>
        </div>
        <Themes onChangeTheme={changeEditorTheme}></Themes>
    </div>
    </FullScreen>
  );
}

export default App;