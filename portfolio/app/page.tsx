import { MotionConfig } from "framer-motion";
import Fullpage, { FullpageSection } from "@/components/Fullpage";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import PhilosophyQuote from "@/components/PhilosophyQuote";
import Projects from "@/components/Projects";
import MinorProjects from "@/components/MinorProjects";
import CrownPierce from "@/components/CrownPierce";
import AchievementsGallery from "@/components/AchievementsGallery";
import ResumeViewer from "@/components/ResumeViewer";
import SocialLinks from "@/components/SocialLinks";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="relative">
        <Fullpage>
          <Nav />
          <FullpageSection id="home" className="bg-off-white">
            <Hero />
          </FullpageSection>
          <FullpageSection id="about" className="bg-off-white">
            <About />
          </FullpageSection>
          <FullpageSection id="philosophy" className="bg-white">
            <PhilosophyQuote />
          </FullpageSection>
          {/* Projects renders its own full-screen slides (intro + one per project) */}
          <Projects />
          <FullpageSection id="minor-projects">
            <MinorProjects />
          </FullpageSection>
          <FullpageSection id="crown-pierce" className="bg-white">
            <CrownPierce />
          </FullpageSection>
          <FullpageSection id="achievements">
            <AchievementsGallery />
          </FullpageSection>
          <FullpageSection id="resume" className="bg-white">
            <ResumeViewer />
          </FullpageSection>
          <FullpageSection id="contact" className="bg-off-white">
            <SocialLinks />
          </FullpageSection>
          <FullpageSection id="footer" className="flex items-center bg-white">
            <Footer />
          </FullpageSection>
          <ChatWidget />
        </Fullpage>
      </main>
    </MotionConfig>
  );
}
