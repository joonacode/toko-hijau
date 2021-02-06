import * as React from 'react'
import { Box, ChakraProvider, Container } from '@chakra-ui/react'
import {
  Navbar,
  Footer,
  ColorModeSwitcher,
  ScrollToTop,
  MenuMobile,
} from './components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Home, DetailProduct, Cart } from './pages'
import theme from './theme'
import './assets/styles/global.css'
import PageNotFound from './pages/PageNotFound'
import Payment from './pages/Payment'

export const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <ScrollToTop />
        <Box
          position='fixed'
          right='0'
          top='200px'
          display={{ base: 'none', md: 'block' }}
        >
          <ColorModeSwitcher />
        </Box>
        <Navbar />
        <MenuMobile />
        <Container mt='30px' maxW={{ base: '95%', lg: '80%' }}>
          <Switch>
            <Route exact={true} path='/' component={Home} />
            <Route path='/detail/:slug' component={DetailProduct} />
            <Route path='/payment/:status' component={Payment} />
            <Route path='/cart' component={Cart} />
            <Route path='*' component={PageNotFound} />
          </Switch>
        </Container>
        <Footer />
      </Router>
    </ChakraProvider>
  )
}
