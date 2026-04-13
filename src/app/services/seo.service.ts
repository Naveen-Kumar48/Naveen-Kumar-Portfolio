import { Injectable, inject } from '@angular/core'
import { Meta, Title } from '@angular/platform-browser'
import { DOCUMENT } from '@angular/common'

interface SeoConfig {
  title: string
  description: string
  url?: string
  image?: string
  keywords?: string
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private meta = inject(Meta)
  private title = inject(Title)
  private document = inject(DOCUMENT)

  updateSeo(config: SeoConfig) {
    const fullTitle = config.title.includes('Naveen Kumar')
      ? config.title
      : `${config.title} | Naveen Kumar`

    this.title.setTitle(fullTitle)

    this.meta.updateTag({
      name: 'description',
      content: config.description
    })
    this.meta.updateTag({
      name: 'keywords',
      content:
        config.keywords ||
        'Full Stack Developer, React Developer India, Next.js, MERN, New Delhi'
    })

    // Open Graph
    this.meta.updateTag({
      property: 'og:title',
      content: fullTitle
    })
    this.meta.updateTag({
      property: 'og:description',
      content: config.description
    })
    this.meta.updateTag({
      property: 'og:url',
      content: config.url || 'https://naveenweb.site'
    })
    this.meta.updateTag({
      property: 'og:image',
      content: config.image || 'https://naveenweb.site/og-image.jpg'
    })
    this.meta.updateTag({
      property: 'og:type',
      content: 'website'
    })
    this.meta.updateTag({
      property: 'og:site_name',
      content: 'Naveen Kumar Portfolio'
    })

    // Twitter Card
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image'
    })
    this.meta.updateTag({
      name: 'twitter:title',
      content: fullTitle
    })
    this.meta.updateTag({
      name: 'twitter:description',
      content: config.description
    })
    this.meta.updateTag({
      name: 'twitter:image',
      content: config.image || 'https://naveenweb.site/og-image.jpg'
    })

    // Canonical URL
    let link: HTMLLinkElement | null =
      this.document.querySelector('link[rel=canonical]')
    if (!link) {
      link = this.document.createElement('link')
      link.setAttribute('rel', 'canonical')
      this.document.head.appendChild(link)
    }
    link.setAttribute(
      'href',
      config.url || 'https://naveenweb.site'
    )
  }

  // Legacy method for backward compatibility
  updateTags(config: {
    title?: string
    description?: string
    image?: string
    url?: string
    keywords?: string
  }) {
    const siteTitle = 'Naveen Kumar | Full Stack Developer & MERN Specialist'
    const finalTitle = config.title ? `${config.title} | Naveen Kumar` : siteTitle

    this.title.setTitle(finalTitle)

    // Meta Tags
    if (config.description) {
      this.meta.updateTag({ name: 'description', content: config.description })
      this.meta.updateTag({ property: 'og:description', content: config.description })
      this.meta.updateTag({ name: 'twitter:description', content: config.description })
    }

    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords })
    }

    if (config.image) {
      this.meta.updateTag({ property: 'og:image', content: config.image })
      this.meta.updateTag({ name: 'twitter:image', content: config.image })
    }

    if (config.url) {
      this.meta.updateTag({ property: 'og:url', content: config.url })
      this.meta.updateTag({ property: 'og:title', content: finalTitle })
      this.meta.updateTag({ name: 'twitter:title', content: finalTitle })
      this.updateCanonicalUrl(config.url)
    }
  }

  private updateCanonicalUrl(url: string) {
    let link: HTMLLinkElement | null = this.document.querySelector("link[rel='canonical']")
    if (!link) {
      link = this.document.createElement('link')
      link.setAttribute('rel', 'canonical')
      this.document.head.appendChild(link)
    }
    link.setAttribute('href', url)
  }

  setSchema(schema: any) {
    let script = this.document.querySelector('#schema-jsonld') as HTMLScriptElement
    if (!script) {
      script = this.document.createElement('script')
      script.id = 'schema-jsonld'
      script.type = 'application/ld+json'
      this.document.head.appendChild(script)
    }
    script.text = JSON.stringify(schema)
  }
}
