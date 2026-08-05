import { MotionConfig } from "framer-motion";
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
        <Nav />
        <Hero />
        <About />
        <PhilosophyQuote />
        <Projects />
        <MinorProjects />
        <CrownPierce />
        <AchievementsGallery />
        <ResumeViewer />
        <SocialLinks />
        <Footer />
        <ChatWidget />
      </main>
    </MotionConfig>
  );
}
