import "./dashboard.css";


function Notifications ({user}) {

    return (
        <div className="notificationWrapper">
            <div className="recordTopBarNoti">
                <p>Recent Notifications</p>
            </div>
            <div className="directional_bar_noti">
                <table>
                    <tr>
                        <td>From</td>
                        <td>Type</td>
                        <td>Message</td>
                    </tr>
                </table>
            </div>
        </div>
    )

}

export default Notifications;