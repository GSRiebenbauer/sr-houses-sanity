import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'mediaBlock',
  title: 'Media Block',
  type: 'object',
  fields: [
    defineField({
      name: 'padding',
      title: 'Padding',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
        ],
      },
    }),
    defineField({
      name: 'paddingTop',
      title: 'Padding top',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
        ],
      },
    }),
    defineField({
      name: 'backgroundWhite',
      title: 'White Background',
      type: 'boolean',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      validation: (Rule) => Rule.max(2),
      of: [
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
    defineField({
      name: 'text1',
      title: 'Text 1',
      type: 'string',
    }),
    defineField({
      name: 'soundOrVideo1',
      title: 'Video?',
      type: 'boolean',
    }),
    defineField({
      name: 'videoSrc1',
      title: 'Video Source 1',
      type: 'string',
    }),
    defineField({
      name: 'text2',
      title: 'Text 2',
      type: 'string',
    }),
    defineField({
      name: 'soundOrVideo2',
      title: 'Video?',
      type: 'boolean',
    }),
    defineField({
      name: 'videoSrc2',
      title: 'Video Source 2',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      images: 'images',
      videoSrc1: 'videoSrc1',
      videoSrc2: 'videoSrc2',
    },
    prepare({ images, videoSrc1, videoSrc2 }) {
      const imageCount = images ? images.length : 0
      const subtitle = `Images: ${imageCount}, Videos: ${[videoSrc1, videoSrc2].filter(Boolean).length}`

      return {
        title: 'Media Block',
        subtitle,
        media: images && images[0],
      }
    },
  },
})
