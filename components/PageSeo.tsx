import { Helmet } from 'react-helmet-async'

interface PageSeoProps {
  title: string
  description: string
  canonical: string
  ogTitle?: string
  ogDescription?: string
}

export function PageSeo({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
}: PageSeoProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={ogTitle ?? title} />
      <meta property="og:description" content={ogDescription ?? description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="nl_BE" />
      <meta property="og:site_name" content="Mobile Coating" />
    </Helmet>
  )
}
