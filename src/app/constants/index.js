import {
  DiBitbucket,
  DiCss3,
  DiDocker,
  DiGithub,
  DiHtml5,
  DiJenkins,
  DiMysql,
  DiRedis,
} from "react-icons/di";
// ✅ Updated paths to point to the public folder root for Next.js
const project1 = "/assets/projects/project-1.webp";
const project2 = "/assets/projects/project-2.webp";
const project3 = "/assets/projects/project-3.webp";
const project4 = "/assets/projects/project-4.webp";
const project5 = "/assets/projects/project-5.webp";
const project6 = "/assets/projects/project-6.webp";
const project7 = "/assets/projects/project-7.webp";
const project8 = "/assets/projects/project-8.webp";
import {
  FaCss3Alt,
  FaDocker,
  FaGitAlt,
  FaPooStorm,
  FaSquareJs,
  FaWordpress,
} from "react-icons/fa6";
import {
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiAxios,
  SiBitbucket,
  SiCheckmk,
  SiFirebase,
  SiFramer,
  SiGit,
  SiGitforwindows,
  SiGithub,
  SiInsomnia,
  SiJenkins,
  SiJira,
  SiMatomo,
  SiMui,
  SiNextdotjs,
  SiPhp,
  SiPostman,
  SiReactrouter,
  SiRedux,
  SiSentry,
  SiSpringboot,
  SiStrapi,
  SiTailwindcss,
  SiThymeleaf,
} from "react-icons/si";
import { FaJsSquare, FaReact } from "react-icons/fa";
import { RiReactjsLine } from "react-icons/ri";
import WebsocketIcon from "../components/icons/WebsocketIcon";
import { GiDragonfly } from "react-icons/gi";
import { TbWebhook } from "react-icons/tb";
import { FcLinux } from "react-icons/fc";

export const HERO_CONTENT = `Hi, I'm Rukmanghan Selvakumar, a BIT (Bachelor of Information Technology) graduate with a deep passion for coding and a demonstrated ability to rapidly master new programming tools and technologies. My enthusiasm for technology fuels my drive to develop innovative solutions using advanced coding techniques. I am dedicated to creating cutting-edge software that optimizes systems and sets new industry benchmarks.`;

export const ABOUT_TEXT = `I am proficient in various programming tools and technologies, with extensive experience in web development. I possess a broad understanding of software development concepts and best practices and am dedicated to staying current with the latest industry trends and technologies. I actively seek new technologies and continually explore ways to scale my skills and knowledge to drive innovation and excellence in the industry.`;

export const EXPERIENCES = [
  // {
  //   year: "2025 - November to Present",
  //   role: "Intern Software Engineer (On Site)",
  //   company: "Homeit System.",
  //   description: `contributed to the full-stack development and delivery of scalable web applications, employing Next.js for modern architecture and Tailwind CSS for efficient, utility-first styling. I managed the end-to-end SDLC by utilizing Jira for agile tracking and Bitbucket for collaborative source control, leveraging webhooks to automate CI/CD pipelines orchestrated by Jenkins. I implemented robust containerization with Docker to ensure consistent and portable development and production environments, often running within WSL (Windows Subsystem for Linux) to significantly reduce setup complexity. Furthermore, I executed crucial SEO strategies and integrated Matomo for comprehensive user behavior analytics, driving product optimization and data-driven feature enhancements, while maintaining high application reliability by configuring real-time monitoring and alerting using Checkmk to proactively identify and resolve performance bottlenecks.`,
  //   technologies: [
  //     "Docker",
  //     "Jenkins",
  //     "Check Mk",
  //     "Matomo",
  //     "Jira",
  //     "WSL",
  //     "Webhooks",
  //     "Next.js",
  //     "Javascript",
  //     "Tailwind CSS",
  //     "GIT",
  //     "Bit Bucket",
  //   ],
  //   techlogo: [
  //     FaDocker, // Docker
  //     DiJenkins, // Jenkins
  //     SiCheckmk, // Checkmk
  //     SiMatomo, // Matomo
  //     SiJira, // Jira
  //     FcLinux, // WSL (closest icon)
  //     TbWebhook, // Webhooks
  //     SiNextdotjs, // Next.js
  //     FaJsSquare, // JavaScript
  //     SiTailwindcss, // Tailwind CSS
  //     SiGit, // Git
  //     DiBitbucket, // Bitbucket
  //     SiStrapi, // Strapi
  //     SiSentry, // Sentry
  //   ],

  //   // techcolor: [
  //   //   "logo-js",
  //   //   "logo-react",
  //   //   "logo-tailwind",
  //   //   "logo-redux",
  //   //   "logo-github",
  //   //   "logo-firebase",
  //   //   "logo-axios",
  //   //   "logo-mui",
  //   //   "logo-postman",
  //   //   "logo-wordpress",
  //   // ],
  // },
  {
    year: "2025 - March to 2025 - September",
    role: "Intern Software Engineer (On Site)",
    company: "Gray Corp.",
    description: `Worked as an Intern Software Engineer, contributing to the development and maintenance of web applications using React.js, Tailwind CSS, and Redux. Integrated backend services with Firebase and utilized Axios for handling API requests. Used Postman for testing RESTful APIs and contributed to content management using WordPress. Collaborated with Team Members to gather requirements, define project timelines, and deliver scalable solutions.`,
    technologies: [
      "Javascript",
      "React.js",
      "Tailwind CSS",
      "Redux",
      "GIT",
      "Firebase",
      "Axios",
      "MUI",
      "Postman",
      "Insomnia",
      "WordPress",
    ],
    techlogo: [
      FaJsSquare,
      FaReact,
      SiTailwindcss,
      SiRedux,
      SiGithub,
      SiFirebase,
      SiAxios,
      SiMui,
      SiPostman,
      SiInsomnia,
      FaWordpress,
    ],
    // techcolor: [
    //   "logo-js",
    //   "logo-react",
    //   "logo-tailwind",
    //   "logo-redux",
    //   "logo-github",
    //   "logo-firebase",
    //   "logo-axios",
    //   "logo-mui",
    //   "logo-postman",
    //   "logo-wordpress",
    // ],
  },
  {
    year: "2023 - Augest to 2025 - may",
    role: "Graphic Designer (Remote)",
    company: "Pix Graphics and Signs.",
    description: `Worked as a Graphic Designer, creating visually engaging digital assets using Adobe Photoshop and Adobe Illustrator. Designed marketing materials, social media graphics, and brand elements in line with project requirements and brand guidelines. Managed all tasks independently as a remote worker, ensuring design objectives were met, deadlines were respected, and high-quality creative solutions were delivered.`,
    technologies: ["PhotoShop", "Illustrator"],
    techlogo: [SiAdobephotoshop, SiAdobeillustrator],
    // techcolor: ["logo-photoshop", "logo-illustrator"],
  },
];

export const PROJECTS = [
  {
    title: "VerseReality",
    image: project7,
    description:
      "The VerseReality website uses React for UI, Tailwind CSS for styling, Framer Motion for animations, and React Icons for visuals—making it fast, modern, and immersive.",
    technologies: ["React", "Tailwind", "React Icons", "FramerMotion"],
    techlogo: [FaReact, SiTailwindcss, RiReactjsLine, SiFramer],
    link: "https://github.com/rkrukshan/VerseReality.git",
    livedemolink: "https://versereality.netlify.app/",
  },
  {
    title: "Country Explorer",
    image: project6,
    description:
      "Country Explorer is a responsive React web app using React Router, Axios, and Tailwind CSS to display country details like population, capital, region, languages, and flags.",
    technologies: [
      "React",
      "React Router V7",
      "React Icons",
      "Axios",
      "Tailwind",
    ],
    techlogo: [FaReact, SiReactrouter, RiReactjsLine, SiAxios, SiTailwindcss],

    link: "https://github.com/rkrukshan/CountryExplorer.git",
    livedemolink: "https://countryexplorerweb.vercel.app/",
  },

  {
    title: "MobStore",
    image: project2,
    description:
      "A modern, responsive web application designed for a mobile phone retail store. Developed using React for user interfaces and Tailwind CSS for sleek, utility-first styling.",
    technologies: ["React", "Tailwind"],
    techlogo: [FaReact, SiTailwindcss],

    link: "https://github.com/rkrukshan/MobStore.git",
    livedemolink: "https://mobstoreweb.netlify.app/",
  },

  {
    title: "Image Gallery",
    image: project3,
    description:
      "An elegant image gallery website with advanced search capabilities for easy image discovery and seamless user experience.",
    technologies: ["React", "Tailwind", "Axios"],
    techlogo: [FaReact, SiTailwindcss, SiAxios],

    link: "https://github.com/rkrukshan/react-image-gallery.git",
    livedemolink: "https://image-galleryweb.netlify.app/",
  },
  {
    title: "Grocery Shop",
    image: project4,
    description:
      "A platform for Listing and Showcase Grocery products using React ,Tailwind, Redux, Material UI, Framer Motion.",
    technologies: ["React", "Tailwind", "Redux", "MUI", "Framer Motion"],
    techlogo: [FaReact, SiTailwindcss, SiRedux, SiMui, SiFramer],

    link: "https://github.com/rkrukshan/Grocery-Shop/tree/master",
    livedemolink: "https://groceryshopweb.netlify.app/",
  },
  {
    title: "Interior Design Management System",
    image: project1,
    description:
      "A fully functional Interior Design Management System website with features like product listing, shopping cart, and user authentication.",
    technologies: ["HTML", "CSS", "Javascript", "PHP", "Mysql"],
    techlogo: [DiHtml5, DiCss3, FaJsSquare, SiPhp, DiMysql],
    link: "https://github.com/rkrukshan/Interior_Design_Management_System.git",
    livedemolink: "",
  },
  {
    title: "SpringBoot CRUD",
    image: project5,
    description:
      "A SpringBoot application that implements CRUD operations with a ThymeLeaf frontend styled using Tailwind CSS.",
    technologies: ["SpringBoot", "ThymeLeaf", "Mysql", "Tailwind"],
    techlogo: [SiSpringboot, SiThymeleaf, DiMysql, SiTailwindcss],

    link: "https://github.com/rkrukshan/SpringBoot-CRUD-with-Thymeleaf-Tailwind.git",
    livedemolink: "",
  },
  {
    title: "chat Application",
    image: project8,
    description:
      "A scalable real-time chat app using Spring Boot, ThymeLeaf, Tailwind, Docker, WebSocket, and Redis (DragonflyDB) for distributed messaging and seamless multi-instance communication.",
    technologies: [
      "SpringBoot",
      "ThymeLeaf",
      "Websocket",
      "Redis",
      "Docker",
      "Dragonfly DB",
      "Tailwind",
    ],
    techlogo: [
      SiSpringboot,
      SiThymeleaf,
      WebsocketIcon,
      DiRedis,
      DiDocker,
      GiDragonfly,
      SiTailwindcss,
    ],

    link: "https://github.com/rkrukshan/chatapplication.git",
    livedemolink: "",
  },
];

export const CONTACT = {
  address: "186/2 sir pon, Ramanathan Road, Thirunelveli, Jaffna, Sri Lanka.",
  phoneNo: "+94 769861092 ",
  email: "rukshan1122@gmail.com",
  copywrite: " rukmanghan.netlify.app. All rights reserved.",
};
