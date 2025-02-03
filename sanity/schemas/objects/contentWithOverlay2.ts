import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'contentWithOverlay2',
  title: 'Content with Overlay 2',
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
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'text',
      type: 'array',
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
      name: 'overlayTab',
      title: 'Overlay Tab',
      type: 'object',
      fields: [
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
        }),
        defineField({
          name: 'text',
          type: 'array',
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
                          }).error(
                            'This must be a valid URL or a mailto/tel link',
                          ),
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
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'list',
          title: 'List',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'text1',
                  title: 'Text 1',
                  type: 'text',
                }),
                defineField({
                  name: 'text2',
                  title: 'Text 2',
                  type: 'text',
                }),
              ],
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      headline: 'headline',
      image: 'image',
      overlayHeadline: 'overlayTab.headline',
    },
    prepare({ headline, image, overlayHeadline }) {
      return {
        title: headline || overlayHeadline || 'No headline',
        subtitle: 'Content with Overlay 2',
        media: image,
      }
    },
  },
})
