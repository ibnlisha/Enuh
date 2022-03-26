import './HomeMain.css'

const HomeMain = () =>(
    <div className="container mainHome">
       <section className="about">
           {/* <div className="profile">
               <h1 className="header">About Me</h1>
               <img src="images/profile-removebg.png" alt="profile pic" />
           </div> */}
           <div className="overview">
           <img src="images/profile-removebg.png" alt="profile pic" />
           <h1 className="header">About Me</h1>
               
                <h4 className='intro'>Hi! I am Enuh Blaise Manga</h4>
               <p className="speciality">
                   A specialist in Biotechnology and Biosafety | Science communication | Copywriting</p>
               <p className="text">
               I obtained my BSc and MSc from the University of Buea, 
               Cameroon. Currently I study Biotechnology and 
               Biosafety at Osmangazi Unversity in Turkey at 
               PhD level. I develop in silico bacteria models to 
               simulate metabolism and identify strategies to improve 
               industrial output of bioproducts through genetic 
               engineering. I also serve as a reviewer part-time, 
               genomic data scientist and a science communicator 
               at the COST ACTION European Union Venom Network. 
               I and other students run online academic talk programs
                on GYPEE as well as mentorship and training programs 
                to improve students’ research and analytical skills.
               </p>
           </div>
       </section>
    </div>
)

export default HomeMain;