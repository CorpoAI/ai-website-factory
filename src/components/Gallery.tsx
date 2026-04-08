import { urlForImage } from '@/lib/sanity'

interface GalleryImage {
  _key: string
  asset: any
  alt?: string
  caption?: string
}

interface GalleryProps {
  title?: string
  images?: GalleryImage[]
}

export default function Gallery({ title = "Gallery", images = [] }: GalleryProps) {
  if (images.length === 0) {
    return null
  }

  return (
    <section className="py-20 px-8 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div 
            key={image._key || index} 
            className="aspect-square overflow-hidden rounded-lg bg-gray-200 group relative"
          >
            {image.asset && (
              <img
                src={urlForImage(image.asset).width(400).height(400).url()}
                alt={image.alt || 'Gallery image'}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
            )}
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-white text-sm">{image.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}