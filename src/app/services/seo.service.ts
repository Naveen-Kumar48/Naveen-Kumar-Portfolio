import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class SeoService {
    private title = inject(Title);
    private meta = inject(Meta);
    private document = inject(DOCUMENT);

    updateTags(config: {
        title?: string;
        description?: string;
        image?: string;
        url?: string;
        keywords?: string;
    }) {
        const siteTitle = 'Naveen Kumar | Full Stack Developer & MERN Specialist';
        const finalTitle = config.title ? `${config.title} | Naveen Kumar` : siteTitle;

        this.title.setTitle(finalTitle);

        // Meta Tags
        if (config.description) {
            this.meta.updateTag({ name: 'description', content: config.description });
            this.meta.updateTag({ property: 'og:description', content: config.description });
            this.meta.updateTag({ name: 'twitter:description', content: config.description });
        }

        if (config.keywords) {
            this.meta.updateTag({ name: 'keywords', content: config.keywords });
        }

        if (config.image) {
            this.meta.updateTag({ property: 'og:image', content: config.image });
            this.meta.updateTag({ name: 'twitter:image', content: config.image });
        }

        if (config.url) {
            this.meta.updateTag({ property: 'og:url', content: config.url });
            this.meta.updateTag({ property: 'og:title', content: finalTitle });
            this.meta.updateTag({ name: 'twitter:title', content: finalTitle });
            this.updateCanonicalUrl(config.url);
        }
    }

    private updateCanonicalUrl(url: string) {
        let link: HTMLLinkElement | null = this.document.querySelector("link[rel='canonical']");
        if (!link) {
            link = this.document.createElement('link');
            link.setAttribute('rel', 'canonical');
            this.document.head.appendChild(link);
        }
        link.setAttribute('href', url);
    }

    setSchema(schema: any) {
        let script = this.document.querySelector('#schema-jsonld') as HTMLScriptElement;
        if (!script) {
            script = this.document.createElement('script');
            script.id = 'schema-jsonld';
            script.type = 'application/ld+json';
            this.document.head.appendChild(script);
        }
        script.text = JSON.stringify(schema);
    }
}
