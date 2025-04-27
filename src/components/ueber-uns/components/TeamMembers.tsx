import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { Container } from '@/components/ui/container';

// Team member data
const teamMembers = [
  {
    id: 'alex',
    name: 'Alex Grey',
    role: 'Gründer & Geschäftsführer',
    bio: 'Als Gründer von echoniq verbindet Alex seine Leidenschaft für elektronische Musik mit seinem Geschäftssinn. Mit mehr als 10 Jahren Erfahrung als Produzent und DJ hat er ein feines Gespür für innovative Sounds und aufkommende Trends entwickelt. Seine Vision prägt die kreative Ausrichtung des Labels.',
    image: '/images/team/alex-grey.jpg',
    social: {
      instagram: 'https://instagram.com/alexgrey',
      soundcloud: 'https://soundcloud.com/alexgrey',
      spotify: 'https://open.spotify.com/artist/alexgrey',
    },
  },
  {
    id: 'edu',
    name: "Eduardo 'EDU' García",
    role: 'Kreativdirektor & Künstler',
    bio: 'EDU bringt lateinamerikanische Rhythmen und eine globale Perspektive in das Label ein. Als versierter Sänger, Songwriter und Produzent hat er in verschiedenen Genres gearbeitet und ist bekannt für seine Fähigkeit, kulturelle Grenzen in seiner Musik zu überschreiten. Er leitet die kreative Entwicklung der Künstler bei echoniq.',
    image: '/images/team/edu-garcia.jpg',
    social: {
      instagram: 'https://instagram.com/edumusic',
      soundcloud: 'https://soundcloud.com/edumusic',
      spotify: 'https://open.spotify.com/artist/edumusic',
    },
  },
  {
    id: 'lisa',
    name: 'Lisa Chen',
    role: 'Head of A&R',
    bio: 'Mit ihrem scharfen Ohr für Talent und Trends ist Lisa verantwortlich für die Entdeckung und Entwicklung neuer Künstler. Ihre Hintergrund in der Musikindustrie und ihre Leidenschaft für die Förderung aufstrebender Talente machen sie zu einer wertvollen Brücke zwischen Künstlern und dem Label.',
    image: '/images/team/lisa-chen.jpg',
    social: {
      instagram: 'https://instagram.com/lisachen.music',
      linkedin: 'https://linkedin.com/in/lisachen',
    },
  },
  {
    id: 'markus',
    name: 'Markus Weber',
    role: 'Chefingenieur',
    bio: 'Als leitender Toningenieur und Studioleiter bringt Markus über 15 Jahre Erfahrung in Aufnahme, Mixing und Mastering mit. Seine technische Expertise und sein Engagement für Klangqualität sorgen dafür, dass jede Produktion bei echoniq höchsten Standards entspricht.',
    image: '/images/team/markus-weber.jpg',
    social: {
      instagram: 'https://instagram.com/markus.audio',
      linkedin: 'https://linkedin.com/in/markusweber',
    },
  },
  {
    id: 'nina',
    name: 'Nina Kovač',
    role: 'Marketing & PR Managerin',
    bio: 'Nina leitet die Marketingstrategien und Öffentlichkeitsarbeit von echoniq. Mit ihrem Hintergrund in Musikmarketing und digitaler Kommunikation hilft sie dabei, die Story jedes Künstlers und jeder Veröffentlichung authentisch zu erzählen und die Reichweite des Labels kontinuierlich zu erweitern.',
    image: '/images/team/nina-kovac.jpg',
    social: {
      instagram: 'https://instagram.com/ninakovac',
      linkedin: 'https://linkedin.com/in/ninakovac',
    },
  },
  {
    id: 'tomas',
    name: 'Tomas Schmidt',
    role: 'Projektmanager',
    bio: 'Tomas sorgt dafür, dass alle Projekte bei echoniq reibungslos ablaufen. Von der Koordination von Aufnahmesessions bis hin zur Überwachung von Release-Timelines – seine organisatorischen Fähigkeiten und sein Auge fürs Detail halten alle Abläufe im Label effizient und zielorientiert.',
    image: '/images/team/tomas-schmidt.jpg',
    social: {
      instagram: 'https://instagram.com/tomasschmidt',
      linkedin: 'https://linkedin.com/in/tomasschmidt',
    },
  },
];

// Team member card
type TeamMemberCardProps = {
  member: (typeof teamMembers)[0];
  index: number;
};

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      className="bg-gray-900/60 backdrop-blur-sm rounded-xl overflow-hidden"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
          className="transition-transform hover:scale-105 duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>

        {/* Social media icons */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          {member.social.instagram && (
            <Link href={member.social.instagram} target="_blank" rel="noopener noreferrer">
              <div className="p-2 bg-gray-800/80 backdrop-blur-sm rounded-full text-white hover:bg-primary hover:text-black transition-colors">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61991 14.1902 8.22773 13.4229 8.09406 12.5922C7.9604 11.7615 8.09206 10.9099 8.47032 10.1584C8.84858 9.40685 9.45418 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87658 12.63 8C13.4789 8.12588 14.2648 8.52146 14.8717 9.1283C15.4785 9.73515 15.8741 10.5211 16 11.37Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.5 6.5H17.51"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
          )}

          {member.social.linkedin && (
            <Link href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
              <div className="p-2 bg-gray-800/80 backdrop-blur-sm rounded-full text-white hover:bg-primary hover:text-black transition-colors">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 9H2V21H6V9Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
          )}

          {member.social.soundcloud && (
            <Link href={member.social.soundcloud} target="_blank" rel="noopener noreferrer">
              <div className="p-2 bg-gray-800/80 backdrop-blur-sm rounded-full text-white hover:bg-primary hover:text-black transition-colors">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 12H4M6 12H8M10 12H12M14 12H16M18 12H20M22 12H24"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1 16V8M4 18V6M7 19V5M10 16V8M13 17V7M16 19V5M19 18V6M22 16V8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
          )}

          {member.social.spotify && (
            <Link href={member.social.spotify} target="_blank" rel="noopener noreferrer">
              <div className="p-2 bg-gray-800/80 backdrop-blur-sm rounded-full text-white hover:bg-primary hover:text-black transition-colors">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.3423 3C13.5329 3 9.46369 4.15 7.53541 6.25C5.88456 8.25 5 11.5 5 14C4.99898 17.8793 7.88557 21 11.9215 21C16.2181 21 19 17.5 19 14C18.9999 11.5 16.3423 9.75 14.1544 9.75C11.9665 9.75 11.0211 11 11.0211 12.25C11.0211 13.5 11.493 14.5 12.9125 14.5C14.1544 14.5 14.6029 13.75 14.6029 13C14.6029 12.25 14.1544 12 13.7059 12C13.2574 12 13 12.25 13 12.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 10C11 8.5 13.5 8.5 16 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 12.5C10 10.5 14 10.5 18 12.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.64258 15C11.1426 13.6667 14.1426 13.6667 17.1426 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
          )}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-1">{member.name}</h3>
        <p className="text-primary text-sm mb-4">{member.role}</p>
        <p className="text-gray-300 text-sm">{member.bio}</p>
      </div>
    </motion.div>
  );
};

export const TeamMembers: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="team" className="py-20 bg-black text-white">
      <Container>
        <motion.div
          ref={ref}
          variants={headerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-12"
        >
          <span className="text-primary font-medium mb-2 block">Unser Team</span>
          <h2 className="text-3xl md:text-4xl font-bold">Die Menschen hinter echoniq</h2>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Kreative Köpfe, Musikliebhaber und Branchenexperten – lerne die Menschen kennen, die
            echoniq zu dem machen, was es ist.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} index={index} />
          ))}
        </div>

        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold mb-4">Werde Teil des Teams</h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Wir sind immer auf der Suche nach talentierten und leidenschaftlichen Menschen, die
            unser Team verstärken. Aktuelle Stellenangebote findest du auf unserer
            <Link href="/kontakt" className="text-primary hover:underline ml-1">
              Kontaktseite
            </Link>
            .
          </p>
        </motion.div>
      </Container>
    </section>
  );
};

export default TeamMembers;
