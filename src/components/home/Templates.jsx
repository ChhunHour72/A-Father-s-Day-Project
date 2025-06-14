import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCardContext } from '../../context/useCardContext';
import TemplateVisual from '../../context/TemplateVisual';
import { FaArrowRight } from 'react-icons/fa';

const Templates = () => {
    const { templates, palettes, applyTemplate } = useCardContext();
    const navigate = useNavigate();

    // Select a few distinct templates to feature on the homepage
    const featuredTemplateIds = ['storyteller', 'gamer', 'khmer'];
    const featuredTemplates = featuredTemplateIds.map(id => ({
        id,
        ...templates[id]
    }));

    const handleSelectTemplate = (templateId) => {
        applyTemplate(templateId);
        navigate(`/editor?template=${templateId}`);
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        show: { 
            y: 0, 
            opacity: 1,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    const hoverEffect = {
        y: -10,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        transition: { duration: 0.3 }
    };

    return (
        <section className="templates py-24 bg-warm-light">
            <div className="container mx-auto px-4">
                <motion.div 
                    className="section-title text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-4">
                        Find Your Perfect Starting Point
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Each card is a canvas. Choose from our handcrafted templates to begin your story.
                    </p>
                </motion.div>
                
                <motion.div 
                    className="templates-grid grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {featuredTemplates.map((template) => {
                        const palette = palettes[template.colorPalette];
                        return (
                            <motion.div 
                                key={template.id}
                                className="template-card rounded-2xl overflow-hidden shadow-lg bg-white flex flex-col cursor-pointer group"
                                variants={itemVariants}
                                whileHover={hoverEffect}
                                onClick={() => handleSelectTemplate(template.id)}
                            >
                                <div className="h-80 w-full relative">
                                    <TemplateVisual visualType={template.visual} palette={palette} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-6">
                                        <h3 className="text-2xl font-bold text-white font-playfair">{template.name}</h3>
                                        <p className="text-white/80">{template.category}</p>
                                    </div>
                                </div>
                                <div className="p-6 flex-grow flex flex-col">
                                    <p className="text-gray-600 mb-4 flex-grow">{template.description}</p>
                                    <div className="text-secondary font-semibold flex items-center gap-2 group-hover:text-orange-600 transition-colors">
                                        Customize this Card <FaArrowRight />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
                
                <motion.div 
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                >
                    <Link 
                        to="/templates" 
                        className="bg-primary text-white py-3 px-8 rounded-full font-semibold text-lg shadow-md hover:bg-secondary transition-all duration-300 hover:-translate-y-1 inline-block"
                    >
                        Browse All Templates
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default Templates;
