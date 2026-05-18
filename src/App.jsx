import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroImage from "./assets/hero.PNG";
import {
  GitBranch,
  Mail,
  Code2,
  BriefcaseBusiness,
  Car,
  TrainFront,
  TriangleAlert,
  Palette,
  Cpu,
  FolderGit2,
  ArrowUpRight,
  X,
  ExternalLink,
  Zap,
} from "lucide-react";

// Robust Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Portfolio Critical Error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#02040A] text-white flex flex-col items-center justify-center p-10 text-center">
          <h1 className="text-4xl font-black mb-4">Application Error</h1>
          <p className="text-slate-400 mb-8 max-w-md">
            {this.state.error?.message || "An unexpected error occurred."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-indigo-600 rounded-2xl font-black uppercase tracking-wider hover:bg-indigo-500 transition-all"
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Safe Icon Component
const SafeIcon = ({ icon: Icon, ...props }) => {
  if (!Icon) return null;
  return <Icon {...props} />;
};

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    },
  },
};

const hoverEffect = {
  whileHover: { y: -8, scale: 1.02, transition: { duration: 0.3 } },
  whileTap: { scale: 0.98 },
};

// UI Components
const Card = ({ children, className = "" }) => (
  <div className={`group relative overflow-hidden border border-white/10 backdrop-blur-xl bg-slate-900/40 rounded-[2.5rem] transition-all duration-700 hover:border-indigo-500/50 ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    <div className="relative z-10">{children}</div>
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-8 md:p-12 ${className}`}>{children}</div>
);

const Button = ({ children, className = "", asChild = false, variant = "default", ...props }) => {
  const variants = {
    default: "bg-indigo-600 text-white hover:bg-indigo-500 shadow-2xl shadow-indigo-500/20",
    outline: "border-slate-800 bg-white/5 text-white hover:bg-white/10 hover:border-slate-700 backdrop-blur-md",
  };
  const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-2xl px-10 py-5 text-base font-black transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 uppercase tracking-widest";
  const combinedClassName = `${baseStyles} ${variants[variant] || variants.default} ${className}`;

  const content = (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full h-full flex items-center justify-center">
      {children}
    </motion.div>
  );

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: `${combinedClassName} ${children.props.className || ""}`,
      ...props
    });
  }
  return <button className={combinedClassName} {...props}>{children}</button>;
};

// Data
const projects = [
  {
    title: "Sloot — Freelance Marketplace",
    shortDescription: "A mediator business platform connecting customers with freelance service providers.",
    description: "Sloot is a comprehensive ecosystem designed to bridge the gap between skilled freelancers and local clients. The platform focuses on seamless service discovery and secure transactions.",
    features: ["Real-time booking", "Dynamic service categorization", "Secure payment vision", "In-app communication"],
    techStack: ["Flutter", "Firebase", "Node.js"],
    tags: ["Flutter", "Firebase", "Marketplace"],
    icon: BriefcaseBusiness,
    color: "from-blue-600 to-indigo-700",
    stats: { status: "Prototype", efficiency: "+40%" }
  },
  {
    title: "Sri Krishna Cars",
    shortDescription: "A car consultancy admin system designed to manage inventory and leads.",
    description: "A high-performance administrative dashboard tailored for automotive consultancies. It streamlines the entire sales funnel from vehicle acquisition to lead management.",
    features: ["Inventory management", "CRM lead tracking", "Automated quotes", "Business analytics"],
    techStack: ["React", "Firebase", "Tailwind CSS"],
    tags: ["Business", "Admin Panel", "Firebase"],
    icon: Car,
    color: "from-emerald-600 to-teal-700",
    stats: { uptime: "99.9%", leads: "Automated" }
  },
];

const hardwareProjects = [
  {
    title: "Wireless Railway Gate Automation",
    shortDescription: "IoT automation using LoRa and ESP32-CAM for railway safety.",
    description: "A life-saving project using long-range (LoRa) communication to detect oncoming trains and automatically operate gates with visual verification.",
    features: ["LoRa Wireless", "Servo Gate Control", "ESP32-CAM monitoring", "Fail-safe protocols"],
    techStack: ["ESP32", "LoRa SX1278", "C++"],
    tags: ["IoT", "LoRa", "Automation"],
    icon: TrainFront,
    color: "from-orange-600 to-red-700",
    stats: { range: "2km+", accuracy: "99.8%" }
  },
  {
    title: "Smart Disaster Monitoring System",
    shortDescription: "Prototype using ESP32 and GPS for landslide and fire detection.",
    description: "An environmental monitoring network designed for rugged terrain. Predicts landslides and forest fires, broadcasting GPS coordinates of danger zones.",
    features: ["Multi-sensor array", "GPS location tracking", "WiFi mesh networking", "SMS early warning"],
    techStack: ["ESP32", "GPS Module", "Blynk IoT"],
    tags: ["Safety", "ESP32", "Sensors"],
    icon: TriangleAlert,
    color: "from-purple-600 to-indigo-700",
    stats: { sensors: "6-Axis", latency: "<500ms" }
  },
];

const skills = [
  { title: "Programming", items: ["C", "Java", "Verilog HDL"], icon: Code2 },
  { title: "Frameworks", items: ["Flutter", "Firebase", "React"], icon: Cpu },
  { title: "Hardware", items: ["ESP32", "Microcontrollers", "LoRa"], icon: Cpu },
  { title: "Design", items: ["Adobe Illustrator", "Branding", "UI Design"], icon: Palette },
];

function SectionHeader({ title, subtitle, centered = false }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeUp}
      className={`mb-20 md:mb-32 ${centered ? "text-center flex flex-col items-center" : ""}`}
    >
      <motion.h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-tight">{title}</motion.h2>
      {subtitle && <p className="text-slate-400 max-w-2xl text-xl md:text-2xl leading-relaxed font-medium">{subtitle}</p>}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: centered ? 120 : 160 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="h-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mt-10"
      />
    </motion.div>
  );
}

function ProjectCard({ project, onClick }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      {...hoverEffect}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card className="h-full">
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-10 md:gap-16">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              className={`p-6 md:p-8 rounded-[2rem] bg-gradient-to-br ${project.color} text-white shadow-2xl h-fit w-fit flex-shrink-0`}
            >
              <SafeIcon icon={project.icon} size={40} className="md:w-16 md:h-16" />
            </motion.div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-3xl md:text-5xl font-black text-white group-hover:text-indigo-400 transition-colors tracking-tight">{project.title}</h3>
                <SafeIcon icon={ArrowUpRight} className="text-slate-600 group-hover:text-indigo-400 transition-colors" size={32} />
              </div>
              <p className="text-slate-400 leading-relaxed text-xl md:text-2xl mb-10 font-medium">{project.shortDescription}</p>
              <div className="flex flex-wrap gap-4">
                {project.tags.map(tag => (
                  <span key={tag} className="px-6 py-2 rounded-2xl text-xs md:text-sm font-bold uppercase tracking-widest bg-white/5 text-slate-300 border border-white/10 group-hover:border-indigo-500/30 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 backdrop-blur-3xl bg-black/90"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 40, opacity: 0 }}
        className="relative max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-slate-950 border border-white/10 rounded-[3rem] shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-8 right-8 p-4 rounded-2xl bg-white/5 text-slate-400 hover:text-white transition-all z-20"><SafeIcon icon={X} size={24}/></button>

        <div className="p-8 md:p-20">
          <div className="flex flex-col md:flex-row gap-12 items-start mb-16">
            <div className={`p-8 rounded-[2.5rem] bg-gradient-to-br ${project.color} text-white shadow-2xl`}><SafeIcon icon={project.icon} size={64} /></div>
            <div className="flex-1">
              <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-tight">{project.title}</h2>
              <div className="flex flex-wrap gap-4">
                {project.techStack?.map(tech => (
                  <span key={tech} className="flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-sm font-black uppercase tracking-widest">
                    <SafeIcon icon={Zap} size={16} /> {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-16">
              <section>
                <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-4"><div className="h-8 w-2 rounded-full bg-indigo-500"/>Overview</h3>
                <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-medium">{project.description}</p>
              </section>
              <section>
                <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-4"><div className="h-8 w-2 rounded-full bg-indigo-500"/>Key Features</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {project.features.map((f, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="p-6 rounded-3xl bg-white/5 border border-white/5 text-slate-300 font-bold text-lg flex items-center gap-4">
                      <div className="h-2 w-2 rounded-full bg-indigo-500" /> {f}
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>
            <div className="space-y-10">
              <div className="p-10 rounded-[2.5rem] bg-indigo-600/5 border border-indigo-500/10 shadow-inner">
                <h4 className="text-indigo-400 font-black uppercase tracking-[0.2em] text-sm mb-8">Performance</h4>
                <div className="space-y-8">
                  {Object.entries(project.stats || {}).map(([key, value]) => (
                    <div key={key}>
                      <div className="text-slate-500 text-xs font-black uppercase tracking-widest mb-2">{key}</div>
                      <div className="text-3xl font-black text-white">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
              <Button className="w-full py-7 text-xl rounded-[2rem]"><SafeIcon icon={ExternalLink} className="mr-4" /> View Case Study</Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SkillBox({ skill }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} {...hoverEffect}>
      <Card className="h-full">
        <CardContent className="p-10 md:p-14">
          <div className="flex items-center gap-6 mb-12">
            <div className="p-5 rounded-3xl bg-indigo-500/10 text-indigo-400 shadow-inner"><SafeIcon icon={skill.icon} size={32} /></div>
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">{skill.title}</h3>
          </div>
          <ul className="space-y-6">
            {skill.items.map(item => (
              <motion.li key={item} whileHover={{ x: 10 }} className="flex items-center gap-5 text-slate-400 font-bold text-xl transition-colors hover:text-white">
                <div className="h-2.5 w-2.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />{item}
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function SanthoshPortfolio() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <main className="min-h-screen bg-[#02040A] text-slate-300 selection:bg-indigo-500 selection:text-white overflow-x-hidden font-sans">
      <AnimatePresence>{selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}</AnimatePresence>

      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15], x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full bg-indigo-600/20 blur-[150px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1], x: [0, -40, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] rounded-full bg-blue-600/20 blur-[150px]"
        />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 p-6 md:px-12 backdrop-blur-xl bg-[#02040A]/60 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-black text-white tracking-tighter flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-lg shadow-lg shadow-indigo-500/20">S</div>
            SANTHOSH<span className="text-indigo-500">.</span>
          </motion.div>
          <div className="hidden md:flex items-center gap-12">
            {['Projects', 'Hardware', 'Skills'].map((item, i) => (
              <motion.a
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors"
              >
                {item}
              </motion.a>
            ))}
            <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} href="https://linkedin.com/in/santhosh-ak-2508" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-all hover:scale-110">
              <SafeIcon icon={ExternalLink} size={22} />
            </motion.a>
          </div>
          <Button asChild variant="outline" className="px-8 py-3 text-sm rounded-2xl border-white/10"><a href="mailto:santhoshak2508@gmail.com">Contact Me</a></Button>
        </div>
      </nav>

      <section className="relative z-10 px-6 py-40 md:py-64 max-w-7xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row items-center gap-12 mb-20">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="relative h-44 w-44 md:h-56 md:w-56 rounded-[3.5rem] overflow-hidden border-2 border-indigo-500/30 shadow-2xl shadow-indigo-500/30 bg-indigo-600 flex items-center justify-center"
            >
              <img
                src={heroImage}
                alt="Santhosh"
                className="absolute inset-0 h-full w-full object-cover z-10"
                onError={(e) => { e.target.style.opacity = '0'; }}
              />
              <div className="text-7xl md:text-9xl font-black text-white/20 select-none">S</div>
            </motion.div>
            <div>
              <motion.h1 variants={fadeUp} className="text-7xl md:text-[10rem] font-black tracking-tighter text-white leading-[0.9]">
                Santhosh<span className="text-indigo-500">.</span>
              </motion.h1>
              <motion.div variants={fadeUp} className="mt-8 flex items-center gap-5 text-slate-400 font-bold text-xl md:text-2xl">
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400"><SafeIcon icon={Mail} size={24} /></div>
                <a href="mailto:santhoshak2508@gmail.com" className="hover:text-white transition-colors">santhoshak2508@gmail.com</a>
              </motion.div>
            </div>
          </motion.div>

          <motion.h2 variants={fadeUp} className="text-5xl md:text-[7rem] font-black leading-[1] md:leading-[0.95] tracking-tight text-white max-w-5xl mb-16">
            Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-500 to-purple-500">Intelligent</span> Systems.
          </motion.h2>

          <motion.p variants={fadeUp} className="max-w-3xl text-2xl md:text-4xl text-slate-400 leading-relaxed font-medium mb-20">
            Final-year ECE student specializing in building seamless bridges between complex hardware and modern software ecosystems.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-8">
            <Button asChild className="rounded-[2rem]"><a href="mailto:santhoshak2508@gmail.com"><SafeIcon icon={Mail} className="mr-4" size={24} /> Contact Me</a></Button>
            <Button asChild variant="outline" className="rounded-[2rem]"><a href="https://github.com/Xosv08" target="_blank" rel="noreferrer"><SafeIcon icon={GitBranch} className="mr-4" size={24} /> GitHub Profile</a></Button>
          </motion.div>
        </motion.div>
      </section>

      <section id="projects" className="px-6 py-40 max-w-7xl mx-auto relative z-10">
        <SectionHeader title="Projects" subtitle="Scalable platforms built with a focus on high-performance architecture." />
        <div className="grid gap-16">{projects.map(p => <ProjectCard key={p.title} project={p} onClick={() => setSelectedProject(p)} />)}</div>
      </section>

      <section id="hardware" className="px-6 py-40 bg-slate-950/40 relative z-10 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="Hardware" subtitle="IoT and embedded engineering prototypes." />
          <div className="grid md:grid-cols-2 gap-12">{hardwareProjects.map(p => <ProjectCard key={p.title} project={p} onClick={() => setSelectedProject(p)} />)}</div>
        </div>
      </section>

      <section id="skills" className="px-6 py-40 max-w-7xl mx-auto relative z-10">
        <SectionHeader title="Expertise" centered subtitle="Deep technical stack across software and hardware." />
        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">{skills.map(s => <SkillBox key={s.title} skill={s} />)}</div>
      </section>

      <footer className="border-t border-white/5 px-6 py-32 text-center relative z-10 bg-slate-950/60">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-wrap justify-center gap-12 md:gap-16 mb-20 px-6">
          <motion.a variants={fadeUp} className="flex items-center gap-4 text-slate-500 hover:text-white font-black text-xl md:text-2xl transition-all" href="mailto:santhoshak2508@gmail.com">CONTACT <SafeIcon icon={Mail} className="text-indigo-500" /></motion.a>
          <motion.a variants={fadeUp} className="flex items-center gap-4 text-slate-500 hover:text-white font-black text-xl md:text-2xl transition-all" href="https://github.com/Xosv08" target="_blank" rel="noreferrer">GITHUB <SafeIcon icon={ArrowUpRight} className="text-indigo-500" /></motion.a>
          <motion.a variants={fadeUp} className="flex items-center gap-4 text-slate-500 hover:text-white font-black text-xl md:text-2xl transition-all" href="https://linkedin.com/in/santhosh-ak-2508" target="_blank" rel="noreferrer">LINKEDIN <SafeIcon icon={ArrowUpRight} className="text-indigo-500" /></motion.a>
        </motion.div>
        <p className="text-sm font-black text-slate-700 uppercase tracking-[0.5em] mb-4">Crafted by Santhosh AK</p>
        <p className="text-xs font-bold text-slate-800 uppercase tracking-widest">© 2026 • Engineered for Excellence</p>
      </footer>
    </main>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <SanthoshPortfolio />
    </ErrorBoundary>
  );
}
