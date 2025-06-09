"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ChevronDown, ChevronRight, Github, Globe } from "lucide-react";
import Link from "next/link";
import profile from "@/public/media/pointage.png";
import xarala from "@/public/media/xarala.png";
import coumbacom from "@/public/media/coumbacom.png";
import ecommerce from "@/public/media/ecommerce.png";
import confluence from "@/public/media/confluence.png";
import visible from "@/public/media/visible.png";
import profil from "@/public/media/profil.png";

const skills = [
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "Tailwind CSS",
  "NestJS",
  "React Native",
  "Flutter",
  "HTML",
  "CSS",
  "PostgreSQL",
  "MySQL",
  "REST APIs",
];
const tools = [
  "Git",
  "GitHub",
  "GitLab",
  "Figma",
  "Postman",
  "Visual Studio Code",
  "Cursor",
  "SEO (Optimisation)",
  "Performance Optimization",
  "WordPress",
  "Canva",
  "ESLint",
  "Prettier",
  "Linux",
];

const designSkills = [
  "UI/UX Design",
  "Prototypage",
  "Accessibilité Web",
  "Responsive Design",
  "Design Systems",
  "Création de maquettes",
  "Intégration HTML/CSS",
  "Création de composants réutilisables",
  "Optimisation des performances web",
  "Graphique Design",
  "Création de contenu visuel",
  "Création de logos",
  "Création de maquettes interactives",
  "Création de wireframes",
];

const softSkills = [
  "Communication",
  "Travail en équipe",
  "Résolution de problèmes",
  "Adaptabilité",
  "Gestion du temps",
  "Design Systems",
  "Code Quality (ESLint, Prettier)",
  "Agile Methodologies (Scrum, Kanban)",
];

const educations = [
  {
    title: "Certification en Développement web et mobile",
    institution: "XARALA Academy",
    location: "Dakar, Sénégal",
    year: "2024",
  },
  {
    title: "Diplôme de technicien Supérieur (DTS) en PROGRAMMATION",
    institution: "BAKELI SCHOOL OF TECHNOLOGY",
    location: "Dakar, Sénégal",
    year: "2021 - 2023",
  },
  {
    title: "Baccalauréat S2",
    institution: "Lycée cheikh hamidou kane de Mbao",
    location: "Dakar, Sénégal",
    year: "2020",
  },
];

const experiences = [
  {
    title: "Développeur web font-end",
    institution:
      "Secrétariat Technique du Comité National de Suivi du Contenu Local (ST-CNSCL)",
    location: "Dakar, Sénégal",
    description:
      "Mise en place d'une solution de gestion des ressources humaines pour le secteur minier et des hydrocarbures, visant à établir des liens entre employeurs et chercheurs d'emploi, et à assurer une gestion optimale des compétences.",
    year: "Avril 2025 – juillet 2025",
  },
  {
    title: "Développeur web et mobile",
    institution: "XARALA Academy",
    location: "Dakar, Sénégal",
    description: `
    Intégration de la plateforme de Xarala avec Next js et Tailwind css \n
    Développement d’une application mobile de la plateforme de Xarala avec React Native.\n
    Conception d’une Plateforme éducative pour Alk Learning établie au Maroc avec Next js et bootstrap. \n
    Mentorat en programmation avec les apprenants de Xarala`,
    year: "Août 2024 – Mars 2025",
  },
  {
    title: "Développeur wordpress",
    institution: "Coumba Communication",
    location: "Dakar, Sénégal",
    description: `
    Création de sites WordPress personnalisés et responsive. \n
    SEO et migration de sites web, Acheter et héberger de Noms  de Domaines`,
    year: "Août 2022 - Août 2024",
  },
  {
    title: "Développeur web & mobile",
    institution: "VOLKENO, Red Team",
    location: "Dakar, Sénégal",
    description: `
    Intégration d’un back-office avec Reactjs, Tailwind CSS et Laravel API.\n
    Développement d’une application mobile pour la gestion de rendez-vous médicaux (Flutter).\n
    Conception de sites vitrines et de solutions pour associations avec “Easy Membership”. (Flutter)`,
    year: "Août 2022 - Août 2024",
  },
];

const projets = [
  {
    title: "Application de gestion de pointage",
    description:
      "Elle permet de gérer les pointages des employés, les justifications d'absence, et d'autres fonctionnalités liées à la gestion des utilisateurs.",
    image: profile,
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "React Hook Form avec Zod",
      "Recharts",
    ],
    website: "https://front-gestion-de-pointage.vercel.app/",
    sourceCode: "https://github.com/latyr0503/front_gestion_de_pointage",
  },
  {
    title: "Application de gestion de pointage (Back-end)",
    description:
      "Elle permet de gérer les pointages des employés, les justifications d'absence, et d'autres fonctionnalités liées à la gestion des utilisateurs.",
    image: profile,
    techStack: [
      "Nest.js",
      "TypeScript",
      "PostgreSQL",
      "TypeORM",
      "Swagger",
      "JWT",
      "Bcrypt",
    ],
    website: "https://nestjs-application-de-pointage.onrender.com/api-docs",
    sourceCode: "https://github.com/latyr0503/nestjs_application_de_pointage",
  },
  {
    title: "Site E-learning de XARALA",
    description: `
    J’ai participé au développement de la plateforme d’e-learning de Xarala. 
    Elle permet aux utilisateurs de suivre des cours en ligne, gérer leur progression et accéder à des ressources pédagogiques.`,
    image: xarala,
    techStack: [
      "Next.js",
      "TypeScript",
      "Shadcn UI",
      "Tailwind CSS",
      "Redux Toolkit",
      "React Hook Form avec Zod",
    ],
    website: "https://www.xarala.co/",
    sourceCode: "",
  },
  {
    title: "Site de l’agence Coumba Communication",
    description: `
    Site vitrine conçu pour l’agence Coumba Communication afin de présenter ses services en communication, marketing digital et production audiovisuelle.`,
    image: coumbacom,
    techStack: [
      "WordPress",
      "Elementor",
      "HTML",
      "CSS",
      "JavaScript",
      "SEO",
      "Responsive Design",
      "Optimisation des performances",
    ],
    website: "https://coumbacommunication.com/",
    sourceCode: "",
  },
  {
    title: "Nike Store – Boutique e-commerce",
    description: `
    Boutique en ligne inspirée de l’univers Nike, développée avec React.js. Elle permet aux utilisateurs de parcourir des produits, consulter les détails, ajouter au panier et simuler un achat. `,
    image: ecommerce,
    techStack: [
      "React.js",
      "Tailwind CSS",
      "Redux Toolkit",
      "React Hook Form avec Zod",
      "Axios",
    ],
    website:
      "https://moderne-nike-store-ecommerce-react-js-web-git-f10f7b-latyr0503.vercel.app/",
    sourceCode:
      "https://github.com/latyr0503/moderne_nike_store_ecommerce_react_js_web_app_tailwind_css_redux_toolkit",
  },
  {
    Ctitle: "Groupe Confluence",
    description: `
    Le Groupe Confluence est bien plus qu’un cabinet de conseil : c’est un partenaire stratégique dédié à votre développement `,
    image: confluence,
    techStack: [
      "Wordpress",
      "CSS",
      "HTMl",
      "Yoast SEO",
      "Elementor",
      "SEO",
      "Responsive Design",
      "Optimisation des performances",
    ],
    website: "https://confluence-conseils.com/",
    sourceCode: "https://confluence-conseils.com/",
  },
  {
    Ctitle: "Visible",
    description: `
    C'est une agence complète qui propose des services de publicité visuelle (impression, signalétique, habillage, goodies) au Sénégal et dans plusieurs pays d’Afrique`,
    image: visible,
    techStack: [
      "Wordpress",
      "CSS",
      "HTMl",
      "Yoast SEO",
      "Elementor",
      "SEO",
      "Responsive Design",
      "Optimisation des performances",
    ],
    website: "https://visible.sn/",
    sourceCode: "https://visible.sn/",
  },
];

export default function HomePage() {
  const [selectedExperience, setSelectedExperience] = useState<number | null>(
    null
  );

  const toggleDescription = (index: number) => {
    setSelectedExperience(selectedExperience === index ? null : index);
  };

  return (
    <main className="container mx-auto py-8 relative">
      <div className="fixed w-[250px] h-[250px] blur-3xl rounded-full bg-indigo-600 opacity-20"></div>
      <div className="fixed w-[350px] bottom-10 right-0 h-[350px] blur-3xl rounded-full bg-amber-600 opacity-20 z-0"></div>
      <section className="my-10 max-w-3xl mx-auto space-y-7 z-10 relative p-4">
        <div className="flex items-start justify-between flex-col sm:flex-row gap-4 mb-8">
          <div className="flex flex-col gap-4 w-3/4">
            <h1 className="text-3xl font-semibold">
              Salut, Je suis{" "}
              <a className="underline decoration-indigo-500">
                Abdoulaye Latyr SENE
              </a>{" "}
              👋
            </h1>
            <p className="text-[#222]">
              Développeur web & mobile basé au Sénégal, passionné par la
              création d’expériences numériques modernes et performantes.
            </p>
          </div>
          <div className=" h-48 w-48 rounded-full">
            <img
              src={profil.src}
              alt="Abdoulaye Latyr SENE"
              className="object-cover w-full h-full rounded-full"
            />
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-semibold">À propos de moi</h2>
          <p className="text-[#222]">
            Je suis un développeur web en alternance, en apprentissage continu
            dans les technologies JavaScript. Je maîtrise HTML, CSS, React.js,
            Tailwind CSS, et j’explore également Nest.js, React Native et
            Flutter. Je suis passionné par le design, l&lsquo;entrepreneuriat
            numérique, et je cherche toujours à apprendre et relever de nouveaux
            défis, en particulier sur le continent africain.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold"> Expériences</h2>
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="flex items-start justify-between cursor-pointer"
              onClick={() => toggleDescription(index)}
            >
              <div className="flex gap-2 items-start">
                <div className="bg-indigo-600 w-3 h-3 mt-2 rounded-full"></div>
                <div className="max-w-lg">
                  <h4 className="flex items-center gap-2">
                    {experience.title}{" "}
                    {selectedExperience === index ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {experience.institution} - {experience.location}
                  </p>
                  {selectedExperience === index && (
                    <p className="text-gray-600 mt-2">
                      {experience.description}
                    </p>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-500">{experience.year}</p>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold">Education</h2>
          <p className="text-[#222]">
            Voici un aperçu de mon parcours académique et des certifications
            obtenues :
          </p>
          {educations.map((education, index) => (
            <div key={index} className="flex items-start justify-between ">
              <div className="flex gap-2 items-start">
                <div className="bg-indigo-600 w-3 h-3 mt-2 rounded-full"></div>
                <div>
                  <h4>{education.title}</h4>
                  <p className="text-sm text-gray-500">
                    {education.institution} - {education.location}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500">{education.year}</p>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold">Compétences</h2>
          <h3 className="text-xl font-medium ">🔧 Langages & Frameworks :</h3>
          <div className="flex flex-wrap gap-3 mt-2">
            {skills.map((skill, index) => (
              <Badge key={index} className="">
                {skill}
              </Badge>
            ))}
          </div>
          <h3 className="text-xl font-medium">🎨 UI & Design :</h3>
          <div className="flex flex-wrap gap-3 mt-2">
            {designSkills.map((skill, index) => (
              <Badge key={index} className="">
                {skill}
              </Badge>
            ))}
          </div>
          <h3 className="text-xl font-medium">🛠️ Outils :</h3>
          <div className="flex flex-wrap gap-3 mt-2">
            {tools.map((tool, index) => (
              <Badge key={index} className="">
                {tool}
              </Badge>
            ))}
          </div>
          <h3 className="text-xl font-medium">💼 Soft Skills :</h3>
          <div className="flex flex-wrap gap-3 mt-2">
            {softSkills.map((skill, index) => (
              <Badge key={index} className="">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold">
            {" "}
            Mes projets & Realiasation
          </h2>
          <p className="text-[#222]">
            Voici une sélection de projets que j’ai réalisés pour mettre en
            pratique mes compétences
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {projets.map((projet, index) => (
              <Card
                key={index}
                className="bg-gray-50/40 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <img
                    src={projet.image.src}
                    className="object-cover w-full h-[200px] object-top"
                    alt="rrr"
                  />
                  <CardTitle>{projet.title}</CardTitle>
                  <CardDescription>{projet.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-semibold">Tech stack</h3>
                  <div className="flex flex-wrap gap-2 my-2">
                    {projet.techStack.map((tech, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Link href={projet.website}>
                      <Badge className="flex items-center gap-2">
                        <Globe className="w-4 h-4" /> Website
                      </Badge>
                    </Link>
                    <Link href={projet.sourceCode}>
                      <Badge className="flex items-center gap-2">
                        <Github className="w-4 h-4" /> Code Source
                      </Badge>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold">Contact</h2>
          <p className="text-[#222]">
            Vous pouvez me contacter via les réseaux sociaux ou par email :
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="https://www.linkedin.com/in/abdoulaye-latyr-sene/"
              className="text-indigo-600 hover:underline"
            >
              <Badge>LinkedIn</Badge>
            </Link>
            <Link
              href="mailto:seneabdoulayelatyr@gmail.com"
              className="text-indigo-600 hover:underline"
            >
              <Badge>Email</Badge>
            </Link>
            <Link
              href="tel:+221761241031"
              className="text-indigo-600 hover:underline"
            >
              <Badge>Phone</Badge>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
