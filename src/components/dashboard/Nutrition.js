import "./dashboard.css";


function Nutrition ({user}) {

    const calculateBMR = (member) => {
        const BMR = 88.362 + (13.397 * member.weight) + (4.799 * member.height) - (5.677 * member.age);
        return BMR.toFixed(0);
    }

    return (
        <div className="nutritionWrapper">
            <div className="rightTopBar">
                <p>Today Nutrition</p>
            </div>
            <div className="nutritionContents">
            {user && user.members.map((member, index) => {
                    const icon = require(`../assets/memberIcons/${member.imageURL}`);
                     
                    return (
                        <div key={index} className="nutritionMember">
                                <img src={icon} alt={`${member.name} icon`} className="nutIcon"/>
                                <p>{member.name}
                                <span>0/{calculateBMR(member)} calories</span>
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    )

}

export default Nutrition;