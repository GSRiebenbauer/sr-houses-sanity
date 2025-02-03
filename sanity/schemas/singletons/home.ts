import { HomeIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon: HomeIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your personal website.',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'string',
    }),
    defineField({
      name: 'videoMobile',
      title: 'Video Mobile',
      type: 'string',
    }),
    defineField({
      name: 'videoPosterDesktopUrl',
      title: 'Video Poster Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'videoPosterMobileUrl',
      title: 'Video Poster Image | Mobile',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    // defineField({
    //   name: 'overview',
    //   description:
    //     'Used both for the <meta> description tag for SEO, and the personal website subheader.',
    //   title: 'Description',
    //   type: 'array',
    //   of: [
    //     // Paragraphs
    //     defineArrayMember({
    //       lists: [],
    //       marks: {
    //         annotations: [
    //           {
    //             name: 'link',
    //             type: 'object',
    //             title: 'Link',
    //             fields: [
    //               {
    //                 name: 'href',
    //                 type: 'url',
    //                 title: 'Url',
    //               },
    //             ],
    //           },
    //         ],
    //         decorators: [
    //           {
    //             title: 'Italic',
    //             value: 'em',
    //           },
    //           {
    //             title: 'Strong',
    //             value: 'strong',
    //           },
    //         ],
    //       },
    //       styles: [],
    //       type: 'block',
    //     }),
    //   ],
    //   validation: (rule) => rule.max(155).required(),
    // }),
    // defineField({
    //   name: 'showcaseProjects',
    //   title: 'Showcase projects',
    //   description:
    //     'These are the projects that will appear first on your landing page.',
    //   type: 'array',
    //   of: [
    //     defineArrayMember({
    //       type: 'reference',
    //       to: [{ type: 'project' }],
    //     }),
    //   ],
    // }),
    {
      name: 'contentBlocks',
      title: 'Content Blocks',
      type: 'array',
      of: [
        defineArrayMember({ type: 'textBlock' }), // Include textBlock
        defineArrayMember({ type: 'imageBlock' }), // Include imageBlock
        defineArrayMember({ type: 'mediaBlock' }), // Include mediaBlock
        defineArrayMember({ type: 'contentWithOverlay' }), // Include contentWithOverlay
        defineArrayMember({ type: 'contentWithOverlay2' }), // Include contentWithOverlay2
        defineArrayMember({ type: 'imageTextBlock' }), // Include imageTextBlock
        defineArrayMember({ type: 'infoBlock' }), // Include infoBlock
        defineArrayMember({ type: 'CTABlock' }), // Include infoBlock
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        subtitle: 'Home',
        title,
      }
    },
  },
})
