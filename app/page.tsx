import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import SkillsEducation from '@/components/SkillsEducation'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <SkillsEducation />
      <Contact />
      <Footer />
    </>
  )
}
