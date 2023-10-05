import { Helmet } from 'react-helmet-async'

type MetaProps = {
  title?: string
  description?: string
  keywords?: string
}

const DEFAULT_TITLE = 'Welcome to Rockshop'
const DEFAULT_DESCRIPTION = 'We sell the best music instruments for rock music'
const DEFAULT_KEYWORDS =
  'Guitars, Basses, Drums, Pedals, Rock, music instruments'

function Meta({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
}: MetaProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  )
}

export default Meta
