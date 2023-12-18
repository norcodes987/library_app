import React from 'react'
import { Carousel } from './Components/Carousel'
import { ExploreTopBooks } from './Components/ExploreTopBooks'
import { Heroes } from './Components/Heroes'
import { LibraryServices } from './Components/LibraryServices'

const HomePage = () => {
  return (
    <div>
      <ExploreTopBooks />
      <Carousel />
      <Heroes />
      <LibraryServices />
    </div>
  )
}

export default HomePage