import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Mail,
  Copy,
  Check,
  Calendar,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  Award,
  Briefcase,
  Zap,
  MessageSquare,
  CheckCircle2,
  Volume2,
  VolumeX,
  Send,
  Globe,
  X,
  Film,
  Smartphone,
  Monitor,
  ChevronDown,
  ShoppingBag,
  Code2,
  Wrench,
  Terminal,
  Cpu,
  Linkedin,
  Facebook,
  Camera,
  Upload
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getVideoFromIndexedDB } from './utils/videoDb.ts';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Typing effect roles
const ROLES = [
  'BSCS Graduate (Major in Programming)',
  'Technical Virtual Assistant',
  'IT Support & Systems Specialist',
  'Digital Communication & Chat Specialist',
  'Calendar & Inbox Zero Manager',
  'Google Skillshop AI Certified'
];

interface SkillItem {
  id: string;
  name: string;
  category: 'programming' | 'it' | 'administrative' | 'communication' | 'ai';
  icon: string;
  description: string;
  tools: string[];
  level: string;
}

const SKILLS_DATA: SkillItem[] = [
  {
    id: 'programming',
    name: 'BSCS Programming & Scripting',
    category: 'programming',
    icon: '💻',
    description: 'Bachelor of Science in Computer Science degree with major in programming. Scripting automation workflows, API connectors, web logic, and data structuring.',
    tools: ['JavaScript / TypeScript', 'Python', 'Web APIs', 'Automation Scripts'],
    level: 'BSCS Major in Programming'
  },
  {
    id: 'it-support',
    name: 'IT Support & Systems Diagnostics',
    category: 'it',
    icon: '🛠️',
    description: 'Hardware and software troubleshooting, operating systems triage (macOS, Windows, iOS), network connectivity diagnosis, SaaS provisioning, and remote setup.',
    tools: ['Hardware Diagnostics', 'Windows & macOS', 'Network Triage', 'SaaS Admin'],
    level: 'Core Technical Skill'
  },
  {
    id: 'admin',
    name: 'Technical & Operational Support',
    category: 'administrative',
    icon: '📅',
    description: 'Calendar management across conflicting time zones, daily inbox triage to reach Inbox Zero, task coordination on Asana and Trello, and weekly metrics.',
    tools: ['Google Calendar', 'Gmail', 'Asana', 'Trello'],
    level: '1+ yr at One Up Media'
  },
  {
    id: 'comm',
    name: 'Digital Communication & Customer Chat',
    category: 'communication',
    icon: '💬',
    description: 'Managed 500+ client inquiries across 8+ model accounts and 3 agency & brand accounts with sub-2-minute response targets, 96%+ satisfaction rating, and CRM logging.',
    tools: ['Zendesk', 'CRM Systems', 'Live Chat', 'Slack'],
    level: '8+ Models & 3 Agencies'
  },
  {
    id: 'ai-ads',
    name: 'Google Skillshop AI Ads Certified',
    category: 'ai',
    icon: '🎯',
    description: 'Certified in AI-Powered Performance Ads and Shopping Ads (August 2026). Selected by Google to test upcoming AI features in Google Workspace.',
    tools: ['Google Skillshop', 'Performance Ads', 'Shopping Ads', 'Workspace AI'],
    level: 'Certified Aug 2026'
  },
  {
    id: 'automation',
    name: 'Practical AI & Workflow Automation',
    category: 'ai',
    icon: '⚡',
    description: 'Using Gemini AI, Zapier, and Make.com to summarize hour-long meetings into concise action items, draft routine replies, and connect everyday tools.',
    tools: ['Gemini AI', 'Zapier', 'Make.com', 'Google Docs'],
    level: 'Practical & Active'
  }
];

export default function App() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Navigation state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeStoryStage, setActiveStoryStage] = useState(0);

  // Typing effect state
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Email & Social copy state
  const [copied, setCopied] = useState(false);
  const [copiedSocial, setCopiedSocial] = useState<string | null>(null);

  // Repeating Finalized Video Background state
  const [videoMotionEnabled, setVideoMotionEnabled] = useState(true);
  const [customVideoUrl, setCustomVideoUrl] = useState<string | null>(null);
  const videoBgRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Audio effect state
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Credential Modal
  const [selectedCert, setSelectedCert] = useState<{
    title: string;
    issuer: string;
    date: string;
    desc: string;
    skills: string[];
    credentialId: string;
    isDegree?: boolean;
  } | null>(null);

  // Finalized Technical Workspace & Hardware Rig Specs
  const workspaceSpecs = useMemo(() => ({
    title: "Paulo's Technical Workspace & Rig",
    subtitle: 'Daily Hardware & Tech Stack',
    hardwareHeadline: 'iPhone 13 & Windows 11 Pro multi-screen workstation for rapid response & IT monitoring',
    phone: 'Apple iPhone 13 (High-priority communications, chat alerts & mobile authentication)',
    windowsRig: 'Windows 11 Pro Workstation (System diagnostics, Asana dashboards, terminal & IT monitoring)',
    displays: 'Ultra-wide primary curved monitor + auxiliary diagnostic displays',
    ecosystem: 'Windows 11 Pro + Apple iOS + Google Workspace cloud sync',
    quote: 'My approach is simple: keep communication direct, eliminate bottlenecks, leverage my BSCS programming and IT support background, and get tasks done accurately on time.'
  }), []);

  // Helper to ensure assets resolve properly on GitHub Pages and custom subpaths
  const getAsset = (relPath: string) => {
    const base = import.meta.env.BASE_URL || './';
    const clean = relPath.replace(/^\//, '');
    return base.endsWith('/') ? `${base}${clean}` : `${base}/${clean}`;
  };

  // Permanent official portrait source using your newly uploaded photo
  const currentPhotoSrc = useMemo(() => {
    try {
      const saved = localStorage.getItem('paulo_portfolio_custom_photo');
      if (saved) return saved;
    } catch {
      // fallback
    }
    return getAsset('images/paulo-red-suit.jpg');
  }, []);

  // Finalized workspace photo source
  const workspacePhotoSrc = useMemo(() => {
    return getAsset('images/paulo-workspace.jpg');
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Technical Virtual Assistant & IT Support',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Live Manila time
  const [pauloTime, setPauloTime] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setPauloTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Load any previously persisted video if available
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const storedBlob = await getVideoFromIndexedDB();
        if (storedBlob && active) {
          const url = URL.createObjectURL(storedBlob);
          setCustomVideoUrl(url);
        }
      } catch {
        // ignore
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // Ensure background video plays repeatedly
  useEffect(() => {
    if (videoBgRef.current && videoMotionEnabled) {
      videoBgRef.current.play().catch(() => {
        // Autoplay may be restricted until user gesture; muted helps bypass this
      });
    }
  }, [customVideoUrl, videoMotionEnabled]);

  // Web Audio subtle sound effects
  const playSubtleClick = () => {
    if (!soundEnabled) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.07);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.07);
    } catch {
      // Audio blocked without user gesture
    }
  };

  // Typewriter effect
  useEffect(() => {
    const currentFullText = ROLES[roleIndex];
    const typingSpeed = isDeleting ? 35 : 75;
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentFullText.length) {
          setTimeout(() => setIsDeleting(true), 2500);
        }
      } else {
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  // Repeating luxury particle and ambient lighting loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      opacity: number;
      hue: number;
    }> = [];

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.6,
        speedY: -(Math.random() * 0.4 + 0.12),
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.15,
        hue: Math.random() > 0.65 ? 42 : 158 // Gold and emerald glimmer
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 85%, 60%, ${p.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsla(${p.hue}, 85%, 60%, 0.8)`;
        ctx.fill();
      });
      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // GSAP ScrollTrigger JS Fallback for browsers not supporting CSS view-timeline
  useEffect(() => {
    const supportsViewTimeline =
      typeof window !== 'undefined' &&
      'CSS' in window &&
      Boolean(window.CSS.supports && window.CSS.supports('animation-timeline: view()'));

    if (supportsViewTimeline) {
      return;
    }

    const scroller = scrollContainerRef.current;
    if (!scroller) return;

    const ctx = gsap.context(() => {
      gsap.to('.hero-shrink-target', {
        scale: 0.85,
        y: -60,
        opacity: 0.2,
        filter: 'blur(8px)',
        scrollTrigger: {
          trigger: '#stage-0',
          scroller: scroller,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      gsap.fromTo(
        '.clip-reveal-target',
        { clipPath: 'ellipse(28% 18% at 50% 50%)', opacity: 0.4 },
        {
          clipPath: 'ellipse(120% 120% at 50% 50%)',
          opacity: 1,
          scrollTrigger: {
            trigger: '#stage-1',
            scroller: scroller,
            start: 'top bottom',
            end: 'center center',
            scrub: true
          }
        }
      );

      gsap.fromTo(
        '.image-zoom-target',
        { scale: 1.35, filter: 'brightness(0.4) blur(4px)' },
        {
          scale: 1,
          filter: 'brightness(1) blur(0px)',
          scrollTrigger: {
            trigger: '#stage-2',
            scroller: scroller,
            start: 'top bottom',
            end: 'center center',
            scrub: true
          }
        }
      );

      gsap.fromTo(
        '.kinetic-title-target',
        { y: 70, opacity: 0, filter: 'blur(6px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          scrollTrigger: {
            trigger: '#stage-2',
            scroller: scroller,
            start: 'top bottom',
            end: 'top center',
            scrub: true
          }
        }
      );
    }, scroller);

    return () => ctx.revert();
  }, []);

  // Update active story stage on scroll
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scroller = e.currentTarget;
    const scrollPos = scroller.scrollTop;
    const height = scroller.clientHeight || window.innerHeight;
    const stage = Math.round(scrollPos / height);
    if (stage !== activeStoryStage) {
      setActiveStoryStage(stage);
    }
  };

  const scrollToStage = (stageIdx: number) => {
    playSubtleClick();
    const scroller = scrollContainerRef.current;
    if (scroller) {
      const height = scroller.clientHeight || window.innerHeight;
      scroller.scrollTo({ top: stageIdx * height, behavior: 'smooth' });
    }
  };

  const handleCopyEmail = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigator.clipboard.writeText('paulopenaflor55@gmail.com');
    setCopied(true);
    playSubtleClick();
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyLink = (url: string, key: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    navigator.clipboard.writeText(url);
    setCopiedSocial(key);
    playSubtleClick();
    setTimeout(() => setCopiedSocial(null), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSubtleClick();
    const mailtoUrl = `mailto:paulopenaflor55@gmail.com?subject=${encodeURIComponent(
      `[${formData.service}] ${formData.subject || 'Portfolio Inquiry'}`
    )}&body=${encodeURIComponent(
      `Hi Paulo,\n\nMy Name: ${formData.name}\nEmail: ${formData.email}\nService Interested: ${formData.service}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoUrl;
    setFormSubmitted(true);
  };

  const STORY_STAGES = [
    { id: 'stage-0', name: 'Overview & Tech' },
    { id: 'stage-1', name: 'Hardware & Rig' },
    { id: 'stage-2', name: 'Impact & Accounts' },
    { id: 'stage-3', name: 'Certifications & Degree' },
    { id: 'stage-4', name: 'Direct Contact' }
  ];

  return (
    <div className="bg-black text-white font-body selection:bg-white selection:text-black h-screen overflow-hidden relative">
      {/* Background Ambient Glowing Lights */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-emerald-950/20 rounded-full blur-[140px] animate-ambient-glow" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-amber-950/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-neutral-900/40 rounded-full blur-[120px]" />
      </div>

      {/* Finalized Repeating Video Background Layer - plays repeatedly on loop */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {videoMotionEnabled && (
          <video
            ref={videoBgRef}
            key={customVideoUrl || 'finalized-loop'}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-opacity duration-1000 scale-105"
            style={{ opacity: 0.55 }}
          >
            {customVideoUrl && <source src={customVideoUrl} type="video/mp4" />}
            <source src={getAsset('Video.mp4')} type="video/mp4" />
            <source src={getAsset('videos/motion.mp4')} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/40 to-black/90 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,78,59,0.15)_0%,rgba(0,0,0,0.8)_80%,#000000_100%)] z-10" />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70" />
        <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] z-10" />
      </div>

      {/* Floating Header */}
      <header className="fixed top-5 left-0 right-0 z-50 px-6 sm:px-12 flex justify-between items-center pointer-events-none">
        {/* Brand Logo */}
        <button
          onClick={() => scrollToStage(0)}
          className="pointer-events-auto w-11 h-11 liquid-glass rounded-2xl flex items-center justify-center font-heading italic text-2xl text-white hover:scale-105 transition-transform cursor-pointer"
        >
          P
        </button>

        {/* Story Progress Indicator */}
        <nav className="pointer-events-auto hidden md:flex items-center liquid-glass px-3 py-1.5 gap-2 rounded-full shadow-2xl">
          {STORY_STAGES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => scrollToStage(idx)}
              className={`px-3 py-1 text-xs font-medium tracking-wide rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                activeStoryStage === idx
                  ? 'bg-white/20 text-white font-semibold shadow-inner'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  activeStoryStage === idx ? 'bg-emerald-400' : 'bg-white/30'
                }`}
              />
              <span>{s.name}</span>
            </button>
          ))}
          <button
            onClick={() => scrollToStage(4)}
            className="ml-2 px-3.5 py-1 rounded-full bg-white text-black font-semibold text-xs hover:bg-white/90 transition-all flex items-center gap-1 cursor-pointer"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </nav>

        {/* Action Controls */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Sound toggle */}
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              playSubtleClick();
            }}
            title={soundEnabled ? 'Mute audio feedback' : 'Enable audio feedback'}
            className="w-10 h-10 liquid-glass rounded-full hidden sm:flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-white/40" />
            )}
          </button>

          {/* Mobile menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-11 h-11 liquid-glass rounded-2xl flex flex-col items-center justify-center gap-1.5 focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation"
          >
            <span
              className={`w-5 h-0.5 bg-white transition-all ${
                mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-white transition-all ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-white transition-all ${
                mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-5 text-xl font-medium transition-all duration-300 md:hidden z-40 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-6 right-6 p-2 text-white/60 hover:text-white cursor-pointer"
        >
          <X className="w-7 h-7" />
        </button>

        {STORY_STAGES.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => {
              scrollToStage(idx);
              setMobileMenuOpen(false);
            }}
            className="text-white/80 hover:text-white text-2xl font-heading italic cursor-pointer"
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Mandatory Snapping Scroll Container */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="story-scroll-container w-full h-full relative z-10"
      >
        {/* ========================================================
            STAGE 1: OVERVIEW & TECH STACK (HERO SECTION)
            ======================================================== */}
        <section id="stage-0" className="story-section px-6 lg:px-12">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center hero-shrink-target">
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              {/* Badges */}
              <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <div className="inline-flex items-center liquid-glass rounded-full p-1 pl-3 text-xs text-white/90 gap-2.5 border border-white/10">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="bg-white text-black px-2.5 py-0.5 rounded-full font-semibold text-[11px] tracking-tight">
                    Available Now
                  </span>
                  <span className="pr-2 text-white/80 font-light hidden sm:inline">
                    Remote Technical VA & IT Support
                  </span>
                </div>

                <div className="inline-flex items-center liquid-glass px-3 py-1 rounded-full text-xs text-emerald-300 border border-emerald-500/20 gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-mono text-[11px]">BSCS Graduate · Programming Major</span>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.92] tracking-tight">
                Hi, I'm{' '}
                <span className="text-white/90 underline decoration-white/20 underline-offset-8">
                  Paulo Peñaflor
                </span>
              </h1>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 -mt-2">
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono">
                  Paulo Valeroso Peñaflor
                </span>
                <span className="text-white/40 text-xs">•</span>
                <span className="text-xs text-white/60 font-mono">
                  BS in Computer Science (Major in Programming)
                </span>
              </div>

              {/* Dynamic Typewriter */}
              <div className="text-xl sm:text-2xl font-light text-white/80 h-9 flex items-center justify-center lg:justify-start">
                <span className="text-white/50 mr-2 text-lg">Focus:</span>
                <span className="font-medium text-white border-r-2 border-emerald-400 pr-1 animate-pulse">
                  {displayText}
                </span>
              </div>

              {/* Bio highlighting BSCS, IT Support, VA */}
              <p className="text-white/80 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                I'm Paulo Peñaflor, a BSCS graduate (Major in Programming), Technical Virtual Assistant, and IT Support Specialist. With a solid Computer Science background, I combine technical diagnostics, automation scripting, and organizational discipline to manage calendars across conflicting time zones, troubleshoot systems, achieve Inbox Zero, and optimize operations for fast-moving teams.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => scrollToStage(4)}
                  className="liquid-glass-strong rounded-full px-6 py-2.5 text-sm font-medium text-white flex items-center gap-2 hover:bg-white/15 transition-all shadow-lg cursor-pointer"
                >
                  <span>Get In Touch</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => scrollToStage(1)}
                  className="liquid-glass rounded-full px-6 py-2.5 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Tech Rig</span>
                  <ChevronDown className="w-4 h-4 text-emerald-400 animate-bounce" />
                </button>
              </div>

              {/* Proof highlights */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-white/70">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>BSCS Programming Major</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-purple-400" />
                  <span>IT Support Diagnostics</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>8+ Model Accounts</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>3 Agency Brands</span>
                </div>
              </div>
            </div>

            {/* Right Card with Permanent Official Portrait */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-xs sm:max-w-sm group">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-white/20 via-emerald-500/10 to-transparent blur-md opacity-70 group-hover:opacity-100 transition duration-700" />
                <div className="relative liquid-card p-4">
                  <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-neutral-900 shadow-2xl">
                    <img
                      src={currentPhotoSrc}
                      alt="Paulo Peñaflor"
                      className="w-full h-full object-cover object-top transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />

                    <div className="absolute top-3 left-3 pointer-events-none">
                      <span className="liquid-glass text-[11px] font-medium px-3 py-1 rounded-full text-white/90 backdrop-blur-md border border-white/10">
                        Official Portrait
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                      <div className="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-0.5">
                        Paulo Peñaflor
                      </div>
                      <div className="text-white text-sm font-heading italic leading-tight">
                        BSCS Graduate · Technical VA & IT Support
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            STAGE 2: PAULO'S TECHNICAL WORKSPACE & HARDWARE RIG (WINDOWS)
            ======================================================== */}
        <section id="stage-1" className="story-section px-6 lg:px-12">
          <div className="max-w-6xl mx-auto w-full clip-reveal-target">
            <div className="liquid-card p-6 sm:p-10 border border-white/15 bg-neutral-950/80 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
              {/* Header */}
              <div className="pb-6 border-b border-white/10">
                <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 block mb-1">
                  {workspaceSpecs.subtitle}
                </span>
                <h2 className="text-3xl sm:text-5xl font-heading italic text-white">
                  {workspaceSpecs.title}
                </h2>
              </div>

              {/* Workspace Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6">
                {/* Finalized Workspace photo */}
                <div className="lg:col-span-5 relative group">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-900 border border-white/10 shadow-xl">
                    <img
                      src={workspacePhotoSrc}
                      alt="Paulo's Technical Workspace"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3 pointer-events-none">
                      <span className="text-[11px] font-mono text-emerald-400">
                        Dual Monitor & Windows Workstation
                      </span>
                    </div>
                  </div>
                </div>

                {/* Finalized Hardware Specs & Windows Rig */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="p-3.5 rounded-xl liquid-glass border border-emerald-500/20">
                    <span className="text-xs text-emerald-400 font-semibold block mb-0.5">
                      Core Hardware Configuration:
                    </span>
                    <p className="text-white text-base sm:text-lg font-medium">
                      {workspaceSpecs.hardwareHeadline}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white/80">
                    {/* Mobile Hub */}
                    <div className="liquid-glass p-3 rounded-xl flex items-start gap-2.5">
                      <Smartphone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-medium">Mobile Hub:</strong>
                        <span>{workspaceSpecs.phone}</span>
                      </div>
                    </div>

                    {/* Windows Rig - requested by user */}
                    <div className="liquid-glass p-3 rounded-xl flex items-start gap-2.5 border border-sky-500/20 bg-sky-950/10">
                      <Cpu className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-medium">Windows Rig:</strong>
                        <span>{workspaceSpecs.windowsRig}</span>
                      </div>
                    </div>

                    {/* Displays */}
                    <div className="liquid-glass p-3 rounded-xl flex items-start gap-2.5">
                      <Monitor className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-medium">Screen Architecture:</strong>
                        <span>{workspaceSpecs.displays}</span>
                      </div>
                    </div>

                    {/* Cloud & Connectivity */}
                    <div className="liquid-glass p-3 rounded-xl flex items-start gap-2.5">
                      <Globe className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-medium">Cloud & OS Connectivity:</strong>
                        <span>{workspaceSpecs.ecosystem}</span>
                      </div>
                    </div>
                  </div>

                  {/* Personal Work Quote */}
                  <blockquote className="p-4 rounded-xl liquid-glass border-l-2 border-emerald-400 text-white/90 italic text-sm leading-relaxed">
                    "{workspaceSpecs.quote}"
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            STAGE 3: THE ACCOUNTS & IMPACT MATRIX (IMAGE ZOOM & KINETIC TYPOGRAPHY)
            ======================================================== */}
        <section id="stage-2" className="story-section px-6 lg:px-12">
          <div className="max-w-6xl mx-auto w-full space-y-8">
            <div className="text-center space-y-3 kinetic-title-target">
              <span className="text-xs uppercase font-mono tracking-widest text-emerald-400">
                Scale & Track Record
              </span>
              <h2 className="text-4xl sm:text-6xl font-heading italic text-white">
                Accounts & Operational Impact
              </h2>
              <p className="text-white/60 text-sm sm:text-base font-light max-w-2xl mx-auto">
                Proven benchmarks delivered across high-touch remote operations, client management, and technical environments.
              </p>
            </div>

            {/* Big Stat Cards with zoom effect */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 image-zoom-target">
              <div className="liquid-card p-6 text-center group border border-emerald-500/20 bg-emerald-950/10">
                <div className="text-4xl sm:text-6xl font-heading italic text-emerald-400 mb-1">8+</div>
                <div className="text-white font-medium text-sm">Model Accounts</div>
                <div className="text-[11px] text-white/50 mt-1">Direct Client Management</div>
              </div>

              <div className="liquid-card p-6 text-center group border border-amber-500/20 bg-amber-950/10">
                <div className="text-4xl sm:text-6xl font-heading italic text-amber-300 mb-1">3</div>
                <div className="text-white font-medium text-sm">Agency & Brand Accounts</div>
                <div className="text-[11px] text-white/50 mt-1">Cross-brand Operations</div>
              </div>

              <div className="liquid-card p-6 text-center group">
                <div className="text-4xl sm:text-6xl font-heading italic text-white mb-1">1+</div>
                <div className="text-white font-medium text-sm">Yr at One Up Media</div>
                <div className="text-[11px] text-white/50 mt-1">Virtual Assistant (2023 – Present)</div>
              </div>

              <div className="liquid-card p-6 text-center group">
                <div className="text-4xl sm:text-6xl font-heading italic text-white mb-1">96%+</div>
                <div className="text-white font-medium text-sm">Satisfaction Benchmark</div>
                <div className="text-[11px] text-white/50 mt-1">&lt;2 Min Response Target</div>
              </div>
            </div>

            {/* Experience Narrative with IT and Programming depth */}
            <div className="liquid-card p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-white/80 font-light leading-relaxed">
              <div>
                <h4 className="text-white text-base font-medium mb-2 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-emerald-400" />
                  <span>One Up Media (Technical Virtual Assistant)</span>
                </h4>
                <p>
                  Coordinating calendars across conflicting time zones, daily inbox triage to reach Inbox Zero, sprint task management on Asana/Trello, handling SaaS tool administration, and preparing weekly performance rollups.
                </p>
              </div>

              <div>
                <h4 className="text-white text-base font-medium mb-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-400" />
                  <span>Digital Communication Services (Chatter & Support)</span>
                </h4>
                <p>
                  Handled customer conversations across 8+ model accounts and 3 agency brands with sub-2-minute response targets, logging context in CRM, troubleshooting user software issues, and refining templates for faster, clearer communication.
                </p>
              </div>
            </div>

            {/* Practical Skills & Technical Foundations */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {SKILLS_DATA.map((skill) => (
                <div key={skill.id} className="liquid-glass p-3 rounded-xl text-center space-y-1">
                  <div className="text-lg">{skill.icon}</div>
                  <div className="text-[11px] text-white font-medium leading-tight">{skill.name}</div>
                  <div className="text-[10px] text-emerald-400">{skill.level}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            STAGE 4: COMPUTER SCIENCE DEGREE, IT SUPPORT & CERTIFICATIONS
            ======================================================== */}
        <section id="stage-3" className="story-section px-6 lg:px-12">
          <div className="max-w-6xl mx-auto w-full space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase font-mono tracking-widest text-emerald-400">
                Education & Credentials
              </span>
              <h2 className="text-4xl sm:text-6xl font-heading italic text-white">
                Education & Verified Credentials
              </h2>
              <p className="text-white/60 text-xs sm:text-sm font-light">
                Computer Science degree with major in programming, IT support expertise, and Google Skillshop certifications.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* 1. BSCS Graduate Degree */}
              <div
                onClick={() => {
                  setSelectedCert({
                    title: 'Bachelor of Science in Computer Science (BSCS)',
                    issuer: 'Computer Science Department',
                    date: 'BSCS Graduate · Major in Programming',
                    desc: 'Graduated with a Bachelor of Science in Computer Science with a major in programming. Comprehensive technical mastery in software logic, algorithm design, data structures, automation scripting, and system architecture that empowers advanced technical virtual assistance.',
                    skills: ['Programming Logic', 'Algorithms & Data Structures', 'JavaScript / TypeScript', 'Automation Scripts', 'API Integrations'],
                    credentialId: 'BSCS-MAJOR-PROGRAMMING',
                    isDegree: true
                  });
                  playSubtleClick();
                }}
                className="liquid-card p-6 text-center cursor-pointer group hover:border-emerald-400/50 border border-emerald-500/30 bg-emerald-950/20"
              >
                <div className="w-12 h-12 rounded-2xl liquid-glass mx-auto mb-3 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-heading italic text-white mb-1 group-hover:text-emerald-300">
                  BSCS Graduate (Programming)
                </h3>
                <p className="text-white/60 text-xs mb-3">Major in Programming</p>
                <span className="px-2.5 py-0.5 liquid-glass text-[11px] text-emerald-300 border border-emerald-400/30 rounded-full font-mono">
                  Computer Science Degree
                </span>
              </div>

              {/* 2. IT Support & Systems Diagnostics */}
              <div
                onClick={() => {
                  setSelectedCert({
                    title: 'IT Support & Systems Diagnostics',
                    issuer: 'Technical Systems & Operations',
                    date: 'Active Daily Practice',
                    desc: 'Comprehensive hands-on IT technical support across operating systems (Windows, macOS, iOS, Android), workstation hardware management, network connectivity troubleshooting, diagnostic triage, and SaaS application administration.',
                    skills: ['Hardware Diagnostics', 'Windows & macOS', 'Network Troubleshooting', 'Helpdesk Ticket Resolution', 'Remote Desktop Support'],
                    credentialId: 'IT-SUPPORT-SYS-TRIAGE'
                  });
                  playSubtleClick();
                }}
                className="liquid-card p-6 text-center cursor-pointer group hover:border-purple-400/40 border border-purple-500/20 bg-purple-950/10"
              >
                <div className="w-12 h-12 rounded-2xl liquid-glass mx-auto mb-3 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                  <Wrench className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-heading italic text-white mb-1 group-hover:text-purple-300">
                  IT Support & Systems Diagnostics
                </h3>
                <p className="text-white/60 text-xs mb-3">Hardware & Software Triage</p>
                <span className="px-2.5 py-0.5 liquid-glass text-[11px] text-purple-300 border border-purple-400/20 rounded-full">
                  IT Technical Support
                </span>
              </div>

              {/* 3. AI-Powered Performance Ads */}
              <div
                onClick={() => {
                  setSelectedCert({
                    title: 'AI-Powered Performance Ads',
                    issuer: 'Google Skillshop',
                    date: 'Earned August 2026',
                    desc: 'Completed official Google Skillshop certification in setting up, measuring, and optimizing AI-driven Performance Max campaigns and smart bidding strategies.',
                    skills: ['Performance Max', 'Smart Bidding', 'Audience Signals', 'Conversion Tracking'],
                    credentialId: 'GGL-SKILLSHOP-PERF-AUG26'
                  });
                  playSubtleClick();
                }}
                className="liquid-card p-6 text-center cursor-pointer group hover:border-amber-400/40"
              >
                <div className="w-12 h-12 rounded-2xl liquid-glass mx-auto mb-3 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-heading italic text-white mb-1 group-hover:text-amber-300">
                  AI-Powered Performance Ads
                </h3>
                <p className="text-white/60 text-xs mb-3">Google Skillshop</p>
                <span className="px-2.5 py-0.5 liquid-glass text-[11px] text-amber-300 border border-amber-400/20 rounded-full">
                  Earned Aug 2026
                </span>
              </div>

              {/* 4. AI-Powered Shopping Ads */}
              <div
                onClick={() => {
                  setSelectedCert({
                    title: 'AI-Powered Shopping Ads',
                    issuer: 'Google Skillshop',
                    date: 'Earned August 2026',
                    desc: 'Validated knowledge in connecting Google Merchant Center product feeds, running AI-powered shopping campaigns, and driving retail sales efficiency.',
                    skills: ['Google Merchant Center', 'Shopping Campaigns', 'Product Feeds', 'ROAS Analysis'],
                    credentialId: 'GGL-SKILLSHOP-SHOP-AUG26'
                  });
                  playSubtleClick();
                }}
                className="liquid-card p-6 text-center cursor-pointer group hover:border-amber-400/40"
              >
                <div className="w-12 h-12 rounded-2xl liquid-glass mx-auto mb-3 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-heading italic text-white mb-1 group-hover:text-amber-300">
                  AI-Powered Shopping Ads
                </h3>
                <p className="text-white/60 text-xs mb-3">Google Skillshop</p>
                <span className="px-2.5 py-0.5 liquid-glass text-[11px] text-amber-300 border border-amber-400/20 rounded-full">
                  Earned Aug 2026
                </span>
              </div>

              {/* 5. Google Workspace AI Feature Tester */}
              <div
                onClick={() => {
                  setSelectedCert({
                    title: 'Google Workspace AI Feature Tester',
                    issuer: 'Google Workspace Early Access',
                    date: 'Selected August 2026',
                    desc: 'Selected to test upcoming artificial intelligence tools and workflow helpers natively integrated into Google Workspace apps (Docs, Gmail, Sheets).',
                    skills: ['Workspace AI', 'Drafting Tools', 'Sheet Summarization', 'Early Feedback'],
                    credentialId: 'GW-AI-TESTER-AUG26'
                  });
                  playSubtleClick();
                }}
                className="liquid-card p-6 text-center cursor-pointer group hover:border-emerald-400/40"
              >
                <div className="w-12 h-12 rounded-2xl liquid-glass mx-auto mb-3 flex items-center justify-center text-emerald-300 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-heading italic text-white mb-1 group-hover:text-emerald-300">
                  Workspace AI Feature Tester
                </h3>
                <p className="text-white/60 text-xs mb-3">Google Workspace Early Access</p>
                <span className="px-2.5 py-0.5 liquid-glass text-[11px] text-emerald-300 border border-emerald-400/20 rounded-full">
                  Selected Aug 2026
                </span>
              </div>

              {/* 6. Technical VA Practice */}
              <div
                onClick={() => {
                  setSelectedCert({
                    title: 'Technical Virtual Assistant & Chatter Practice',
                    issuer: 'One Up Media & Digital Comm Services',
                    date: '2021 – Present (3+ Years)',
                    desc: 'Over 3 combined years of remote operational experience across calendar scheduling, inbox organization, live client chat for 8+ model accounts and 3 agency brands.',
                    skills: ['Calendar Management', 'Inbox Zero', 'Live Platform Chat', 'CRM Systems', 'IT Troubleshooting'],
                    credentialId: 'VA-COMM-3YRS'
                  });
                  playSubtleClick();
                }}
                className="liquid-card p-6 text-center cursor-pointer group hover:border-blue-400/40"
              >
                <div className="w-12 h-12 rounded-2xl liquid-glass mx-auto mb-3 flex items-center justify-center text-blue-300 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-heading italic text-white mb-1 group-hover:text-blue-300">
                  Technical VA & Chatter Practice
                </h3>
                <p className="text-white/60 text-xs mb-3">One Up Media Verified</p>
                <span className="px-2.5 py-0.5 liquid-glass text-[11px] text-blue-300 border border-blue-400/20 rounded-full">
                  2023 – Present
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            STAGE 5: DIRECT INQUIRY & CONTACT
            ======================================================== */}
        <section id="stage-4" className="story-section px-6 lg:px-12">
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center mb-10 space-y-2">
              <span className="text-xs uppercase font-mono tracking-widest text-emerald-400">
                Direct Inquiry
              </span>
              <h2 className="text-4xl sm:text-6xl font-heading italic text-white">
                Get In Touch
              </h2>
              <p className="text-white/60 text-xs sm:text-sm font-light">
                Ready to coordinate your schedule, handle IT support, and streamline remote operations.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-4">
                <div className="liquid-card p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full liquid-glass flex items-center justify-center text-emerald-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-white/50 text-[11px]">Direct Email</h4>
                      <div className="text-white font-medium text-sm select-all">
                        paulopenaflor55@gmail.com
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-full liquid-glass hover:bg-white/10 text-white/80 hover:text-white transition-all text-xs cursor-pointer"
                    title="Copy email"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="liquid-card p-5 flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-full liquid-glass flex items-center justify-center text-blue-400 shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-white/50 text-[11px]">Availability & Location</h4>
                    <p className="text-white font-medium text-xs sm:text-sm">Worldwide Remote (Flexible Timezones)</p>
                    <p className="text-white/60 text-[11px] mt-0.5 flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-emerald-400" />
                      <span>Manila Local Time: {pauloTime || 'Active (GMT+8)'}</span>
                    </p>
                  </div>
                </div>

                {/* Social Media Section */}
                <div className="liquid-card p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-white/50 uppercase tracking-wider font-mono">
                      Social Media & Profiles
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">Direct Links</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* LinkedIn */}
                    <div className="p-3 rounded-xl liquid-glass border border-white/10 hover:border-blue-500/40 hover:bg-blue-950/20 transition-all flex items-center justify-between group">
                      <a
                        href="https://www.linkedin.com/in/penaflorpaulothegreat"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={playSubtleClick}
                        className="flex items-center gap-2.5 min-w-0 flex-1"
                      >
                        <div className="w-8 h-8 rounded-lg liquid-glass flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                          <Linkedin className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-white text-xs font-medium flex items-center gap-1 group-hover:text-blue-300">
                            <span>LinkedIn</span>
                            <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                          <div className="text-[10px] text-white/50 truncate font-mono">
                            in/penaflorpaulothegreat
                          </div>
                        </div>
                      </a>

                      <button
                        type="button"
                        onClick={(e) => handleCopyLink('https://www.linkedin.com/in/penaflorpaulothegreat', 'linkedin', e)}
                        className="p-1.5 rounded-lg liquid-glass hover:bg-white/10 text-white/60 hover:text-white text-xs shrink-0 ml-1.5 cursor-pointer"
                        title="Copy LinkedIn URL"
                      >
                        {copiedSocial === 'linkedin' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    {/* Facebook */}
                    <div className="p-3 rounded-xl liquid-glass border border-white/10 hover:border-sky-500/40 hover:bg-blue-950/20 transition-all flex items-center justify-between group">
                      <a
                        href="https://www.facebook.com/paulo.penaflor.71"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={playSubtleClick}
                        className="flex items-center gap-2.5 min-w-0 flex-1"
                      >
                        <div className="w-8 h-8 rounded-lg liquid-glass flex items-center justify-center text-sky-400 group-hover:bg-blue-700 group-hover:text-white transition-colors shrink-0">
                          <Facebook className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-white text-xs font-medium flex items-center gap-1 group-hover:text-sky-300">
                            <span>Facebook</span>
                            <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                          <div className="text-[10px] text-white/50 truncate font-mono">
                            paulo.penaflor.71
                          </div>
                        </div>
                      </a>

                      <button
                        type="button"
                        onClick={(e) => handleCopyLink('https://www.facebook.com/paulo.penaflor.71', 'facebook', e)}
                        className="p-1.5 rounded-lg liquid-glass hover:bg-white/10 text-white/60 hover:text-white text-xs shrink-0 ml-1.5 cursor-pointer"
                        title="Copy Facebook URL"
                      >
                        {copiedSocial === 'facebook' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="liquid-card p-5">
                  <span className="text-[11px] text-white/50 uppercase tracking-wider block mb-2">
                    Quick Inquiry Preset:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'Technical VA & IT Support',
                      'BSCS Programming & Automation',
                      'Chat Specialist (8+ Models)',
                      'Systems Troubleshooting'
                    ].map((tpl) => (
                      <button
                        key={tpl}
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            service: tpl,
                            subject: `Inquiry: ${tpl}`,
                            message: `Hi Paulo, I would like to discuss your availability for ${tpl}. Let's connect!`
                          }));
                          playSubtleClick();
                        }}
                        className="px-2.5 py-1 liquid-glass rounded-lg text-[11px] text-white/80 hover:text-white cursor-pointer"
                      >
                        + {tpl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-7">
                <form onSubmit={handleFormSubmit} className="liquid-card p-6 sm:p-8 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-medium text-white/70 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Rivera"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-white/70 mb-1">Your Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-white/70 mb-1">Message *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Tell Paulo about your project, team goals, IT troubleshooting needs, or workflow bottlenecks..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-white text-black font-semibold text-xs hover:bg-white/90 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to Paulo</span>
                  </button>

                  {formSubmitted && (
                    <div className="p-3 rounded-xl liquid-glass border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Email composer opened! Paulo will respond to you promptly.</span>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ========================================================
          MODAL: CREDENTIAL / DEGREE VIEWER
          ======================================================== */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-md liquid-card p-6 border border-white/20">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-2 rounded-full liquid-glass hover:bg-white/10 text-white/70 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl liquid-glass flex items-center justify-center text-emerald-400">
                {selectedCert.isDegree ? <Code2 className="w-5 h-5" /> : <Award className="w-5 h-5 text-amber-300" />}
              </div>
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block">
                  {selectedCert.issuer}
                </span>
                <h3 className="text-xl font-heading italic text-white">{selectedCert.title}</h3>
              </div>
            </div>

            <p className="text-white/70 text-xs font-light leading-relaxed my-3">
              {selectedCert.desc}
            </p>

            <div className="flex flex-wrap gap-1.5 my-3">
              {selectedCert.skills.map((s) => (
                <span key={s} className="px-2.5 py-0.5 liquid-glass text-[11px] text-white/90 rounded-full font-mono">
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50">
              <span>ID: {selectedCert.credentialId}</span>
              <span className="text-emerald-400">{selectedCert.date}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
