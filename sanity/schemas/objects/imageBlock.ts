import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'imageBlock',
  title: 'Image Block',
  type: 'object',
  fields: [
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Layout 1', value: 'layout1' },
          { title: 'Layout 2', value: 'layout2' },
          { title: 'Layout 3', value: 'layout3' },
          { title: 'Layout 4', value: 'layout4' },
        ],
      },
    }),
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
  ],
  preview: {
    select: {
      images: 'images',
    },
    prepare({ images }) {
      const imageCount = images ? images.length : 0
      const subtitle =
        imageCount > 0
          ? `${imageCount} image${imageCount > 1 ? 's' : ''}`
          : 'No images'

      return {
        title: 'Image Block',
        subtitle,
        media: images && images[0],
      }
    },
  },
})
