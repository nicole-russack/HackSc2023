import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'

// components
import Home from './components/Home'

const theme = createTheme({
    palette: {
        primary: {
            light: '#addedd',
            main: '#36b3ae',
            dark: '#00857c',
        },
        secondary: {
            light: '#fbebef',
            main: '#b3363a',
            dark: '#a22f31',
        }
    }
})

class App extends React.Component {

    render() {
        return (
            <div
                style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
                <ThemeProvider theme={theme}>
                    <BrowserRouter>
                        <Routes>

                            {/* Routes */}
                            <Route path='/' element={<Home />} />

                        </Routes>
                    </BrowserRouter>
                </ThemeProvider>
            </div>
        )
    }
}

export default App