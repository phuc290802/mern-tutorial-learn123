import React from 'react';
import './About.css'; // Make sure to import the CSS file
import teamMember1 from '../assets/team-member1.png';
import teamMember2 from '../assets/team-member2.png';
import teamMember3 from '../assets/team-member3.png';
import NavbarMenu from '../components/layout/NavbarMenu';


const About = () => {
    return (
        <div>
            <NavbarMenu></NavbarMenu>
            <header>
                <h1>About Us</h1>
            </header>
            <main>
                <section id="mission-vision">
                    <h2>Our Mission and Vision</h2>
                    <p>Our mission is to make education accessible and enjoyable for everyone, anywhere in the world. We envision a world where everyone has the opportunity to learn and grow, regardless of their background or circumstances.</p>
                </section>
                <section id="team">
                    <h2>Meet Our Team</h2>
                    <div className="team-member">
                        <img src={teamMember1} alt="Team Member 1" />
                        <h3>John Doe</h3>
                        <p>CEO & Founder</p>
                        <p>John is passionate about education and technology. He founded our platform to bridge the gap between quality education and accessibility.</p>
                    </div>
                    <div className="team-member">
                        <img src={teamMember2} alt="Team Member 2" />
                        <h3>Jane Smith</h3>
                        <p>Chief Technology Officer</p>
                        <p>Jane leads our technology team, ensuring that our platform is always on the cutting edge of innovation.</p>
                    </div>
                    <div className="team-member">
                        <img src={teamMember3} alt="Team Member 3" />
                        <h3>Emily Johnson</h3>
                        <p>Head of Curriculum</p>
                        <p>Emily oversees the development of our course materials, ensuring they are engaging and effective for all learners.</p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default About;
