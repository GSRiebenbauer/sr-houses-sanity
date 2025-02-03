'use client'
/**
 * This config is used to set up Sanity Studio that's mounted on the `app/studio/[[...index]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { media } from 'sanity-plugin-media'

import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/lib/api'
import * as resolve from '@/sanity/plugins/resolve'
import { pageStructure, singletonPlugin } from '@/sanity/plugins/settings'
import page from '@/sanity/schemas/documents/page'
import project from '@/sanity/schemas/documents/project'
import duration from '@/sanity/schemas/objects/duration'
import milestone from '@/sanity/schemas/objects/milestone'
import timeline from '@/sanity/schemas/objects/timeline'
import home from '@/sanity/schemas/singletons/home'
import settings from '@/sanity/schemas/singletons/settings'
import textBlock from '@/sanity/schemas/objects/textBlock'
import imageBlock from '@/sanity/schemas/objects/imageBlock'
import mediaBlock from '@/sanity/schemas/objects/mediaBlock'
import contentWithOverlay from '@/sanity/schemas/objects/contentWithOverlay'
import contentWithOverlay2 from '@/sanity/schemas/objects/contentWithOverlay2'
import imageTextBlock from '@/sanity/schemas/objects/imageTextBlock'
import infoBlock from '@/sanity/schemas/objects/infoBlock'
import CTABlock from '@/sanity/schemas/objects/CTABlock'

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'SR Houses'

export default defineConfig({
  basePath: studioUrl,
  projectId: projectId || '',
  dataset: dataset || '',
  title,
  schema: {
    // If you want more content types, you can add them to this array
    types: [
      // Singletons
      home,
      settings,
      // Documents
      duration,
      page,
      project,
      // Objects
      milestone,
      timeline,
      textBlock,
      imageBlock,
      mediaBlock,
      contentWithOverlay,
      contentWithOverlay2,
      imageTextBlock,
      infoBlock,
      CTABlock,
    ],
  },
  plugins: [
    structureTool({
      structure: pageStructure([home, settings]),
    }),
    media(),
    presentationTool({
      resolve,
      previewUrl: {
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([home.name, settings.name]),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
