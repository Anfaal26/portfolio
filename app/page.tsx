import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Education from '@/components/Education'
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
      <Education />
      <Projects />
      <SkillsEducation />
      <Contact />
      <Footer />
    </>
  )
}
