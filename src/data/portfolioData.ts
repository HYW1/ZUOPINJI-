import { Project, SkillGroup, Experience } from '../types';

export const PERSONAL_INFO = {
  name: '何怡文 / Alex He',
  title: '创意前端 & 3D Web 交互工程师',
  enTitle: 'Creative Front-End & 3D Web Engineer',
  tagline: '用代码雕琢温润静谧的数字时空，将想象力定格于每一帧 3D 交互之中。',
  location: '杭州 / 远程',
  bio: '我是一名热衷于 3D 实时渲染、WebGL 与前沿 UI 交互的创意工程师。拥有 5 年以上 Web 全栈与三维视觉开发经验，擅长运用 Three.js、React、TypeScript 与 WebGL 技术栈，打造具有叙事感与静谧美学氛围的数字体验。',
  stats: [
    { label: '从业经验', value: '5+', unit: '年' },
    { label: '交付项目', value: '28+', unit: '个' },
    { label: '开源 Star', value: '1.2k+', unit: '⭐️' },
    { label: '代码提交', value: '3,400+', unit: '次' },
  ],
  contacts: {
    email: 'alex.he@example.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://x.com',
    dribbble: 'https://dribbble.com',
  }
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'typewriter-3d',
    title: '日式原木风 3D 沉浸式打字机',
    subtitle: 'WebGL / Three.js / React / Web Audio API',
    category: '3d',
    description: '一款融合日式禅意原木美学与物理级按键音效的 3D 沉浸式打字机工作台。支持纸张实时排版、灯光场景切换、环境音效与全方位摄像头特写镜头。',
    image: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&w=1000&q=80',
    tags: ['Three.js', 'React', 'TypeScript', 'Web Audio', 'TailwindCSS'],
    highlights: [
      '完全 Procedural 动态建模与 Canvas 字体纹理渲染',
      '自定义 PBR 材质与柔和阴影渲染管线',
      '物理按键下沉微动作与实时 Web Audio 机械声音生成',
    ],
    demoUrl: '#hero',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    id: 'zen-workspace-3d',
    title: 'ZenSpace 3D 空间协作设计器',
    subtitle: '3D Spatial Canvas & Team Collaboration',
    category: '3d',
    description: '基于 WebGL 的轻量化 3D 室内空间规划与家居协同设计平台，支持拖拽布景、光照模拟与实时多人同步改动。',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    tags: ['Three.js', 'WebSockets', 'React', 'Zustand', 'GLTF'],
    highlights: [
      '支持 60FPS 流畅运行的轻量化 GLTF 模型实例化',
      '自定义射线碰撞检测与平滑网格吸附机制',
      '实时多端同步的 WebSocket 协同操作引擎',
    ],
    demoUrl: 'https://example.com/demo2',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    id: 'ai-creative-studio',
    title: 'Aura AI 创意文稿与视觉工作站',
    subtitle: 'Generative AI & Multimodal Workspace',
    category: 'ai',
    description: '整合 Gemini AI 多模态大模型与 Markdown 深度排版的文案与艺术灵感生成器，支持一键大纲、智能改写与图像风格生成。',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    tags: ['Gemini API', 'Next.js', 'TailwindCSS', 'Serverless'],
    highlights: [
      '服务端流式 SSE 响应解析与无缝 Markdown 实时打字效果',
      '智能上下文记忆与多轮对话沉浸式侧边栏',
    ],
    demoUrl: 'https://example.com/demo3',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    id: 'cyber-dashboard',
    title: 'Nova Analytics 实时数据可视化看板',
    subtitle: 'Enterprise BI & Real-time Charting',
    category: 'web',
    description: '为企业级物联网与系统监控打造的深色高能效数据看板，采用 Recharts 与 Canvas 增量绘制百万级并发数据图表。',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    tags: ['React', 'Recharts', 'D3.js', 'TailwindCSS', 'TypeScript'],
    highlights: [
      '毫秒级数据更新与 Web Worker 后台数据计算处理',
      '自适应流式 Grid 布局与响应式组件卡片',
    ],
    demoUrl: 'https://example.com/demo4',
    githubUrl: 'https://github.com',
    featured: false,
  },
  {
    id: 'minimalist-reader',
    title: 'Komorebi 碎光极简阅读器',
    subtitle: 'Focused Reading & Offline PWA App',
    category: 'design',
    description: '专注于纯粹排版与离线阅读体验的 PWA 应用，精调字号与排版韵律，内置日夜温润色彩方案与无干扰禅意模式。',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=80',
    tags: ['PWA', 'React', 'IndexedDB', 'TailwindCSS'],
    highlights: [
      '极致轻量的 45KB 打包体积与零延迟首屏加载',
      '支持本地 IndexedDB 离线存储与排版预设',
    ],
    demoUrl: 'https://example.com/demo5',
    githubUrl: 'https://github.com',
    featured: false,
  },
  {
    id: 'sound-scape-synth',
    title: 'Ambient Flow 环境静音合成器',
    subtitle: 'Web Audio Ambient Generator',
    category: 'web',
    description: '利用 Web Audio API 现场算法合成雨声、炉火、风声与粉红噪音的网页静音伴侣，助力专注与沉浸思考。',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80',
    tags: ['Web Audio API', 'React', 'Framer Motion', 'Canvas'],
    highlights: [
      '无音频文件加载，纯程序化音频振荡器合成',
      '波浪 Canvas 动态水纹动画与触摸粒子反馈',
    ],
    demoUrl: 'https://example.com/demo6',
    githubUrl: 'https://github.com',
    featured: false,
  }
];

export const SKILLS_DATA: SkillGroup[] = [
  {
    category: '3D 与渲染技术 (3D & WebGL)',
    skills: [
      { name: 'Three.js / WebGL', level: 92 },
      { name: 'PBR 材质与 Custom Shaders (GLSL)', level: 85 },
      { name: 'Procedural Geometry & Textures', level: 88 },
      { name: 'Blender 基础建模与烘焙', level: 78 },
    ]
  },
  {
    category: '前端与架构 (Front-End & Arch)',
    skills: [
      { name: 'React 18 / Next.js', level: 95 },
      { name: 'TypeScript', level: 94 },
      { name: 'Tailwind CSS / Motion', level: 96 },
      { name: 'State Management (Zustand/Redux)', level: 90 },
    ]
  },
  {
    category: '后端与全栈 (Backend & AI)',
    skills: [
      { name: 'Node.js / Express', level: 88 },
      { name: 'Gemini AI API / LLM Integration', level: 90 },
      { name: 'RESTful API & WebSockets', level: 86 },
      { name: 'Firebase / Firestore', level: 84 },
    ]
  }
];

export const EXPERIENCES_DATA: Experience[] = [
  {
    year: '2023 - 至今',
    role: '资深 3D 前端工程师 / 架构师',
    company: '静界数字工作室 (Creative Studio)',
    description: '负责 WebGL 3D 互动营销项目、沉浸式网页与 Web Audio 产品的研发与技术选型，提升渲染性能 40%。'
  },
  {
    year: '2021 - 2023',
    role: '高级 Web 前端工程师',
    company: '云端创想科技',
    description: '主导企业级数据可视化看板与 SaaS 产品研发，采用 React + TypeScript 升级组件库体系。'
  },
  {
    year: '2019 - 2021',
    role: 'UI/UX & Web 开发者',
    company: '极光互动实验室',
    description: '负责品牌官网与互动 H5 体验设计，积累了扎实的动效排版与用户交互设计功底。'
  }
];
