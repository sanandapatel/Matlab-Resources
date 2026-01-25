import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import Logo from '../components/Logo'

export const metadata = {
  // Define your metadata here
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
  icons: {
    icon: '/logo1.png',
  },
}

const banner = <Banner storageKey="some-key">Boost your DSP skills with Matlab</Banner>
const navbar = (
  <Navbar
    // logo={<b>DSP Booster with Matlab</b>}
    logo={
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Logo />
        <b>Matlab Handbook for DSP</b>
      </div>
    }
    projectLink="https://github.com/sanandapatel/Matlab-Resources"
  // ... Your additional navbar options
  />
)
const footer = (
  <Footer>
    MIT {new Date().getFullYear()} © Matlab Handbook for DSP.
  </Footer>
)

export default async function RootLayout({ children }) {
  return (
    <html
      // Not required, but good for SEO
      lang="en"
      // Required to be set
      dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
    >
      <Head
        // ... Your additional head options
        color={{
          hue: 300,
          saturation: 78,
          lightness: {
            light: 37,
            dark: 63
          }
        }}
      >
        {/* Your additional tags should be passed as `children` of `<Head>` element */}
      </Head>
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          // docsRepositoryBase="https://github.com/sDaCoder/Matlab-Resources-DSP/tree/dev/matlab"
          docsRepositoryBase="https://github.com/sanandapatel/Matlab-Resources/tree/main/matlab"
          footer={footer}
          search={<Search />}
        // ... Your additional layout options
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}