import "./dashboard.css";


function Nutrition ({user}) {

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
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    )

}

export default Nutrition;