import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'contentWithOverlay',
  title: 'Content with Overlay',
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
      name: 'imageDescription_1',
      title: 'Image Description | Left',
      type: 'text',
    }),
    defineField({
      name: 'imageDescription_2',
      title: 'Image Description | Right',
      type: 'text',
    }),
    defineField({
      name: 'imageLink_1',
      title: 'Image Link 1',
      type: 'string',
    }),
    defineField({
      name: 'imageLink_2',
      title: 'Image Link 2',
      type: 'string',
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
          name: 'locations',
          title: 'Locations',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Name',
                  type: 'string',
                }),
                defineField({
                  name: 'time',
                  title: 'Time',
                  type: 'string',
                }),
              ],
            },
          ],
        }),
        defineField({
          name: 'overlayImage',
          title: 'Overlay Image',
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
      headline: 'headline',
      image: 'image',
      overlayHeadline: 'overlayTab.headline',
    },
    prepare({ headline, overlayHeadline }) {
      return {
        title: headline || overlayHeadline || 'No headline',
        subtitle: 'Content with Overlay',
      }
    },
  },
})
