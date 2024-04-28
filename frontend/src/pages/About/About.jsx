import React from 'react';
import './About.css';
import image1 from './pp/fabien.jpeg';
import image2 from './pp/Jean.jpeg';
import image3 from './pp/mathias.jpeg';
import image4 from './pp/agathe.jpeg';

function About() {
  const Desc1 = 'Membre phare de GrosPied, Fabien incarne une passion inébranlable pour le badminton où sa maîtrise du volant et son agilité sur le court ne font qu\'éclipser son expertise dans chaque entreprise qu\'il entreprend. Il est la quintessence de l\'excellence, un pilier indéniable dans la fondation de GrosPied, où son énergie et son génie s\'entremêlent pour créer des résultats remarquables.';
  const Desc2 = 'Le joyeux complice au sein de GrosPied, il pporte une touche de légèreté et d\'humour. Avec une planche sous les pieds, il dompte les rues comme un artiste défiant la gravité. Sa présence est aussi indispensable que son rire contagieux, mais ne vous y trompez pas, derrière son esprit facétieux se cache une intelligence vive et une détermination farouche. Jean est bien plus qu\'un simple rigolo : il est un pilier essentiel de GrosPied.';
  const Desc3 = 'Mathias, le dynamique catalyseur au sein de GrosPied, fusionne deux mondes en un seul : le sport et l\'informatique. Sur le terrain de jeu comme dans le monde numérique, il excelle avec une aisance déconcertante. Que ce soit en cavalant ou en codant des algorithmes sophistiqués, Mathias est bien plus qu\'un athlète ou un génie de l\'informatique : il est le pivot essentiel de GrosPied, sans qui les boutons slideraient beaucoup moins bien.';
  const Desc4 = 'Agathe, une fervente défenseuse de TS au sein de GrosPied, apporte une sensibilité unique et une passion enflammée à l\'équipe. Au-delà de sa passion pour les puzzles et les tasses starbucks, Agathe est également ancienne respo com de TAEP, refusant de tolérer l\'absence d\'esthetique dans ses projets. Son sens inné de la communciation font d\'elle un membre précieux de l\'équipe GrosPied'
  
  const teamMembers = [
    { name: 'Fabien', description: Desc1, image: image1 },
    { name: 'Jean', description: Desc2, image: image2 },
    { name: 'Mathias', description: Desc3, image: image3 },
    { name: 'Agathe', description: Desc4, image: image4 },
  ];

  return (
    <div>
      <h1 className="Title">La fine équipe de GrosPied</h1>
      <div className="Intro1">Depuis 1993, nous nous plions en quatre pour de vos désirs filmatographiques une réalité.</div>
      <div className="Intro2">Découvrez les membres de notre équipe, qui oeuvrent chaque jour pour vous offrir le meilleur du cinéma.</div>
      <div className="About">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <img src={member.image} alt={member.name} />
            <div className="membername">
            <p>{member.name}</p> </div>
            <div className="memberdescription">
            <p>{member.description}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;