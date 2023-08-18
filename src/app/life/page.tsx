import React from 'react'
import lifePhotos from '@/life.json'

const Page = () => {
  return (
    <div>
      {lifePhotos.photos.map((photo) =>
        <div key={photo.title}>
          <h3>{photo.title}</h3>
        </div>)
      }
    </div>
  )
}

export default Page
