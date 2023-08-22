import React from 'react'
import lifePhotos from '@/life.json'
import Image from 'next/image'

const Page = () => {
  return (
    <div>
      {lifePhotos.photos.map((photo) =>
        <div key={photo.title}>
          <h3>{photo.title}</h3>
          <Image
            src={photo.src}
            alt={photo.title}
            width={photo.width}
          />
        </div>)
      }
    </div>
  )
}

export default Page
