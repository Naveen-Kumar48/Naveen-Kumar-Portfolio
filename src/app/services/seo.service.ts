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
        [
          // Branded
          'Naveen Kumar', 'Naveen Kumar MERN', 'Naveen Kumar developer',
          'Naveen Kumar portfolio', 'Naveen Kumar full stack',
          // Hire Intent
          'hire MERN developer India', 'hire full stack developer Delhi',
          'hire React developer India', 'hire Next.js developer India',
          'MERN stack developer for hire', 'full stack developer for hire India',
          // Superlative
          'top React developer India', 'best Next.js developer India',
          'best MERN developer Delhi NCR', 'best full stack developer India',
          'experienced MERN developer India', 'senior React developer India',
          // Tech + Location
          'full stack developer Delhi NCR', 'MERN stack developer Delhi',
          'React.js developer Delhi India', 'Node.js backend developer India',
          'MongoDB developer India', 'TypeScript developer India',
          'Express.js developer India', 'Angular developer India',
          'JavaScript developer India',
          // AI
          'AI SaaS developer India', 'AI web developer India',
          'SaaS platform developer India',
          // Freelance
          'freelance web developer Delhi NCR', 'freelance React developer India',
          'freelance MERN developer India', 'remote developer India',
          // Portfolio
          'full stack web developer India portfolio', 'MERN developer portfolio India',
          'developer portfolio India', 'GitHub developer India',
          // NCR Cities
          'React developer Noida', 'React developer Gurgaon',
          'full stack developer Noida', 'full stack developer Gurgaon',
          // Project Types
          'e-commerce developer India', 'REST API developer India',
          'backend developer India', 'frontend developer India'
        ].join(', ')
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
      content: config.image || 'https://naveenweb.site/og-image.png'
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
      content: config.image || 'https://naveenweb.site/og-image.png'
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
