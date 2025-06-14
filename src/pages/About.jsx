import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaCode, FaPaintBrush, FaRocket, FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';
import { SiVite, SiTailwindcss } from 'react-icons/si';
import AnimatedNumber from '../components/ui/AnimatedNumber';
import TechIcon from '../components/ui/TechIcon';

// Import images from the assets folder
import img from '../assets/image.png';

const About = () => {
  // Animation variants for Framer Motion
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
    viewport: { once: true, amount: 0.2 }
  };

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    viewport: { once: true, amount: 0.2 }
  };

  return (
    <div className="bg-gradient-to-b from-warm-light to-warm-medium min-h-screen overflow-hidden relative">
      {/* Decorative background shapes */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-secondary/5 rounded-full animate-pulse"></div>
      <div className="absolute bottom-40 -right-20 w-72 h-72 bg-accent/5 rounded-full animate-pulse animation-delay-4000"></div>

      <div className="container mx-auto py-24 px-4 relative z-10">
        {/* === HEADER === */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-primary mb-4">
            The Story Behind the Card
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A personal project driven by love, creativity, and a little bit of code.
          </p>
          <div className="w-28 h-1.5 bg-gradient-to-r from-secondary to-orange-600 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {/* === OUR STORY SECTION (IMPROVED LAYOUT) === */}
        <motion.section
          className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 items-center mb-24"
          initial="initial"
          whileInView="whileInView"
          variants={staggerContainer}
        >
          <motion.div
            className="rounded-2xl shadow-custom-hover overflow-hidden group lg:order-last"
            variants={fadeIn}
          >
            <img
              src={img}
              alt="Me and my Dad"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x800/f9e4d0/2c3e50?text=You+%26+Your+Dad'; }}
            />
          </motion.div>
          <motion.div className="prose lg:prose-lg max-w-none" variants={fadeIn}>
            <h2 className="font-playfair text-4xl font-bold text-primary mb-4">The Inspiration</h2>
            <p>
              This Father's Day card project started with a simple desire: to create a truly special and personalized card for my amazing dad. I wanted to build something that would allow anyone to express their love in a unique and heartfelt way.
            </p>
            <p>
              It became a journey of learning, designing, and coding—fueled by many cups of coffee and the goal of making something my dad would be proud of. This site is the result of that passion.
            </p>
            <h2 className="font-playfair text-4xl font-bold text-secondary mt-8 mb-4">Our Mission</h2>
            <p>
              To provide an intuitive and enjoyable platform where creating a beautiful, personalized Father's Day card is as joyful as receiving one. We believe the best gifts come from the heart, and we're here to help you share yours.
            </p>
          </motion.div>
        </motion.section>

        {/* === PROJECT TIMELINE (VERTICAL DESIGN) === */}
        <motion.section className="mb-24" {...staggerContainer}>
            <h2 className="text-4xl font-playfair font-bold text-center text-primary mb-16">Project Journey</h2>
            <div className="relative max-w-2xl mx-auto">
              {/* The vertical line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-1 h-full bg-orange-200 rounded-full"></div>
                {[
                    { icon: <FaPaintBrush/>, title: "Concept & Design", description: "Sketching ideas and designing a user-friendly interface." },
                    { icon: <FaCode/>, title: "Development", description: "Bringing the designs to life with React and Tailwind CSS." },
                    { icon: <FaRocket/>, title: "Features & Polish", description: "Adding templates, the editor, and interactive elements." },
                    { icon: <FaHeart/>, title: "Launch!", description: "Sharing the project for everyone to enjoy and celebrate their dads." }
                ].map((item, index) => (
                    <motion.div key={index} className="flex items-center w-full mb-8" {...fadeIn}>
                      {/* Alternating layout */}
                      <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left order-2'}`}>
                        <h3 className="text-xl font-bold text-primary mb-1">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                      <div className="w-1/2 flex justify-center order-1">
                          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-orange-500 text-white flex items-center justify-center text-3xl shadow-lg border-4 border-warm-light z-10">
                              {item.icon}
                          </div>
                      </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>

        {/* === FUN FACTS & TECH STACK === */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          <motion.div {...fadeIn}>
            <h2 className="text-4xl font-playfair font-bold text-primary mb-8">By The Numbers</h2>
            <div className="grid grid-cols-2 gap-6">
                {[
                    { value: 1500, label: "Lines of Code" },
                    { value: 96, label: "Hours Spent" },
                    { value: 4, label: "Core Templates" },
                    { value: 1, label: "Very Proud Dad" }
                ].map(fact => (
                    <div key={fact.label} className="bg-white p-6 rounded-2xl shadow-md text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                        <p className="text-4xl lg:text-5xl font-bold text-secondary transition-colors duration-300 group-hover:text-orange-600">
                            <AnimatedNumber end={fact.value}>+</AnimatedNumber>
                        </p>
                        <p className="text-gray-600 font-semibold mt-1">{fact.label}</p>
                    </div>
                ))}
            </div>
          </motion.div>

          <motion.div {...fadeIn}>
            <h2 className="text-4xl font-playfair font-bold text-primary mb-8">Tech Stack</h2>
            <div className="grid grid-cols-3 gap-4">
              <TechIcon icon={<FaReact />} label="React" />
              <TechIcon icon={<SiVite />} label="Vite" />
              <TechIcon icon={<SiTailwindcss />} label="Tailwind CSS" />
            </div>
          </motion.div>
        </section>

        {/* === MEET THE DEVELOPER === */}
        <motion.section 
            className="bg-white rounded-2xl shadow-custom p-10"
            {...fadeIn}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.img 
                src="https://i.pinimg.com/736x/67/9e/75/679e75bc3b21bbbba410908b2f220ba1.jpg"
                alt="Developer"
                className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-warm-light"
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/200x200/2c3e50/f9e4d0?text=You'; }}
                whileHover={{ scale: 1.1, rotate: 3 }}
            />
            <div className='flex-1 text-center md:text-left'>
                <h3 className="text-3xl font-playfair font-bold text-primary">Meet the Developer</h3>
                <p className="text-gray-600 mt-2 mb-4">
                    Hi, I'm Chhunhour. I'm a passionate promt engineer who loves building things for the web. This project was a labor of love and made from my heart, and I hope you enjoy using it!
                </p>
                <div className="flex justify-center md:justify-start gap-4 text-2xl">
                    <motion.a href="https://github.com/chhunhour72" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors" whileHover={{ scale: 1.2, y: -2 }}><FaGithub /></motion.a>
                    <motion.a href="https://www.linkedin.com/in/long-chhun-hour-979962316/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors" whileHover={{ scale: 1.2, y: -2 }}><FaLinkedin /></motion.a>
                </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;
