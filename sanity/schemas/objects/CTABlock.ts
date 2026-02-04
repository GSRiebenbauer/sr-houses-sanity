import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'CTABlock',
  title: 'CTA Block',
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
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      headline: 'headline',
      text: 'link',
    },
    prepare({ headline, text }) {
      const textPreview = text

      return {
        title: headline || 'No headline',
        subtitle: textPreview || 'No text',
      }
    },
  },
})
