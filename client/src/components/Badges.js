import React from "react";
import { FaShieldAlt, FaRegQuestionCircle, FaPlane } from 'react-icons/fa';
import { TbCash } from 'react-icons/tb';
import Card from 'react-bootstrap/Card';

const badgesData = [
  {
    icon: <FaShieldAlt className="h-8 w-8 text-gray-800 lg:mr-2" style={{ fontSize: '2.5rem' }} />,
    title: "Safety First",
    description: "Our top priority is your safety. Experience secure and reliable flights with cutting-edge safety measures.",
  },
  {
    icon: <TbCash className="h-8 w-8 text-gray-800 lg:mr-2" style={{ fontSize: '2.5rem' }} />,
    title: "Cost-Friendly",
    description: "Save on your travels! Enjoy cost-friendly options without compromising on quality service and comfort.",
  },
  {
    icon: <FaRegQuestionCircle className="h-8 w-8 text-gray-800 lg:mr-2" style={{ fontSize: '2.5rem' }} />,
    title: "Eco-Friendly",
    description: "Contribute to a sustainable future. Our eco-friendly practices aim to minimize the environmental impact of your journey.",
  },
  {
    icon: <FaPlane className="h-8 w-8 text-gray-800 lg:mr-2" style={{ fontSize: '2.5rem' }} />,
    title: "Fast & Efficient",
    description: "Time is valuable. Experience fast and efficient services that get you to your destination promptly.",
  },
];

const Badges = () => {
  return (
    <React.Fragment>
      <section className="container mx-auto my-8 d-flex justify-content-center">
        {badgesData.map((badge, index) => (
          <Card key={index} className="mx-2 border-0 shadow-lg rounded-lg mb-4" style={{ background: 'linear-gradient(135deg, #FFA07A, #FF69B4)', marginTop: '20px' }}>
            <Card.Body className="d-flex flex-column align-items-center" style={{ transition: 'transform 0.3s ease' }}>
              <div>{badge.icon}</div>
              <div className="mt-3 text-center">
                <h3 className="text-lg font-bold text-gray-800">
                  {badge.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {badge.description}
                </p>
              </div>
            </Card.Body>
          </Card>
        ))}
      </section>
      <style jsx>{`
        .rounded-lg:hover {
          transform: scale(1.05);
        }
      `}</style>
    </React.Fragment>
  );
};

export default Badges;