import { CogIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    // defineField({
    //   name: 'menuItems',
    //   title: 'Menu Item list',
    //   description: 'Links displayed on the header of your site.',
    //   type: 'array',
    //   of: [
    //     {
    //       title: 'Reference',
    //       type: 'reference',
    //       to: [
    //         {
    //           type: 'home',
    //         },
    //         {
    //           type: 'page',
    //         },
    //         {
    //           type: 'project',
    //         },
    //       ],
    //     },
    //   ],
    // }),
    defineField({
      name: 'text',
      type: 'array',
      hidden: true,
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Big', value: 'h2' },
            { title: 'Medium', value: 'h3' },
            { title: 'Paragraph', value: 'normal' },
            { title: 'Serif', value: 'serif' },
          ],
          marks: {
            decorators: [
              { title: 'Italic', value: 'em' },
              { title: 'Strong', value: 'strong' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Url',
                    validation: (Rule) =>
                      Rule.uri({
                        allowRelative: true,
                        scheme: ['http', 'https', 'mailto', 'tel', '/'],
                      }).error('This must be a valid URL or a mailto/tel link'),
                  },
                  {
                    title: 'Open in new tab',
                    name: 'blank',
                    type: 'boolean',
                    description: 'Click if want open link in new tab',
                  },
                ],
              },
            ],
          },
          lists: [],
        }),
      ],
      validation: (rule) => rule.max(155),
    }),

    defineField({
      name: 'image',
      title: 'Image',
      description: 'An image for prices page',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'pricesList',
      title: 'Prices',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text1',
              title: 'Month',
              type: 'string',
            },
            {
              name: 'text2',
              title: 'Price',
              type: 'string',
            },
            {
              name: 'text3',
              title: 'Period',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'additionalText',
      type: 'text',
    }),
    defineField({
      name: 'footer',
      description:
        'This is a block of text that will be displayed at the bottom of the page.',
      title: 'Footer Info',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Url',
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Displayed on social cards and search engine results.',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Menu Items',
      }
    },
  },
})
