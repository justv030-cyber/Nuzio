import Brand from '../components/Brand'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

export default function Onboarding() {
  return (
    <div className="screen">
      <div className="glow" />

      <div className="content">
        <Brand />
        <Hero />
      </div>

      <Footer />
    </div>
  )
}
